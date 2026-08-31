---
applyTo: 'apps/api/**/search/**/*.ts,apps/api/**/*typesense*.ts,apps/worker/**/search/**/*.ts,apps/worker/**/*index*.ts,packages/**/*typesense*.ts'
---

# Search Code Review Instructions

Typesense is a denormalized, rebuildable, eventually consistent search index.

- PostgreSQL remains authoritative for events, pricing, inventory, checkout, and transactional decisions.
- Search results must never be treated as authoritative seat availability.
- Do not use search-index data to validate a reservation or payment.
- Indexing failures should not corrupt authoritative application data.
- Index updates should be safe to retry.
- Search documents should be reconstructable from authoritative data.
- Review indexing for stale-document handling after event updates, unpublishing, or deletion.
- Do not expose private, draft, tenant-internal, or admin-only data in public search documents.
- Search filters must not become an authorization substitute.
- Ensure unpublished or inaccessible events are excluded according to product rules.
- Typesense API credentials must follow least-privilege exposure; server administration keys must never be shipped to the browser.
- Eventual consistency should be expected and handled rather than hidden by pretending indexing is transactional with PostgreSQL.
