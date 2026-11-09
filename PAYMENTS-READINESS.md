# Payments readiness and provider-neutral checkout plan
Updated: 9 November 2026

## Current decision

The founder has an existing PayPal Personal account that has previously received small game-related payouts. This demonstrates that some incoming payments have worked, but it does not establish eligibility for commercial SaaS checkout, recurring subscriptions, seller protection, API checkout, or withdrawals at scale.

Keep the existing account unchanged while eligibility is checked. Do not assume that a Personal account can safely collect recurring commercial subscription payments. Do not collect paid subscriptions through informal personal transfers or disguise commercial sales as personal payments.

The PayPal email supplied by the founder is private account configuration. Never expose it in public HTML, client-side JavaScript, marketing pages, repository files, or logs.

## Before enabling live payments

Obtain current confirmation from PayPal for the actual Algerian account:
1. Can this exact account receive payments for software subscriptions sold on the website?
2. Does PayPal support recurring billing / subscription APIs for this account and merchant country?
3. Is a Business account required? If so, can an individual seller in Algeria qualify without commercial registration, and what alternative documents are accepted?
4. Which withdrawal methods are supported for this account in Algeria, in what currency, and with what fees/limits?
5. What holds, reserves, chargeback rules and seller limitations apply?

Use PayPal's official country-specific help and support channels. Never provide false business-registration details or another person's documents. Do not send passwords, OTPs, API secrets or full card details to anyone.

## Provider-neutral application design

Implement a provider abstraction rather than coupling subscriptions to PayPal:
- createCheckoutSession(customer, plan)
- verifyWebhook(request)
- getSubscription(providerSubscriptionId)
- cancelSubscription(providerSubscriptionId)
- refund(providerPaymentId, amount)

Only the server may call provider APIs. Store credentials as Cloudflare Worker secrets, never in Git or browser code. Verify webhook signatures, enforce idempotency with webhook_events, and derive access from server-side subscription state. Never trust a browser redirect as proof of payment.

## Subscription lifecycle

Allowed states: pending, active, past_due, cancelled, refunded, suspended.
- Grant paid access only after a verified provider webhook or authoritative server-side provider lookup.
- Revoke or limit access when subscription expires, is refunded, charged back or remains unpaid after the configured grace period.
- Store provider IDs and minimal billing metadata only; do not store card numbers or security codes.
- Provide cancellation, receipt, refund policy and support contact.
- Keep an auditable ledger of payments and subscription state transitions.

## Test plan

1. Unit-test provider adapter with mocked responses.
2. Test checkout creation in provider sandbox.
3. Test invalid signature rejection.
4. Test duplicate webhook idempotency.
5. Test successful payment, failed renewal, cancellation and refund.
6. Confirm entitlements update correctly in D1.
7. Complete legal/accountant/bank review before any live charge.

## Go-live gate

Live subscriptions remain disabled until all of the following are true:
- Merchant eligibility and recurring billing are confirmed for the actual account and country.
- A legal route for commercial activity, invoicing, taxes, foreign exchange and payout is confirmed in Algeria.
- Authentication, tenant isolation, usage metering and subscription entitlements are implemented.
- Terms, privacy, cancellation and refund flows are published.
- Sandbox end-to-end tests pass.
- A low-value live test and refund are completed only after provider and legal approval.

## Marketing while payment is pending

Market an honest free preview or recruit a no-payment design-partner cohort. Do not show a functioning Subscribe button, claim payments are accepted, or promise features that are not implemented. Do not publish the founder's PayPal email. Convert to paid marketing only after the go-live gate passes.

## Algeria-specific eligibility findings (checked 9 November 2026)

PayPal's Algeria help page distinguishes Personal accounts (personal payments and casual sellers) from Business accounts (merchant checkout products such as PayPal Checkout). PayPal's developer seller-onboarding country table currently lists Algeria as:
- Business, before PayPal Checkout: Yes
- Business, after PayPal Checkout: Yes
- Casual, before PayPal Checkout: No
- Casual, after PayPal Checkout: No

This means the founder's existing Personal account, even if it has received game-payout funds, is not eligible for the documented PayPal Checkout integration path in Algeria. A personal incoming payout does not prove merchant or recurring-billing eligibility. Do not wire that Personal account into SaaS subscriptions or label commercial sales as personal transfers.

PayPal's Algeria Business-account onboarding information asks for a business registration number and business bank details. The founder has stated they do not currently have a commercial registration (RC), so do not attempt to create a Business account with invented details. Contact PayPal support for written clarification on accepted Algerian individual/auto-entrepreneur documents and recurring subscription API access before proceeding.

Potential Algerian formalization route to investigate: ANAE's official eligible activity catalogue includes digital activities such as AI system development (code 020710), software development, and digital marketing. The correct activity for operating a hosted SaaS product, annual turnover ceiling, export-of-services rules, tax/social-security treatment, foreign-currency receipt and repatriation requirements must be confirmed with ANAE, the tax authority and the receiving bank. ANAE eligibility is not itself proof that PayPal will approve a merchant account.

Official references:
- https://www.paypal.com/dz/cshelp/article/ما-الفرق-بين-الحسابات-الشخصية-والتجارية؟-help318?locale.x=ar_DZ
- https://developer.paypal.com/platforms/seller-onboarding
- https://activities.anae.dz/activities/020700/
- https://anae.dz/ar/


## Alternative payout route researched on 9 November 2026

A possible way to keep the founder's existing personal PayPal account as the **payout destination** (not as the direct customer checkout) is a Merchant of Record provider:

- Lemon Squeezy's official supported-country page lists Algeria for bank payouts, and its payout guide says PayPal payouts can go to a verified Personal or Business PayPal account. PayPal payouts are in USD, are created twice monthly, have a 13-day sales hold, and require a $50 minimum payout. Sources: https://docs.lemonsqueezy.com/help/getting-started/supported-countries and https://docs.lemonsqueezy.com/help/getting-started/getting-paid
- This is not approval. Lemon Squeezy still reviews the merchant, identity, product and payout details; the founder must complete onboarding truthfully and confirm that the account can be approved for an AI SaaS product from Algeria. A verified PayPal Personal payout destination is not the same as permission to use that personal account as the site's direct checkout merchant.
- Paddle's current official supported-country page says it works with software businesses worldwide except its published unsupported list; Algeria is not on that list. However, this alone does not confirm a specific Algerian founder's onboarding or payout method. Source: https://www.paddle.com/help/start/account-verification/which-countries-are-supported-by-paddle

Recommended next step: compare Lemon Squeezy first for the specific requirement of receiving payouts to the existing verified personal PayPal account, while also checking direct Algerian bank payout as a fallback. Do not integrate live checkout until merchant approval and Algerian legal/tax/banking requirements are confirmed. Never describe this route as guaranteed.
