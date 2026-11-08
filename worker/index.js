const ALLOWED_ORIGIN = "https://hakim308.github.io";
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: {
    "Content-Type":"application/json; charset=utf-8",
    "Access-Control-Allow-Origin":ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods":"POST, OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type",
    "Vary":"Origin", "Cache-Control":"no-store"
  }});
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (origin !== ALLOWED_ORIGIN) return json({error:"Origin not allowed."},403);
    if (request.method === "OPTIONS") return new Response(null,{status:204,headers:{
      "Access-Control-Allow-Origin":ALLOWED_ORIGIN,"Access-Control-Allow-Methods":"POST, OPTIONS",
      "Access-Control-Allow-Headers":"Content-Type","Vary":"Origin"
    }});
    if (request.method !== "POST") return json({error:"Method not allowed."},405);
    if (!env.OPENAI_API_KEY) return json({error:"AI service is not configured yet."},503);
    let body;
    try { body = await request.json(); } catch { return json({error:"Invalid JSON body."},400); }
    const tasks=["post","promo","reply","plan"], tones=["friendly","professional","bold","warm"];
    const platforms=["Facebook","Instagram","LinkedIn","TikTok","Email"];
    const task=String(body.task||""), business=String(body.business||"").trim().slice(0,90);
    const audience=String(body.audience||"").trim().slice(0,120), platform=String(body.platform||"Facebook");
    const tone=String(body.tone||"friendly"), details=String(body.details||"").trim().slice(0,600);
    if (!tasks.includes(task)||!business||!tones.includes(tone)||!platforms.includes(platform))
      return json({error:"Please provide valid task, business, platform and tone details."},400);
    const labels={post:"social media post",promo:"promotion or offer",reply:"customer service reply",plan:"30-day content calendar"};
    const instructions=[
      "You are Archetype Agent, a careful marketing assistant for small businesses.",
      "Write practical, specific, publish-ready marketing drafts in natural English.",
      "Never invent prices, discounts, dates, testimonials, credentials, guarantees, results, availability or product claims.",
      "If details are missing, use clear placeholders in square brackets rather than making facts up.",
      "Avoid spammy language, fake urgency and exaggerated claims.",
      "Adapt length and format to the requested platform.",
      "For a 30-day plan, provide 30 numbered entries with distinct angles and varied formats.",
      "Return only the draft."
    ].join(" ");
    const input=[
      "Create a "+labels[task]+".","Business: "+business,
      "Target audience: "+(audience||"not specified"),"Platform: "+platform,
      "Tone: "+tone,"Business details: "+(details||"Not provided; use placeholders where necessary.")
    ].join("\n");
    let upstream;
    try {
      upstream=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{
        "Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"
      },body:JSON.stringify({model:env.AI_MODEL||"gpt-6-luna",instructions,input,
        max_output_tokens:task==="plan"?2400:900,store:false})});
    } catch { return json({error:"The AI provider could not be reached. Please try again."},502); }
    const payload=await upstream.json().catch(()=>({}));
    if(!upstream.ok) return json({error:upstream.status===429
      ?"The AI service is busy or its usage limit has been reached."
      :"The AI request failed. Check the server configuration and try again."},502);
    const output=(payload.output||[]).filter(x=>x.type==="message")
      .flatMap(x=>x.content||[]).filter(x=>x.type==="output_text")
      .map(x=>x.text||"").join("\n").trim();
    if(!output) return json({error:"The AI returned an empty draft. Please try again."},502);
    return json({draft:output});
  }
};
