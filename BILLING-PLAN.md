# Subscription billing implementation plan

## Decision
Use Lemon Squeezy as the first merchant-of-record candidate for Archetype Agent, subject to successful seller onboarding and product approval. Do not enable paid checkout until approval and a successful sandbox/live verification.

Why this is the preferred first candidate:
- Algeria is listed for bank payouts.
- Verified personal PayPal accounts are accepted for PayPal payouts.
- Lemon Squeezy supports subscription billing and acts as merchant of record.
- Customers can use supported card and PayPal checkout methods, subject to buyer country and checkout eligibility.

Official references:
- Supported countries: https://docs.lemonsqueezy.com/help/getting-started/supported-countries
- Getting paid: https://docs.lemonsqueezy.com/help/getting-started/getting-paid
- Fees: https://docs.lemonsqueezy.com/help/getting-started/fees
- Pricing and subscription features: https://www.lemonsqueezy.com/pricing

## Important distinction
The owner's PayPal account is a payout destination, not a substitute for a merchant checkout integration. Keep the existing personal PayPal account for payouts only if Lemon Squeezy verifies it and approves it for the seller account. Do not collect subscription payments by asking customers to send manual PayPal transfers.

## Before coding live billing
1. Create and verify the Lemon Squeezy merchant account using accurate Algerian identity and business details.
2. Complete seller review and confirm the SaaS product is accepted.
3. Add the approved payout method (verified PayPal personal or Algerian bank payout if offered in account).
4. Create subscription products/variants and confirm exact prices, billing intervals, trial policy, refund policy, and taxes.
5. Obtain API key and webhook signing secret; store both as Cloudflare Worker secrets. Never expose them in frontend code or GitHub.
6. Implement checkout creation on the Worker; the browser must never be able to set a paid plan directly.
7. Implement signed webhook verification and idempotent processing for subscription_created, subscription_updated, subscription_cancelled, subscription_expired, order_created/refunded events supported by the provider.
8. Persist customers, provider customer/subscription IDs, plan, status, current period, cancellation state, and usage allowance in a database (Cloudflare D1 is a candidate).
9. Enforce plan entitlements and usage limits on the server for every AI request. Never trust a plan or credits value sent by the browser.
10. Add customer billing portal links, cancellation flow, retry/dunning handling, refunds/support process, privacy/terms/refund pages.
11. Test approved sandbox/test mode end-to-end, then a low-value live transaction and refund before public launch.

## Initial plan proposal (not final until cost modelling)
- Free: limited trial credits, no payment method.
- Starter: entry-level individual usage.
- Pro: regular creator/marketer usage.
- Business: higher limits and multi-workspace/team features.
Do not publish fixed prices or promise unlimited AI until model costs, margins, and limits are calculated.

## Security and launch gates
- Keep OPENAI_API_KEY, Lemon Squeezy API key, and webhook signing secret as Cloudflare secrets.
- Validate webhook signatures against raw request body.
- Use idempotency and replay protection.
- Rate-limit login, checkout creation, and AI generation.
- Record usage server-side and set hard spend ceilings/alerts.
- Do not store card numbers or CVVs; provider-hosted checkout handles payment details.
- Paid features remain locked until a verified provider webhook confirms the subscription.
- Do not launch paid plans until seller onboarding, payouts, webhook tests, entitlement enforcement, and refund/cancellation flows all pass.

## Current status
This document is an implementation plan, not a claim that billing has been integrated. Merchant approval and provider credentials are still required.