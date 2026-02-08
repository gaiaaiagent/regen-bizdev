# Integration Blueprint Workflow

Design the technical architecture for clients using Regen as backend infrastructure. Covers data flow, API touchpoints, key management, and phased implementation.

## Input

Client platform description, integration requirements, and technical constraints from call transcripts or prospect briefs.

## Process

1. Map the client's existing platform architecture
2. Identify integration points with Regen's infrastructure
3. Design data flow from client platform to Regen Registry
4. Address key management (custodial vs non-custodial)
5. Define phased implementation with clear milestones
6. Reference actual Ledger MCP capabilities for API touchpoints

## Output Structure

```markdown
# Integration Blueprint: [Client Name] + Regen Registry

## Architecture Overview

```
[Client Platform] → [API Layer] → [Regen Registry] → [Verification/Attestation]
     |                    |               |                     |
  Field Data        REST/gRPC      Ecocredit Module      Data Module
  Collection        Interface      (credit classes,      (anchoring,
  & Processing                     batches, projects)    attestation)
```

## Integration Points

### Regen Ledger Modules
| Module | Purpose | Key Operations |
|--------|---------|----------------|
| `ecocredit/base` | Credit class and project management | CreateClass, CreateProject, CreateBatch, Send, Retire |
| `ecocredit/marketplace` | Credit trading | SellOrder, BuyDirect, AllowedDenom |
| `data` | Data anchoring and attestation | AnchorData, Attest, ResolveIRI |

### API Access
| Endpoint | Purpose | Auth |
|----------|---------|------|
| Regen Ledger REST API | Query credit classes, projects, batches | Public (read) |
| Regen Ledger gRPC | Transaction submission | Wallet signing |
| `api.regen.network` | Metadata IRI resolution | Public |
| KOI API | Knowledge graph queries | API key |

## Data Flow
| Step | Source | Data | Destination | Format |
|------|--------|------|-------------|--------|
| 1 | Field collection | Raw ecological data | [Client platform] | [Client format] |
| 2 | [Client platform] | Processed metrics | Regen data module | JSON → content hash |
| 3 | Regen data module | Anchored data + attestation | On-chain | Tx hash + IRI |
| 4 | [Client platform] | Credit issuance request | Regen ecocredit module | MsgCreateBatch |
| 5 | Regen marketplace | Credit retirement/transfer | Buyers/retirees | On-chain records |

## Key Management Approach

### Option A: Custodial (Recommended for Pilot)
- Regen manages signing keys on behalf of client
- Lower technical barrier for initial integration
- Client platform sends requests; Regen infrastructure signs and submits
- Transition to non-custodial when client is ready

### Option B: Non-Custodial
- Client manages their own signing keys
- Full sovereignty over on-chain operations
- Requires client-side key management infrastructure
- Recommended for production after pilot validation

## Phased Implementation
| Phase | Duration | Deliverables | Dependencies |
|-------|----------|-------------|--------------|
| 1: Foundation | [X weeks] | Credit class mapping, methodology alignment, data schema | Methodology assessment complete |
| 2: Data Pipeline | [X weeks] | Data anchoring integration, content hash generation, test attestations | Phase 1 complete |
| 3: Credit Issuance | [X weeks] | Project registration, batch issuance workflow, verification checkpoints | Phase 2 complete + methodology approved |
| 4: Production | [X weeks] | Full pipeline, monitoring, marketplace integration | Phase 3 complete |

## Technical Prerequisites

### Client Side
- [What the client needs to have in place]

### Regen Side
- [What Regen needs to provide]

## Security Considerations
- Transaction signing security
- Data integrity (content hashing ensures tamper detection)
- Access control for credit issuance
- Audit trail via on-chain transaction history
```
