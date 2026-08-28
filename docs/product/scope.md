# Scope

## MVP

The first usable vertical slice is **Event → Seat selection → Reservation → Stripe test checkout → Ticket**.

Included: OAuth authentication, organisations and roles, venues and reserved seating, events/sessions, ticket types and prices, event discovery, transaction-safe reservations with expiry, orders, Stripe test-mode payments/webhooks, ticket generation/validation, transactional email, basic organiser management, Docker-based development and CI.

## V1

After the core flow is reliable: Typesense search and indexing, Redis-backed caching/rate limiting/pub-sub, live seat-map updates, refunds, richer organiser dashboards, audit logs, S3 media uploads, expanded observability, E2E/concurrency/load testing and AWS deployment.

## Future possibilities

Waiting rooms, dynamic pricing, advanced fraud/bot controls, recommendation systems, complex general-admission inventory, mobile applications, multiple payment providers and sophisticated tax/accounting functionality.

## Explicitly out of scope initially

Microservices, Kubernetes, native mobile clients, cryptocurrency payments, AI recommendations, complex anti-fraud systems, multi-region active-active deployment and real-money production operation.

## Scope principle

Depth is preferred over feature count. A smaller system that proves reservation correctness, payment idempotency and authorization is more valuable than a broad feature set with weak guarantees.
