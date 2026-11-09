# Archetype Agent — AI backend setup

The public website is static GitHub Pages. The OpenAI API key must stay on the server and must never be placed in `index.html`, a browser script, or a public GitHub file.

## What is already in this repository

- `worker/index.js`: Cloudflare Worker API. It validates inputs, supports a health check, calls the OpenAI Responses API server-side, and returns the generated draft.
- `wrangler.toml`: Wrangler project configuration. The default model is `gpt-6-luna`.
- `index.html`: reads the deployed Worker endpoint from the `archetype-api-url` meta tag.
- Production D1 database `archetype-agent-prod` is provisioned in the EU jurisdiction and bound to the Worker as `DB`. The initial SQL schema is tracked at `database/schema.sql`.

## Current deployment

The Worker `archetype-agent-api` is deployed at `https://archetype-agent-api.archetypeagent.workers.dev`, and its health endpoint has returned `ok: true` and `configured: true`. The site HTML is connected to this endpoint. The studio supports Facebook, Instagram, LinkedIn, TikTok, YouTube, and Email, plus a 7-day schedule and a 30-day calendar. A real AI generation request must still be tested end-to-end from the public website. D1 is provisioned and bound, but the Worker has not yet implemented account authentication or database-backed customer operations.

## 1. Deploy the Worker from the Cloudflare dashboard

1. Sign in at https://dash.cloudflare.com/
2. Open **Workers & Pages**.
3. Choose **Create** → **Worker** (or **Create application** → **Worker**, depending on the dashboard layout).
4. Name it `archetype-agent-api` and deploy the starter Worker.
5. Open the new Worker and choose **Edit code**.
6. Replace the starter code with the complete contents of this repository's `worker/index.js`.
7. Save and deploy.

The Worker URL will look like `https://archetype-agent-api.<your-account-subdomain>.workers.dev`. Use the exact URL Cloudflare displays.

## 2. Add the OpenAI API key securely

1. Open the Worker → **Settings** → **Variables and Secrets**.
2. Add a **Secret** (not a plain-text variable).
3. Set the name to `OPENAI_API_KEY`.
4. Paste the API key into Cloudflare's secret field and save.
5. Do not send the key in ChatGPT, commit it to GitHub, or place it in website code.

The API key setup in OpenAI Platform is a separate step. API usage is billed separately from a ChatGPT subscription.

## 3. Check the Worker

Open this URL in a browser:

`https://YOUR-WORKER-URL/health`

Expected response after the secret is saved:

```json
{"ok":true,"configured":true,"model":"gpt-6-luna"}
```

If `configured` is false, the secret was not saved to this Worker or the latest deployment is not active.

## 4. Connect the website

1. In GitHub, open `index.html` in the repository.
2. Find this line near the top of the HTML:

```html
<meta name="archetype-api-url" content="">
```

3. Put the exact Worker URL inside the empty quotes, without adding `/health`:

```html
<meta name="archetype-api-url" content="https://YOUR-WORKER-URL">
```

4. Commit the change. Wait for GitHub Pages to finish deploying.
5. Open the site, create a small test post, and select **Generate with AI**.

The Worker currently allows only the GitHub Pages origin `https://hakim308.github.io`. Add a future production site origin only after its domain and hosting are confirmed; remove any domain from the allowlist before transferring or selling it.

## 5. Protect the public endpoint before launch

The Worker supports an optional Cloudflare Workers Rate Limiting binding named `API_RATE_LIMITER`. Configure that binding in the Worker settings before promoting the site publicly. Start with a conservative limit, monitor legitimate usage, and adjust only after observing traffic. CORS is not authentication and does not stop scripts or server-to-server requests.

Also:
- Set a monthly OpenAI API budget/usage alert.
- Keep the API key as a Cloudflare Secret.
- Do not collect sensitive customer information.
- Publish an accurate privacy notice and support contact.
- Review generated marketing claims before publishing.

## Request format

```json
{
  "task": "post",
  "business": "Local bakery",
  "audience": "Families nearby",
  "platform": "Facebook",
  "tone": "friendly",
  "details": "Fresh bread baked every morning"
}
```

The Worker uses `store: false` for the Responses API request. This setting is not a substitute for reviewing the data-handling terms of the services you use.
