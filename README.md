# Archetype Agent

A lightweight, mobile-friendly marketing workspace for small businesses.

## Current product status

This repository currently contains a static, single-page website in `index.html`. The starter studio creates editable marketing drafts locally in the browser using deterministic templates. It does **not** call an AI model, store accounts, process payments, or send data to a server.

## Features

- Responsive landing page and product overview
- Social post, promotion, customer reply, and 30-day content-plan templates
- Copy-to-clipboard and plain-text download
- No build step or runtime dependency

## Run locally

Open `index.html` in a modern browser, or serve the repository with any static web server.

## Deploy with GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Push to the `main` branch. The workflow in `.github/workflows/pages.yml` will publish the site.
4. Find the public URL in **Settings → Pages** after the first successful deployment.

## Product roadmap

1. Validate the static site and user experience.
2. Add a secure server-side AI endpoint (never expose provider API keys in browser code).
3. Add authentication and data storage only after selecting a suitable privacy and security model.
4. Add payments only after pricing, legal requirements, and customer value have been validated.

## Security and privacy

Do not commit API keys, passwords, customer records, or other secrets. Any future AI integration must call the provider from a protected server-side environment and disclose what information is transmitted.
