# Archetype Agent

A lightweight, mobile-friendly marketing workspace for small businesses.

## Market research and product direction

See [MARKET-RESEARCH-STRATEGY.md](MARKET-RESEARCH-STRATEGY.md) for the November 2026 market assessment, target segment, product differentiation, validation gates, pricing hypotheses, unit economics and implementation priorities.

## Pre-launch marketing

See [GO-TO-MARKET-LAUNCH-KIT.md](GO-TO-MARKET-LAUNCH-KIT.md) for the pilot offer, 30-day organic acquisition plan, ready-to-use social posts, personalized outreach message, payment readiness gates and go/no-go criteria.

## Current product status

The public site is a static GitHub Pages app. The browser studio includes local sample templates and an AI mode backed by a Cloudflare Worker and the OpenAI Responses API. The Worker has been deployed, the `OPENAI_API_KEY` secret is configured, and the Worker URL is connected in `index.html`. The health endpoint has been verified; a real generation request still needs a successful end-to-end test from the website.

There are no completed user accounts, persistent customer workspaces, or payments yet. A production D1 database has now been provisioned in the EU jurisdiction and bound to the Cloudflare Worker; its initial schema is in `database/schema.sql`. The database is infrastructure only: authentication, authorization, tenant isolation in API routes, and billing are not implemented yet. A hashed-IP rate-limit table has been added to the D1 schema and provisioned; the matching Worker code is committed but must be deployed before the limits protect the live endpoint.

## Features

- Responsive landing page and product overview
- Social post, promotion, customer reply, 7-day publishing schedule, and 30-day content-plan drafts
- Platform-specific drafts for Facebook, Instagram, LinkedIn, TikTok, YouTube, and Email
- Local sample mode for quick previews
- Prepared server-side AI generation flow (requires setup)
- Copy-to-clipboard and plain-text download
- No frontend build step

## Run locally

Open `index.html` in a modern browser, or serve the repository with any static web server. AI mode requires a deployed Worker and a configured endpoint; local sample mode works without them.

## Deploy the website

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Push to the `main` branch.
4. Check **Settings → Pages** and the Actions tab for the deployment result.

## Deploy the AI backend

Follow [AI-SETUP.md](AI-SETUP.md). Never expose the OpenAI API key in browser code or GitHub. The Worker uses `gpt-6-luna` by default and sends requests through the OpenAI Responses API with `store: false`.

## Before public launch

- Deploy and test the Worker and website integration.
- Add GitHub Actions repository secrets `CLOUDFLARE_API_TOKEN` (Workers Scripts: Edit) and `CLOUDFLARE_ACCOUNT_ID` to enable the new automated Worker deployment workflow.
- Deploy the D1-backed rate limiting changes and verify the live Worker before public promotion.
- Monitor API usage/spending.
- Review and complete the privacy and terms pages with the operator's real contact/legal information.
- Implement secure authentication and tenant-scoped data access using the provisioned D1 database.
- Add server-side usage metering and subscription entitlements before payment integration.
- Add payments only after seller approval and legal readiness.

## Security

Do not commit API keys, passwords, customer records, or other secrets. CORS is a browser control, not authentication or abuse protection. Do not enter sensitive customer information into the AI form.


## Payments readiness

See [PAYMENTS-READINESS.md](PAYMENTS-READINESS.md) for PayPal eligibility checks, provider-neutral checkout architecture, subscription lifecycle, sandbox test plan and go-live gates. Live payments remain disabled until merchant, legal, technical and payout eligibility are verified.
