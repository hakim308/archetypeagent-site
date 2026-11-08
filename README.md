# Archetype Agent

A lightweight, mobile-friendly marketing workspace for small businesses.

## Current product status

The public site is a static GitHub Pages app. The browser studio includes local sample templates and an optional AI mode backed by a Cloudflare Worker and the OpenAI Responses API. **AI mode remains inactive until the Worker is deployed, its `OPENAI_API_KEY` secret is configured, and the Worker URL is added to the `archetype-api-url` meta tag in `index.html`.**

There are no user accounts, persistent customer workspaces, or payments.

## Features

- Responsive landing page and product overview
- Social post, promotion, customer reply, and 30-day content-plan drafts
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
- Configure Cloudflare rate limiting and monitor API usage/spending.
- Review and complete the privacy and terms pages with the operator's real contact/legal information.
- Add authentication, persistent storage, and payments only after their security, privacy, and legal requirements are designed.

## Security

Do not commit API keys, passwords, customer records, or other secrets. CORS is a browser control, not authentication or abuse protection. Do not enter sensitive customer information into the AI form.
