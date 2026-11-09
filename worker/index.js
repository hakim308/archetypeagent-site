const ALLOWED_ORIGINS = new Set([
  "https://hakim308.github.io",
  "https://archetypeagent.com",
  "https://www.archetypeagent.com"
]);

function corsHeaders(origin) {
  const headers = {
    "Vary": "Origin",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }
  return headers;
}

function json(data, status = 200, origin = "") {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return json({ error: "Origin not allowed." }, 403);
    }

    if (request.method === "OPTIONS") {
      if (!origin) return new Response(null, { status: 400 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") {
      return json({
        ok: true,
        configured: Boolean(env.OPENAI_API_KEY),
        model: env.AI_MODEL || "gpt-6-luna"
      }, 200, origin);
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405, origin);
    }
    if (!env.OPENAI_API_KEY) {
      return json({ error: "AI service is not configured yet." }, 503, origin);
    }

    // Enforce per-IP limits using D1 so the public demo cannot run up unlimited AI costs.
    // Store only a one-way hash of the connecting IP, never the raw address.
    if (env.DB) {
      try {
        const ip = request.headers.get("CF-Connecting-IP") || "unknown";
        const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
        const ipHash = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
        const now = Math.floor(Date.now() / 1000);
        const minuteWindow = Math.floor(now / 60);
        const dayWindow = Math.floor(now / 86400);
        const minute = await env.DB.prepare(
          "INSERT INTO api_rate_limits (ip_hash, window_type, window_start, request_count) VALUES (?, 'minute', ?, 1) ON CONFLICT(ip_hash, window_type, window_start) DO UPDATE SET request_count = request_count + 1 RETURNING request_count"
        ).bind(ipHash, minuteWindow).first();
        const day = await env.DB.prepare(
          "INSERT INTO api_rate_limits (ip_hash, window_type, window_start, request_count) VALUES (?, 'day', ?, 1) ON CONFLICT(ip_hash, window_type, window_start) DO UPDATE SET request_count = request_count + 1 RETURNING request_count"
        ).bind(ipHash, dayWindow).first();
        if ((minute?.request_count || 0) > 5 || (day?.request_count || 0) > 40) {
          return json({ error: "Free demo limit reached. Please try again later." }, 429, origin);
        }
        if (now % 100 === 0) {
          await env.DB.prepare("DELETE FROM api_rate_limits WHERE (window_type = 'minute' AND window_start < ?) OR (window_type = 'day' AND window_start < ?)").bind(minuteWindow - 1440, dayWindow - 30).run();
        }
      } catch {
        return json({ error: "The service is temporarily unavailable. Please try again shortly." }, 503, origin);
      }
    } else {
      return json({ error: "The service is not fully configured yet." }, 503, origin);
    }

    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 12000) {
      return json({ error: "Request is too large." }, 413, origin);
    }

    let body;
    try {
      const raw = await request.text();
      if (raw.length > 12000) return json({ error: "Request is too large." }, 413, origin);
      body = JSON.parse(raw);
    } catch {
      return json({ error: "Invalid JSON body." }, 400, origin);
    }

    const tasks = ["post", "promo", "reply", "review", "lead", "local", "week", "plan"];
    const tones = ["friendly", "professional", "bold", "warm"];
    const platforms = ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube", "Email", "Google Business Profile"];
    const task = String(body.task || "");
    const business = String(body.business || "").trim().slice(0, 90);
    const audience = String(body.audience || "").trim().slice(0, 120);
    const platform = String(body.platform || "Facebook");
    const tone = String(body.tone || "friendly");
    const details = String(body.details || "").trim().slice(0, 600);

    if (!tasks.includes(task) || !business || !tones.includes(tone) || !platforms.includes(platform)) {
      return json({ error: "Please provide valid task, business, platform and tone details." }, 400, origin);
    }

    const labels = {
      post: "social media post",
      promo: "promotion or offer",
      reply: "customer service reply",
      review: "public customer review response",
      lead: "personalized lead follow-up message",
      local: "Google Business Profile update for a local business",
      week: "7-day publishing schedule",
      plan: "30-day content calendar"
    };
    const instructions = [
      "You are Taskora AI, a careful marketing assistant for small businesses.",
      "Write practical, specific, publish-ready marketing drafts in natural English.",
      "Never invent prices, discounts, dates, testimonials, credentials, guarantees, results, availability or product claims.",
      "If details are missing, use clear placeholders in square brackets rather than making facts up.",
      "Avoid spammy language, fake urgency and exaggerated claims.",
      "Adapt length, hook, format, CTA, and creative treatment to the requested platform. For YouTube, distinguish Shorts from long-form video and include a title and thumbnail concept. For TikTok, prioritize a strong first-second hook, vertical video beats, and an on-screen text suggestion. For Facebook, use conversational copy, community prompts, and shareable formats.",
      "For review responses, acknowledge the specific feedback, stay calm and concise, do not disclose personal information, do not argue, and never offer incentives for positive reviews. If the review text is missing, provide a reusable response template with placeholders.",
      "For lead follow-up, write a helpful, personalized response with one clear next step. Do not imply a lead has consented to marketing messages; avoid repeated unsolicited follow-ups and include an opt-out reminder where relevant.",
      "For Google Business Profile updates, write a concise local update with a clear service/location context and truthful CTA. Do not invent address, opening hours, phone number, prices, promotions or service areas. Do not keyword-stuff.",
      "For a 7-day publishing schedule, provide exactly seven day-by-day entries. Each entry must include a specific concept, format, opening hook, key beats, caption or title, CTA, and suggested publishing window expressed in the target audience\u2019s local time. Vary formats and avoid repeating the same idea.",
      "For a 30-day plan, provide 30 numbered entries with distinct angles and varied formats. Include a practical weekly rhythm and adapt every entry to the chosen platform.",
      "Return only the draft."
    ].join(" ");
    const input = [
      "Create a " + labels[task] + ".",
      "Business: " + business,
      "Target audience: " + (audience || "not specified"),
      "Platform: " + platform,
      "Tone: " + tone,
      "Business details: " + (details || "Not provided; use placeholders where necessary.")
    ].join("\n");

    let upstream;
    try {
      upstream = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + env.OPENAI_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: env.AI_MODEL || "gpt-6-luna",
          instructions,
          input,
          max_output_tokens: task === "plan" ? 3000 : task === "week" ? 1800 : 1000,
          store: false
        })
      });
    } catch {
      return json({ error: "The AI provider could not be reached. Please try again." }, 502, origin);
    }

    const payload = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return json({
        error: upstream.status === 429
          ? "The AI service is busy or its usage limit has been reached."
          : "The AI request failed. Check the server configuration and try again."
      }, 502, origin);
    }

    const output = (payload.output || [])
      .filter(item => item.type === "message")
      .flatMap(item => item.content || [])
      .filter(item => item.type === "output_text")
      .map(item => item.text || "")
      .join("\n")
      .trim();

    if (!output) return json({ error: "The AI returned an empty draft. Please try again." }, 502, origin);
    return json({ draft: output }, 200, origin);
  }
};
