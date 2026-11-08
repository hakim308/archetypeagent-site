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

    // Optional Cloudflare Workers Rate Limiting binding. Configure it before public launch.
    if (env.API_RATE_LIMITER) {
      const key = request.headers.get("CF-Connecting-IP") || "unknown";
      const decision = await env.API_RATE_LIMITER.limit({ key });
      if (!decision.success) {
        return json({ error: "Too many requests. Please wait and try again." }, 429, origin);
      }
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

    const tasks = ["post", "promo", "reply", "week", "plan"];
    const tones = ["friendly", "professional", "bold", "warm"];
    const platforms = ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube", "Email"];
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
      week: "7-day publishing schedule",
      plan: "30-day content calendar"
    };
    const instructions = [
      "You are Archetype Agent, a careful marketing assistant for small businesses.",
      "Write practical, specific, publish-ready marketing drafts in natural English.",
      "Never invent prices, discounts, dates, testimonials, credentials, guarantees, results, availability or product claims.",
      "If details are missing, use clear placeholders in square brackets rather than making facts up.",
      "Avoid spammy language, fake urgency and exaggerated claims.",
      "Adapt length, hook, format, CTA, and creative treatment to the requested platform. For YouTube, distinguish Shorts from long-form video and include a title and thumbnail concept. For TikTok, prioritize a strong first-second hook, vertical video beats, and an on-screen text suggestion. For Facebook, use conversational copy, community prompts, and shareable formats.",
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
