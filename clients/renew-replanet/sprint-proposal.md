# Registry Integration: Renew/RePlanet + Regen Network

_Prepared for Renew/RePlanet leadership and technical team_

## Executive Summary

Renew's five-taxa biodiversity data maps to a registry that has issued **78+ credit batches across 58 projects in 10+ countries**, including 2 active BioTerra (BT01) biodiversity projects already in production. Carbon stacking with existing Verra credits is ready now — biodiversity registration follows a clear pathway.

We propose a phased engagement starting with a **2-week discovery sprint ($15-20K)** that delivers a full credit class mapping, pre-review simulation, and go/no-go recommendation. If the discovery sprint confirms viability, an **8-week registry sprint** builds a working integration — from formal methodology alignment to data anchoring proof-of-concept.

Our preliminary assessment identified **2 credit classes matched** (carbon via C01-C09, biodiversity via BT01) with 3 partnership opportunities that the registry sprint addresses. The Wallacea Trust methodology has strong data quality — the work is aligning the 5-taxa conservation-weighted approach with Regen's credit class framework.

## Why Now

- Renew is evaluating infrastructure partners. The discovery sprint demonstrates commitment with minimal risk — $15-20K for a go/no-go recommendation before committing to the full sprint.
- BT01 (BioTerra) credit class exists on Regen Ledger with **2 active projects already in production**. Biodiversity credits on Regen are operational, not theoretical. Early engagement shapes how this class evolves.
- Regen's data module (`regen/data/v1`) provides the exact trust infrastructure Mark Moore asked about: content-addressed data, cryptographic attestation, third-party verifiability.
- The registry has a **4-year production track record** (vintage dates 2012-2024) — the kind of institutional foundation that withstands due diligence.

---

## Phase 0: Discovery Sprint (Weeks 1-2) — Entry Point

**Duration:** 2 weeks | **Investment:** $15-20K

**Goal:** Full credit class mapping with live ledger verification, pre-review simulation, and a clear go/no-go recommendation.

**Deliverables:**

| Deliverable | Description |
|-------------|-------------|
| Full credit class mapping | Live ledger verification of all 5 taxa against BT01, USS01, C01-C09 |
| Pre-review simulation | Registry governance criteria assessment with specific evidence requirements |
| Pathway document | Timeline and cost estimates for full registration |
| Go/no-go recommendation | Evidence package outline with clear next steps |

**What you get:** A clear answer — does the Wallacea Trust methodology have a viable pathway on Regen's registry? The discovery sprint produces **assessment and recommendations** (paper deliverables). If it confirms viability, the registry sprint produces **working software** — testnet prototypes, API scaffolds, data anchoring proof-of-concept. If not, you've invested $15-20K to avoid a much larger misalignment.

**Next step:** 30-minute scoping call to define discovery sprint objectives.

---

## Phase 1-4: Registry Sprint (Weeks 3-10) — Full Integration

_Proceeds only after successful discovery sprint._

### Phase 1: Credit Class Mapping (Weeks 3-4)

**Goal:** Formal mapping of Wallacea Trust v2.1 to Regen's credit class framework, building on discovery sprint findings.

**Deliverables:**
- Dimension-by-dimension mapping document: all 5 taxa mapped to BT01 (BioTerra), with USS01 (Umbrella Species Stewardship) as secondary pathway for Red List species
- Unit conversion specification: Wallacea Trust conservation-weighted scoring → BT01 "weighted 10m^2 score" framework
- Partnership opportunity sprints for each identified gap:
  - **BT01 Scoring Integration Sprint** — map conservation-weighted scores to BT01 units → _enables first biodiversity credit batch issuance_
  - **Acoustic Monitoring Data Integration** — integrate acoustic data into registry-compatible format → _qualifies for formal registry submission_
  - **Carbon Stacking Architecture** — Verra + Regen dual-class design → _unlocks dual-class credit revenue (carbon + biodiversity)_
- Draft methodology alignment document suitable for registry submission preparation

**Key question to resolve:** Should Wallacea Trust map to an extension of BT01, or propose a new terrestrial biodiversity credit class? This decision shapes the rest of the sprint.

### Phase 2: Data Anchoring Pilot (Weeks 5-6)

**Goal:** Working proof-of-concept anchoring real biodiversity survey data on Regen Ledger.

**Deliverables:**
- Content hash generation library integrated with Renew's data pipeline (SHA-256 or BLAKE2b)
- Test anchoring: sample biodiversity survey JSON → content hash → `MsgAnchorData` on Regen testnet
- Test attestation: Renew signs `MsgAttest` transaction — demonstrating "like signing a legal document" model
- IRI resolution verification: anchored data resolvable via `api.regen.network` with hash integrity check
- Documentation: step-by-step guide for Renew engineering team

**Addresses Mark Moore's concerns:** This phase directly demonstrates:
- How survey data becomes tamper-evident on-chain
- What an attestation record looks like and what it commits to
- How BFI (or any third party) can independently verify data integrity

### Phase 3: API Integration Scaffold (Weeks 7-8)

**Goal:** Working data pipeline from Renew's platform to Regen registry.

