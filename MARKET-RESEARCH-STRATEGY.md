# Market research and product strategy — November 2026

## Executive decision

Do not position Archetype Agent as another generic AI social-post generator. That category is crowded, low differentiation, and exposed to free substitutes. Position the product as an **AI Marketing Operations Agent for small ecommerce brands and local service businesses**, starting with one narrow beachhead: **small ecommerce stores that need consistent product campaigns, customer follow-up, and repeat-purchase workflows but lack a full marketing team**.

The product promise: turn a store's product/catalogue and campaign goal into a coordinated, measurable marketing workflow — not merely a caption.

## Evidence and market signals

1. IDC's 2026 SMB digital landscape says small and medium businesses are moving from AI experimentation to pragmatic adoption, prioritizing easy deployment and measurable ROI. It identifies AI-driven communications, customer engagement and marketing/brand awareness as core use cases.
   Source: https://www.idc.com/resource-center/blog/the-smb-2026-digital-landscape-how-ai-is-redefining-growth/

2. HubSpot's 2026 State of Marketing identifies AI personalization (48.57%) and automation (47.38%) among leading trends; marketers also prioritize channel-specific content and repurposing.
   Source: https://blog.hubspot.com/marketing/hubspot-blog-marketing-industry-trends-report

3. Omnisend's 2026 ecommerce report, based on 150,000 brands and large messaging datasets, reports that automated messages were only 2% of sends but generated 30% of email-attributed revenue in its dataset. Welcome and abandoned-cart automations accounted for 76% of automation-generated orders. This is a strong directional signal for workflow value, not a promise of results for our customers.
   Source: https://www.omnisend.com/resources/reports/2026-ecommerce-marketing-report/

4. CallRail's 2026 small-business marketing research describes lead follow-up/conversion, customer communication, and proving marketing ROI as material operating challenges. It reports adoption of AI for personalization, lead scoring, content, attribution and customer communication.
   Source: https://www.callrail.com/blog/ai-saas-msp-marketing-trends-2026

5. Competition is established: Buffer, Metricool, Later, SocialBee, Predis.ai, Hootsuite and Sprout Social already offer overlapping scheduling, analytics or AI content features. Published comparison pages show low-cost entry plans and free tiers. We should not compete on generic caption generation or cheapest scheduler.
   Sources:
   https://metricool.com/compare-metricool/
   https://www.techsifted.com/roundups/best-ai-social-media-management-2026/

## Target customer

Initial ideal customer:
- English-speaking micro/small ecommerce brand, roughly 1–20 staff.
- Shopify or WooCommerce store (integrations only after validating demand and API requirements).
- Owner/operator has no dedicated marketing operations team.
- Needs product launches, seasonal campaigns, customer reactivation and repeat-purchase communications.
- Will pay for time saved and measurable campaign execution, not for generic AI text.

Secondary segment after validation: local service businesses needing lead capture, fast follow-up and review-response workflows.

## Product differentiation

Build toward an outcome-based workflow:
1. Brand and product profile with approved facts, tone, audience and offer constraints.
2. Campaign brief: goal, product, audience, region, offer and budget.
3. Generate a coordinated campaign: email copy, social variants, landing-page copy, creative brief and schedule.
4. Human approval before publishing or sending.
5. Calendar and task execution; connect official platform APIs only where permissions and app review allow.
6. Track campaign links, leads, orders or customer actions where integrations permit.
7. Weekly plain-language performance report and next actions.

Avoid unsupported claims such as guaranteed sales, autonomous publishing without permissions, or attribution where tracking is absent.

## MVP scope — do not overbuild

P0:
- Authentication and tenant-isolated workspaces.
- Brand profile and product/service catalogue.
- Campaign brief and AI campaign pack.
- Content calendar with approval states.
- Usage ledger, hard limits and cost controls.
- Basic analytics: generated, approved, scheduled, published only when actually integrated, and tracked clicks where available.
- Admin support and account deletion/export.

P1:
- Shopify/WooCommerce catalogue import after API feasibility review.
- Email provider integration and compliant consent/unsubscribe handling.
- Campaign UTM builder and basic conversion attribution.
- Team roles and multi-brand workspaces.

P2:
- Direct publishing integrations, inbox/reply automation, advanced attribution, agency white-label features.

## Pricing hypothesis to test, not publish as final

- Free trial: limited campaign pack, no ongoing free AI allowance unless unit economics justify it.
- Starter: $19/month, one brand, capped AI usage, core campaign packs.
- Growth: $39/month, multiple campaigns, calendar, more usage and basic reporting.
- Agency: $99/month, multiple client workspaces and seats, higher caps.
Validate willingness-to-pay with interviews and paid pilot conversions. Never promise unlimited generation.

## Unit economics and financial guardrails

For every plan calculate:
- Payment processor/merchant-of-record fees and refunds.
- Model input/output cost by workflow, retries and image/video costs separately.
- Cloudflare, database, email and storage costs.
- Support and acquisition cost.
- Gross margin by cohort and plan.

Set per-user and global AI budgets, rate limits, usage metering, alerts and hard stops. Do not use crypto exchange accounts or a personal wallet as a substitute for a compliant business payout route. Owner withdrawals should happen only after the provider payout reaches an eligible account and business, tax, banking and FX obligations are met. Never promise a specific net payout before fee and tax review.

## Validation plan

Weeks 1–2:
- Interview 15–20 target store owners in the US/UK/EU.
- Review competitor onboarding and pricing; document gaps with evidence.
- Build a landing page with one clear outcome and waitlist/demo request.
- Run 5 guided prototype sessions using the current AI backend.

Weeks 3–4:
- Recruit 5–10 design partners.
- Deliver campaign packs manually assisted by the product.
- Measure activation, repeat weekly use, time saved, campaign approval rate and willingness to pay.
- Seek 3–5 paid pilot commitments before committing to full payment integration.

Go/no-go gates:
- At least 5 target users complete a real workflow.
- At least 3 agree to pay the proposed entry price or a clearly defined pilot fee.
- At least 30% of activated users return and complete a second workflow within 14 days.
- AI cost per active customer supports at least 70% gross margin before acquisition and overhead.
If gates fail, revise segment/problem before expanding features.

## Immediate engineering assessment

The current repository is a static landing page and browser-based draft studio plus a Cloudflare Worker. README explicitly says there are no user accounts, persistent customer workspaces or payments. Therefore it is a prototype, not a subscription SaaS yet.

Before paid launch:
- Correct the product positioning and landing-page copy to reflect the chosen validated niche.
- Prove real AI generation end-to-end and correct any model/API configuration errors.
- Add authentication, tenant isolation and database schema.
- Add server-side entitlements and usage metering.
- Add provider checkout and signed, idempotent webhooks only after seller approval and legal readiness.
- Add privacy, terms, refund, cancellation, support and data deletion flows.
- Verify platform API permissions and app-review requirements before promising publishing or inbox automation.

## Legal and payout constraints

This document is commercial product research, not Algerian legal or tax advice. Before accepting paid customers, confirm the correct Algerian legal form/activity, export-of-services treatment, invoicing, banking/foreign-exchange process, tax and social contributions with a qualified Algerian accountant and the receiving bank. Use only payment providers that approve the actual merchant, SaaS product and Algerian payout route. Keep business records and withdraw funds only through approved channels.

## Success metric

North-star metric: **number of customer campaigns completed and approved per active paid workspace per month**, followed by customer retention and verified attributable outcomes. Subscriber count is a lagging metric; retention, gross margin and customer value come first.
