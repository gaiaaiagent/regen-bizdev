# 8-Week Registry Integration Sprint: Renew/RePlanet + Regen Network

_Prepared for Renew/RePlanet leadership and technical team_

## Executive Summary

We propose an 8-week focused sprint to build a working registry integration between Renew's Wallacea Trust biodiversity methodology and Regen Network's registry infrastructure. The sprint delivers four concrete outputs: a formal credit class mapping, a data anchoring proof-of-concept, an API integration scaffold, and a third-party verification framework — moving from concept to working prototype.

This sprint builds on our preliminary registry readiness assessment, which scored the Wallacea Trust methodology at **5/10** — strong data quality but significant mapping work needed to align the 5-taxa conservation-weighted approach with Regen's credit class framework.

## Why Now

- Renew is evaluating infrastructure partners. This sprint demonstrates commitment with a scoped, deliverable-driven engagement.
- BT01 (BioTerra) credit class exists on Regen Ledger and is the closest match for multi-taxa biodiversity scoring. Early engagement shapes how this class evolves.
- Regen's data module (`regen/data/v1`) provides the exact trust infrastructure Mark Moore asked about: content-addressed data, cryptographic attestation, third-party verifiability.

## Sprint Structure

### Phase 1: Credit Class Mapping (Weeks 1-2)

**Goal:** Formal mapping of Wallacea Trust v2.1 to Regen's credit class framework.

**Deliverables:**
- Dimension-by-dimension mapping document: all 5 taxa mapped to BT01 (BioTerra), with USS01 (Umbrella Species Stewardship) as secondary pathway for Red List species
- Unit conversion specification: Wallacea Trust conservation-weighted scoring → BT01 "weighted 10m^2 score" framework
- Gap analysis with specific remediation steps for each gap:
  - Terrestrial invertebrate coverage (no existing class)
  - Acoustic monitoring data integration pathway
  - Carbon stacking architecture (Verra + Regen dual-class)
- Draft methodology alignment document suitable for registry submission preparation

**Key question to resolve:** Should Wallacea Trust map to an extension of BT01, or propose a new terrestrial biodiversity credit class? This decision shapes the rest of the sprint.

### Phase 2: Data Anchoring Pilot (Weeks 3-4)

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

### Phase 3: API Integration Scaffold (Weeks 5-6)

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

### Phase 4: Verification Framework (Weeks 7-8)

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
| 1 | Credit class mapping document (BT01 + USS01) | 2 | Markdown/PDF |
| 2 | Unit conversion specification | 2 | Technical spec |
| 3 | Content hash generation library | 4 | Code (Python/TS) |
| 4 | Test anchoring + attestation on Regen testnet | 4 | Working prototype |
| 5 | IRI resolution verification guide | 4 | Documentation |
| 6 | REST API integration scaffold | 6 | Code + API docs |
| 7 | Custodial key management setup | 6 | Working service |
| 8 | Test credit batch (BT01) with anchored data | 6 | On-chain record |
| 9 | BFI verification pathway design | 8 | Architecture doc |
| 10 | Key management transition plan | 8 | Roadmap doc |
| 11 | Sprint summary + production readiness assessment | 8 | Report |

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

## Next Steps After Sprint

If the sprint succeeds:
1. **Methodology submission preparation** (Months 3-6): Formalize Wallacea Trust → BT01 alignment for registry submission
2. **Production deployment** (Month 6-8): Move from testnet to mainnet; transition to non-custodial key management
3. **Carbon stacking** (Month 8-10): Implement Verra carbon credit bridging for dual-class issuance
4. **Scale** (Ongoing): Additional restoration sites, automated data pipeline, marketplace integration
