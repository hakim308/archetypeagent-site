# Market research addendum — 9 November 2026

## What current evidence says

1. **Local discovery is under-served.** BrightLocal's 2026 Small Business Marketing Report says 61% of consumers begin local-business discovery with Google (52% Search and 9% Maps), while only 22% of SMBs believe Google is their most important channel. The report also says 47% of consumers will not use a business with fewer than 20 reviews, while 47% of SMBs have fewer than 20 reviews. Source: https://www.brightlocal.com/research/smb-marketing-report/
2. **Owners are overloaded and marketing feels technical.** BrightLocal reports 98% of surveyed SMB owners are primarily responsible for marketing decisions; 28% say doing more feels too technical. Source above.
3. **Businesses want execution, not another AI text box.** HubSpot's 2026 Small Business Trends report says AI is often used as a thinking partner and reports stronger performance among early AI agent users who use agents regularly. This supports guided workflows with business context, but does not prove willingness to pay for this product. Source: https://offers.hubspot.com/small-business-trends
4. **AI content generation is crowded and inexpensive.** Buffer publicly lists a free tier and an Essentials plan starting at $5 per channel/month on annual billing, including AI assistant and scheduling capabilities. Do not compete on generic captions or price. Source: https://buffer.com/pricing
5. **Operational follow-up remains a pain point.** CallRail's 2026 SMB research highlights lead follow-up/conversion, customer communication and content generation as challenges. Source: https://www.callrail.com/blog/ai-saas-msp-marketing-trends-2026

## Product decision

Keep the existing ecommerce campaign-pack direction as a future expansion, but add a narrow local-business workflow to the current MVP. The public studio now exposes these additional draft types:
- Public customer-review response (calm, privacy-preserving, no incentive manipulation)
- New-lead follow-up message (one helpful next step; respect consent and opt-outs)
- Google Business Profile update (truthful local update, no invented hours, addresses, prices or service areas)

These are **drafting workflows only**. The product does not read Google reviews, publish to Google Business Profile, send messages, manage leads or guarantee local ranking. Those require separate authorized integrations and user approval.

## Initial customer hypothesis to test

Interview US/UK English-speaking local service operators (home cleaning, plumbing, landscaping, salons, auto repair) with 1–10 staff. They often manage enquiries, reviews and local visibility themselves. Test whether they value the combined workflow enough to pay more than a generic AI writing tool.

Do not assume this segment is validated. Run 15 discovery interviews and 5 guided pilots before selecting a permanent niche.

## Pricing validation

Keep $19/month Starter, $39 Growth and $99 Agency as hypotheses only. Buffer's $5/channel annual Essentials entry price shows the generic scheduling category is price-competitive. To justify $19, Archetype must bundle practical local workflow templates, saved business context, reusable review/lead response playbooks and clear time saved. Do not advertise paid plans until account security, persistence, usage limits, cancellation, refunds and merchant eligibility work.

## 14-day validation experiment

- Days 1–3: contact 30 qualified local businesses individually; request 10-minute interviews.
- Days 4–7: complete 5 guided sessions using the review reply, lead follow-up and Google Business Profile draft workflows.
- Days 8–10: ask testers to repeat a workflow without help; record completion time and edits.
- Days 11–14: show the $19/month concept and ask for explicit willingness to pay; no charge during the experiment.
- Go/no-go: at least 5 complete a real workflow, 3 return to use it again, and 3 give a credible willingness-to-pay signal. Otherwise change the workflow or segment before adding integrations.

## Sources and caveats

These are directional survey findings and competitor-published prices, not guarantees or proof of demand for Archetype Agent. Surveys differ in geography, sample and methodology. Recheck competitor pricing before launch.


## Fresh market evidence — 9 November 2026

The additional sources below sharpen the product decision:

