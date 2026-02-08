# Integration Blueprint: Renew + Regen Registry

## Architecture Overview

```
Renew Platform                API Layer              Regen Ledger                 Verification
──────────────                ─────────              ────────────                 ────────────

Field Collection     →     REST/gRPC         →     Ecocredit Module        →     Third-Party
(5-taxa surveys,           Interface                (credit classes,              Attestation
 AudioMoth data,           (authenticated)           batches, projects)           (BFI, auditors)
 territory maps)               │                          │
      │                        │                          │
Processing &         →     Content Hash      →     Data Module             →     IRI Resolution
QA Pipeline                Generation               (regen/data/v1:              (api.regen.network
(Wallacea Trust             (SHA-256/                 anchoring,                  → verify integrity)
 v2.1 scoring)               BLAKE2b)                 attestation)
```

## Integration Points

### Regen Ledger Modules

| Module | Purpose | Key Operations | Renew Use Case |
|--------|---------|----------------|----------------|
| `ecocredit/base` | Credit class and project management | `MsgCreateProject`, `MsgCreateBatch`, `MsgSend`, `MsgRetire` | Register restoration sites, issue biodiversity credits under BT01, enable credit trading/retirement |
| `ecocredit/marketplace` | Credit trading | `MsgSell`, `MsgBuyDirect`, `AllowedDenom` | List biodiversity credits for sale, enable direct purchases by corporate buyers |
| `data` | Data anchoring and attestation | `MsgAnchorData`, `MsgAttest` | Anchor survey data on-chain, enable multi-party attestation (Renew + BFI) |

### API Access

| Endpoint | Purpose | Auth | Renew Integration |
|----------|---------|------|-------------------|
| Regen Ledger REST API (`api.regen.network`) | Query credit classes, projects, batches, attestations | Public (read) | Read-only queries for project status, batch details, attestation records |
| Regen Ledger gRPC | Transaction submission (anchor, attest, create batch) | Wallet signing (secp256k1) | Write operations — submit signed transactions for data anchoring and credit issuance |
| Metadata IRI Resolver (`api.regen.network`) | Resolve content-addressed metadata IRIs | Public | Verification — resolve IRI to original survey data, verify content hash |
| KOI API | Knowledge graph queries for methodology and governance context | API key | Methodology research — query registry handbook, precedent reviews, credit class documentation |

## Data Flow

| Step | Source | Data | Destination | Format | Frequency |
|------|--------|------|-------------|--------|-----------|
| 1 | Field surveys (UK restoration sites) | Raw ecological data: species counts, acoustic recordings, territory maps, botanical assessments | Renew Platform | CSV, AudioMoth WAV, GIS shapefiles | Per survey event (biennial per Wallacea Trust v2.1) |
| 2 | Renew Platform | Processed survey: conservation-weighted taxa scores, composite biodiversity score | Renew Data Pipeline | JSON (standardized schema) | After QA review |
| 3 | Renew Data Pipeline | Content hash of processed survey JSON | Regen Ledger (data module) | `MsgAnchorData` transaction | Per survey anchoring |
| 4 | Renew Platform | Attestation: "This data was collected by Renew using Wallacea Trust v2.1" | Regen Ledger (data module) | `MsgAttest` transaction | Per anchoring event |
| 5 | Renew Platform | Credit batch issuance request: project, vintage, quantity, metadata IRI | Regen Ledger (ecocredit module) | `MsgCreateBatch` transaction | Per crediting period |
| 6 | BFI / third-party verifier | Independent attestation: "We verified this data" | Regen Ledger (data module) | `MsgAttest` transaction | Per verification event |
| 7 | Marketplace | Credit retirement records | Buyers / corporate partners | On-chain transaction | Per retirement |

## Key Management Approach

### Option A: Custodial (Recommended for Pilot)

```
Renew Platform  →  API Request  →  Regen Custodial Service  →  Sign & Submit  →  Regen Ledger
                   (unsigned)       (manages keys on behalf      (tx signed          (on-chain)
                                     of Renew)                   server-side)
```

**Advantages:**
- No key management infrastructure required on Renew's side
- Lower technical barrier for pilot — Renew sends API requests, Regen handles signing
- Faster time to first integration (days, not weeks)
- Mark Moore's team can focus on data pipeline, not cryptographic key management

**Implementation:**
- Regen provisions a custodial account for Renew
- Renew sends unsigned transaction payloads via authenticated REST API
- Regen custodial service signs and broadcasts transactions
- Renew retains full visibility via on-chain transaction logs

