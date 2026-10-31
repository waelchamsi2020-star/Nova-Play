# Production target — 100,000 concurrent players

This is a target architecture, not an implemented or load-tested capacity claim. The delivered Node/SQLite server is a single-host development environment. The static interface can be served separately from the production APIs.

## Required production boundaries

1. CDN/object storage for frontend and artwork; WAF, bot protection and regional routing at the edge.
2. Stateless authenticated API services behind a load balancer; independently deployed identity, player profile, catalog, wallet, payments, provider sessions, promotions and reporting boundaries. Enforce authorization and tenant/account ownership at the server, never from the visible admin UI.
3. PostgreSQL with high availability, tested backup/restore, a financial ledger with immutable double-entry postings, currency-specific precision, explicit available/reserved balances, durable idempotency keys and transactional settlement. The current SQLite ledger is a demo balance record, not a completed production accounting implementation.
4. Shared session/rate-limit storage, caching and distributed coordination using Redis or equivalent. Never use browser state as the financial authority.
5. Durable message queue and transactional outbox for provider callbacks, reconciliation, notifications and analytics. Retry policies, dead-letter queues and operational replay tooling.
6. Provider-specific adapters: launch sessions, signatures, replay protection, wallet contracts, bet/win/rollback ordering, duplicate callback semantics, settlement reports and currency handling. Unknown until the vendors supply documentation and sandbox access.
7. Independent administrative application with SSO/MFA, least-privilege roles, audit logging and dual approval for sensitive financial actions. The visual preview admin is not this security boundary.
8. KYC/AML integration, account restrictions and responsible-play controls per target market and operating requirements. Server-side enforcement across all adapters.
9. Observability: request traces, latency and error metrics, ledger invariants, reconciliation alerts, provider health and audit retention. Fail closed when settlement integrity is uncertain.

## Capacity model to validate

100,000 concurrent sessions is not equal to 100,000 simultaneous financial writes. Model session length, active-player percentage, game mix, rounds per second, callbacks per round, duplicate/retry bursts, websocket traffic and payment volume with each provider. Validate agreed rate limits and disaster-recovery commitments contractually.

## Acceptance evidence before launch

- Realistic sustained and burst load, plus multi-hour soak tests, with explicit p95/p99 latency and error budgets agreed with the operator.
- Duplicate/out-of-order callbacks, partial network failures, payment reversals, concurrent withdrawals and process restarts.
- No lost or duplicated postings; balances reconciled to provider and payment statements.
- Database failover and restore drills, queue replay and region/provider outage exercises.
- External security review and jurisdiction-specific operating review.
- Professionally reviewed translations, accessibility, mobile and cross-browser checks.

## Vendor handoff checklist

Collect documentation URLs, sandbox endpoints, test credentials through a secret manager, signing conventions, wallet type (seamless/transfer), idempotency and rollback rules, supported games/currencies/languages/countries, certified game manifests, operational contacts, rate limits and settlement samples. Provider-ready status cannot be inferred from an API key alone.