- Upwork's June 2026 survey of 750 US business leaders found SMB pilots concentrated in customer service (40%), scheduling/admin support (38%) and data analytics (37%). 74% reported some productivity improvement, but most gains were below 25%; privacy/security was a leading concern. This favors narrow workflows with measurable time saved, not broad claims of autonomous transformation. Source: https://www.upwork.com/resources/state-of-ai-in-smbs
- G2's October 14, 2026 AI Agents report says 72% of surveyed buyers consider a strong ecosystem of connectors/actions/skills very important or essential; 52% require human review before production; 77% re-evaluate agent performance at least monthly. Source: https://sell.g2.com/g2-2026-ai-agents-insight-report
- Pax8's October 12, 2026 survey of 1,150 SMB leaders in the US, UK, Germany and Sweden found 67% of AI-engaged SMBs had built at least one AI solution in regular use, while 35% had discovered unapproved AI tools or workflows. This makes clear permissions, auditability and data governance product requirements. Source: https://www.pax8.com/en-us/news-post/pax8-research-finds-small-businesses-are-building-ai-faster-than-they-can-govern-it/
- Network Solutions' October 20, 2026 survey of 187 US small-business AI users found 73% used more than one AI tool, 43% would pay more for one tool that did everything well, and 60% said AI saved at least two hours weekly. This supports a unified workflow experience, but the sample is small and self-reported. Source: https://www.networksolutions.com/blog/small-business-ai-usage-survey/
- Competitor mapping confirms that local reputation and messaging is not an empty category: Birdeye, Podium, BrightLocal, NiceJob, GatherUp and HighLevel already cover parts of review management, lead communication, local SEO and automation. Published prices range from entry-level review tools to several-hundred-dollar communication suites, while several vendors use quote-based pricing. Sources: https://birdeye.com/blog/google-review-management-software-2026/ ; https://revys.io/en/compare/podium-alternatives ; https://tailwind.reviews/blog/best-review-management-tools

## Updated strategic conclusion

Do not try to replace Birdeye, Podium or HighLevel in their entirety. A small new product cannot win by promising more integrations or deeper enterprise automation than established vendors.

Build a lightweight **AI workflow workspace for owner-operated local service businesses** with a simple promise: "Turn incoming customer questions, reviews and weekly marketing needs into accurate, ready-to-approve actions."

### MVP priority order

1. **Business knowledge profile:** store verified services, service area, opening hours, contact details, tone, FAQs and offer restrictions. The AI must use only approved facts and flag missing details.
2. **Lead-response workspace:** organize a lead's enquiry, draft a tailored reply, propose one next action and track whether a human approved/sent it. No unsolicited automated messages.
3. **Review-response workspace:** draft calm, specific responses, flag sensitive complaints, and require owner approval. Do not incentivize positive reviews or disclose customer information.
4. **Local content planner:** produce Google Business Profile and social drafts from approved business facts, with a simple calendar and status tracking. Publishing remains manual until official API access and consent are implemented.
5. **Weekly owner report:** show drafts created, approvals, pending follow-ups and time saved. Do not claim leads or revenue generated unless an actual tracking integration measures them.
6. **Integrations only after validation:** begin with one or two tools customers already use (for example email/CRM/calendar), selected from pilot interviews. Use official APIs, explicit OAuth permissions, least-privilege scopes and revocable connections.

### Trust and reliability requirements

- Human approval for outbound messages and public posts by default.
- Visible source facts and editable drafts; never invent prices, availability, credentials or results.
- Clear workspace ownership, role permissions, tenant isolation and audit log.
- Per-workspace usage limits, cost visibility, budget alerts and a hard stop.
- Explicit connected-app permissions, disconnect controls and data deletion/export.
- Monthly quality review and a feedback route for incorrect outputs.

### Revised validation test

Run 10–15 interviews with US/UK owner-operated home-service businesses (cleaning, plumbing, landscaping, salons or auto repair). Ask them to show the last real lead enquiry, customer review and weekly marketing task; do not lead with an AI pitch. Test the current draft workflows against those examples. Proceed with product build only if at least five owners complete a workflow, three return within seven days, and three provide a credible willingness-to-pay signal. Treat the $19/$39/$99 prices as hypotheses until tested.

### Scope discipline

The current website offers AI-generated drafts only. It does not yet connect to inboxes, CRM, Google Business Profile, review platforms or calendars; it does not send messages, publish posts, run a live agent, or measure revenue. Do not market these as existing features. Build the business profile, persistence, approval states, authentication, tenant security and usage metering before external integrations or live billing.