**Security considerations:**
- Custodial keys stored in HSM (hardware security module) or cloud KMS
- API authentication via API key + IP allowlisting
- Transaction limits and approval workflows configurable
- Full audit trail on-chain — every transaction publicly verifiable

### Option B: Non-Custodial (Recommended for Production)

```
Renew Platform  →  Generate & Sign TX  →  Broadcast  →  Regen Ledger
                   (Renew holds keys,      (direct         (on-chain)
                    signs locally)          submission)
```

**Advantages:**
- Full sovereignty — Renew controls their own signing keys
- No dependency on Regen for transaction submission
- Industry-standard security for production environments

**Implementation:**
- Renew generates and manages their own Regen account keypair
- SDK provides signing libraries (Go, TypeScript, Python via cosmpy)
- Transactions signed locally, broadcast to Regen node
- Key rotation, backup, and recovery procedures documented

**Transition plan (Custodial → Non-Custodial):**
1. Pilot phase: Custodial service handles all signing (Weeks 1-8)
2. Parallel testing: Renew deploys local signing alongside custodial (Weeks 9-10)
3. Migration: Transfer project admin rights to Renew's self-managed account (Week 11)
4. Decommission: Custodial service access revoked, Renew fully self-sovereign (Week 12)

## Phased Implementation

| Phase | Duration | Deliverables | Dependencies |
|-------|----------|-------------|--------------|
| **1: Foundation** | Weeks 1-2 | Credit class mapping (Wallacea Trust → BT01), data schema alignment, test environment setup, custodial account provisioning | Registry readiness assessment complete |
| **2: Data Pipeline** | Weeks 3-4 | Data anchoring integration (survey JSON → content hash → `MsgAnchorData`), test attestations, IRI resolution verification | Phase 1 complete |
| **3: Credit Issuance** | Weeks 5-6 | Project registration (test site under BT01), batch issuance workflow, attestation framework for BFI verification pathway | Phase 2 complete |
| **4: Production** | Weeks 7-8 | Full pipeline (field → platform → registry → marketplace), monitoring dashboard, key management transition plan, documentation package | Phase 3 complete |

## Technical Prerequisites

### Renew Side
- REST API client capability (authenticated requests to Regen custodial service)
- JSON schema compliance for survey data output (standardized from Wallacea Trust v2.1 processing)
- Content hash generation library (SHA-256 or BLAKE2b — reference implementation provided)
- Webhook endpoint for receiving transaction confirmation callbacks

### Regen Side
- Custodial signing service provisioned for Renew pilot
- BT01 credit class methodology extension (if needed based on mapping results)
- API documentation package with integration examples
- Test environment (Regen testnet) with funded test accounts
- Developer support: dedicated integration contact, SDK access, documentation

## Security Considerations

- **Transaction signing:** All write operations require cryptographic signature (secp256k1). Custodial keys stored in HSM/cloud KMS during pilot.
- **Data integrity:** Content hashing ensures tamper detection. Any modification to survey data after anchoring is cryptographically detectable.
- **Access control:** Credit class admin controls who can issue credits. Project admin controls who can modify project metadata.
- **Audit trail:** All transactions on-chain and publicly queryable. Complete provenance chain from field data to credit retirement.
- **API security:** Authenticated API access with rate limiting. IP allowlisting for custodial service.

## Developer Support Package

| Resource | Description | Access |
|----------|-------------|--------|
| Regen SDK (Go) | Full Ledger client library | GitHub: regen-network/regen-ledger |
| CosmJS integration | TypeScript/JavaScript client | npm: @regen-network/api |
| API documentation | REST and gRPC endpoint reference | guides.regen.network |
| Testnet faucet | Test REGEN tokens for development | Available via Discord |
| Integration examples | Sample code for anchoring, attestation, credit issuance | Provided during onboarding |
| Developer support | Dedicated integration contact | Assigned at pilot kickoff |

Sources:
- Ecocredit module concepts: KOI RID `regen.github:github_regen-ledger_x_ecocredit_spec_01_concepts.md#chunk0`
- Credit class management tutorial: KOI RID `regen.github:github_regen-ledger_docs_tutorials_user_credit-class-project-batch-management.md#chunk16`
- API endpoints: KOI RID `regen.github:github_regen-ledger_proto_regen_ecocredit_v1_query.proto#chunk8`
- Data module: KOI RID `regen.github:github_regen-ledger_x_data_spec_README.md#chunk1`
