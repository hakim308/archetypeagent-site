# Archetype Agent — AI backend setup

The public site is hosted on GitHub Pages, which is static hosting. The AI provider key must never be placed in index.html or any browser JavaScript. This project uses a Cloudflare Worker as a small server-side gateway.

## Included
- worker/index.js: validates requests, restricts the browser origin, calls the OpenAI Responses API server-side, and returns the generated draft.
- wrangler.toml: Cloudflare Worker configuration.
- The Worker does not intentionally store prompts or responses. The OpenAI request uses store=false.

## Deploy the backend
1. Create or sign in to a Cloudflare account and open Workers & Pages.
2. Deploy this repository's worker/index.js as a Worker named archetype-agent-api (or deploy with Wrangler from a local checkout).
3. Add a Worker secret named OPENAI_API_KEY. Paste the key into Cloudflare's secret field only. Never commit it to GitHub or paste it into the website.
4. Keep AI_MODEL set to gpt-6-luna initially; change it only to a model available to your API project.
5. Test the Worker with a POST JSON body containing task, business, audience, platform, tone and details.
6. Add the deployed Worker URL to the website's frontend configuration before enabling the live AI button.

## Before public launch
- Add rate limiting and abuse protection (for example Cloudflare rate limiting or Turnstile).
- Set a monthly API spending limit and monitor usage.
- Add an accurate privacy notice and support contact before accepting customer data.
- Do not add login, persistent storage or payments until their security and privacy requirements are designed.

## API request format
{
  "task": "post",
  "business": "Local bakery",
  "audience": "Families nearby",
  "platform": "Facebook",
  "tone": "friendly",
  "details": "Fresh bread baked every morning"
}
