# Taskora AI

A lightweight, mobile-friendly AI marketing workspace for small businesses.

## Market research and product direction

See [MARKET-RESEARCH-STRATEGY.md](MARKET-RESEARCH-STRATEGY.md) for the November 2026 market assessment, target segment, product differentiation, validation gates, pricing hypotheses, unit economics and implementation priorities.

## Latest market research (9 November 2026)

See [MARKET-RESEARCH-ADDENDUM-2026-11-09.md](MARKET-RESEARCH-ADDENDUM-2026-11-09.md) for current SMB demand signals, competitor mapping, product priorities, trust requirements and the review-response, lead-follow-up and Google Business Profile draft workflows.

## Pre-launch marketing

See [GO-TO-MARKET-LAUNCH-KIT.md](GO-TO-MARKET-LAUNCH-KIT.md) for the pilot offer, 30-day organic acquisition plan, ready-to-use social posts, personalized outreach message, payment readiness gates and go/no-go criteria.

## Current product status

The public site is a static GitHub Pages app. The browser studio includes local sample templates and an AI mode backed by a Cloudflare Worker and the OpenAI Responses API. A live health and generation test could not be completed from this session because the external Worker endpoint was blocked by the execution environment; verify it from a normal browser after deployment. The Worker source has had a malformed prompt-string issue corrected in the latest commit.

The production D1 database `archetype-agent-prod` is provisioned in the EU jurisdiction, bound to the Cloudflare Worker as `DB`, and its initial schema has now been applied and verified. The schema contains users, workspaces, brands, campaigns, subscriptions, usage ledger, webhook events, and hashed-IP rate-limit tables. The reproducible migration is tracked at `database/migrations/0001_initial_schema.sql`; the canonical schema is `database/schema.sql`.

The database is infrastructure only: authentication, authorization, tenant isolation in API routes, customer account flows, saved workspaces, and billing are not implemented yet. The public AI demo rate limits are 5 requests/minute and 40/day per hashed IP; these limits depend on the deployed Worker and D1 binding. Verify a real AI request from the public site before promoting it.

## Features

- Responsive landing page and product overview
- Social post, promotion, customer reply, review response, lead follow-up, Google Business Profile update, 7-day publishing schedule, and 30-day content-plan drafts
- Platform-specific drafts for Facebook, Instagram, LinkedIn, TikTok, YouTube, Email, and Google Business Profile
- Local sample mode for quick previews
- Prepared server-side AI generation flow (requires a deployed and configured Worker)
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

Follow [AI-SETUP.md](AI-SETUP.md). Never expose the OpenAI API key in browser code or GitHub. The Worker uses the configured model and sends requests through the OpenAI Responses API with `store: false`.

## Before public launch

- Verify Worker health and complete an end-to-end AI generation test from the public website.
- Add GitHub Actions repository secrets `CLOUDFLARE_API_TOKEN` (Workers Scripts: Edit) and `CLOUDFLARE_ACCOUNT_ID` to enable automated Worker deployment.
- Monitor API usage/spending and verify the demo limits.
- Review and complete the privacy and terms pages with the operator's real contact/legal information.
- Implement secure authentication, authorization and tenant-scoped data access using the provisioned D1 database.
- Add server-side usage metering and subscription entitlements before payment integration.
- Add payments only after seller approval and legal readiness.

## Security

Do not commit API keys, passwords, customer records, or other secrets. CORS is a browser control, not authentication or abuse protection. Do not enter sensitive customer information into the AI form.

## Payments readiness

See [PAYMENTS-READINESS.md](PAYMENTS-READINESS.md) for PayPal eligibility checks, a researched Lemon Squeezy payout route to a verified personal PayPal account, provider-neutral checkout architecture, subscription lifecycle, sandbox test plan and go-live gates. Live payments remain disabled until merchant, legal, technical and payout eligibility are verified.