**Deliverables:**
- REST API integration: authenticated endpoints for anchoring and attestation
- Data pipeline scaffold: survey completion → QA → hash → anchor → attest workflow
- Custodial key management setup: Regen provisions signing account for Renew pilot
- Transaction lifecycle monitoring: webhook callbacks for transaction confirmation
- Test credit batch: register a test project under BT01, issue sample credits referencing anchored data

**Technical stack:**
- Regen Ledger REST API + gRPC for write operations
- Custodial signing service (transition to non-custodial in Phase 4)
- Standard REST client integration — no blockchain SDK required on Renew's side during pilot

### Phase 4: Verification Framework (Weeks 9-10)

**Goal:** BFI validation workflow and attestation framework.

**Deliverables:**
- BFI verification pathway design: how a third party adds independent attestation to Renew's anchored data
- Multi-party attestation framework: data collector (Renew) + verifier (BFI) + registry (Regen) — each party's attestation is independent and cryptographically signed
- Key management transition plan: custodial → non-custodial roadmap with milestones
- Complete documentation package: integration guide, key management procedures, attestation protocol, developer reference
- Sprint summary report with production readiness assessment

## Deliverables Summary

| # | Deliverable | Week | Format |
|---|------------|------|--------|
| — | **Discovery Sprint** | | |
| 0a | Full credit class mapping (live ledger verification) | 2 | Markdown/PDF |
| 0b | Pre-review simulation | 2 | Assessment doc |
| 0c | Pathway document + go/no-go recommendation | 2 | Report |
| — | **Registry Sprint** (if discovery sprint confirms viability) | | |
| 1 | Formal credit class mapping document (BT01 + USS01) | 4 | Markdown/PDF |
| 2 | Unit conversion specification | 4 | Technical spec |
| 3 | Content hash generation library | 6 | Code (Python/TS) |
| 4 | Test anchoring + attestation on Regen testnet | 6 | Working prototype |
| 5 | IRI resolution verification guide | 6 | Documentation |
| 6 | REST API integration scaffold | 8 | Code + API docs |
| 7 | Custodial key management setup | 8 | Working service |
| 8 | Test credit batch (BT01) with anchored data | 8 | On-chain record |
| 9 | BFI verification pathway design | 10 | Architecture doc |
| 10 | Key management transition plan | 10 | Roadmap doc |
| 11 | Sprint summary + production readiness assessment | 10 | Report |

## Team & Time Commitment

**Regen side:**
- Integration engineer: ~20 hrs/week (data pipeline, API, key management)
- Registry science: ~10 hrs/week (methodology mapping, credit class alignment)
- Project lead: ~5 hrs/week (coordination, deliverable review)

**Renew side:**
- Technical contact (Mark Moore or delegate): ~10 hrs/week (integration, data pipeline)
- Methodology expert: ~5 hrs/week (Wallacea Trust documentation, mapping review)

**Cadence:** Weekly 30-min sync. Async communication via shared channel.

## Success Criteria

| Criterion | Metric |
|-----------|--------|
| Credit class mapping complete | All 5 taxa dimensions mapped with pass/partial/gap status |
| Data anchoring works | ≥1 survey dataset anchored and resolvable on Regen testnet |
| Attestation works | ≥2 parties (Renew + simulated verifier) have attested to anchored data |
| API integration functional | Renew can submit anchoring requests via REST API |
| Verification pathway designed | BFI can follow documented steps to independently verify and attest |

## What This Sprint Is Not

- This is not a full methodology approval. Registry submission requires additional documentation and formal review (estimated 6+ months).
- This is not production deployment. The sprint produces a testnet prototype and integration scaffold.
- This is not exclusive. Renew retains full freedom to evaluate other partners and approaches.

## Full Journey

```
Discovery Sprint (2 weeks) → Registry Sprint (8 weeks) → Governance Review (~16-24 weeks) → First Credit Issuance
```

| Stage | Duration | Investment | Outcome |
|-------|----------|------------|---------|
| Discovery Sprint | 2 weeks | $15-20K | Go/no-go recommendation + full credit class mapping |
| Registry Sprint | 8 weeks | $40-60K | Working integration prototype on testnet |
| **Total** | **10 weeks** | **$55-80K** | **Full engagement if discovery confirms viability** |
| Governance Review | ~16-24 weeks | Included in registry fees | Formal methodology approval |
| First Credit Issuance | — | — | Carbon credits live; biodiversity credits following |

## Next Steps After Full Engagement

1. **Methodology submission preparation** (Months 4-7): Formalize Wallacea Trust → BT01 alignment for registry submission
2. **Production deployment** (Month 7-9): Move from testnet to mainnet; transition to non-custodial key management
3. **Carbon stacking** (Month 9-11): Implement Verra carbon credit bridging for dual-class issuance
4. **Scale** (Ongoing): Additional restoration sites, automated data pipeline, marketplace integration

## Start Here

**2-week discovery sprint — $15-20K.** Full credit class mapping, pre-review simulation, go/no-go recommendation. Low risk, high information.

**Next step:** 30-minute scoping call to define discovery sprint objectives.
