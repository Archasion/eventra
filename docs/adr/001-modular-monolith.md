# ADR-001: Use a Modular Monolith

**Status:** Accepted  
**Date:** 2026-08-28

## Context

Eventra spans authentication, organisations, events, inventory, reservations, payments and tickets. These domains need clear boundaries, but several correctness-sensitive workflows benefit from straightforward PostgreSQL transactions. A portfolio project also has limited operational value in independently deploying many services before scale requires it.

## Decision

Implement the backend as a Node.js/TypeScript modular monolith hosted by Express with tRPC. Domain modules expose explicit application interfaces. Background workers may run as separate processes but share domain/packages where appropriate.

## Alternatives considered

**Microservices:** stronger independent deployment boundaries but substantially more network, consistency, deployment and observability complexity without demonstrated need.  
**Single unstructured application:** simpler initially but encourages coupling and weak domain ownership.

## Consequences

Cross-domain transactions remain practical and local development is simpler. Module boundaries must be enforced by code organization/review rather than network boundaries. A future service extraction remains possible if measured scaling or ownership needs justify it.
