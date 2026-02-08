# Deal Dossier: Renew/RePlanet

## Executive Summary

Renew (formerly rePLANET) is a UK-based nature data and intelligence company focused on landscape-scale ecological restoration. They want Regen as **backend infrastructure** — not front-facing — to anchor biodiversity data on-chain and issue verifiable credits using their Wallacea Trust 5-taxa methodology. The partnership is complementary: Renew operates upstream (intelligence, prioritization, ecological surveys), Regen operates downstream (methodologies, registry, verification, markets).

## Relationship Timeline

| Date | Event | Key People | Outcome |
|------|-------|------------|---------|
| Mar 2025 | Initial call with rePLANET | Gregory (Regen), rePLANET team | Explored landscape intelligence + registry synergies; identified complementary positioning (upstream data → downstream registry) |
| Jan 2026 | Follow-up call with Renew | Gregory (Regen), Mark Moore (Renew Tech Lead) | Deeper technical scoping; Mark raised key management, API integration, and developer support concerns; discussed biodiversity credit stacking on Verra carbon |

## Client Needs Assessment

| Need | Priority | Evidence (from their words) | Regen Capability |
|------|----------|---------------------------|-----------------|
| Backend registry infrastructure | High | Want Regen as infrastructure layer, not front-facing partner | Regen Ledger ecocredit module — credit class management, project registration, batch issuance |
| Biodiversity credit issuance | High | Wallacea Trust 5-taxa methodology; conservation-weighted scoring across Forest Structure, Invertebrates, Breeding Birds, Bat Fauna, Higher Plants | BT01 (BioTerra) credit class — weighted 10m^2 biodiversity scoring; potential methodology extension |
| Data integrity & verification | High | Mark Moore: needs independently verifiable ecological claims for BFI and corporate partners | `regen/data/v1` module — content hashing, on-chain attestation, IRI resolution for third-party verification |
| Key management | High | Mark Moore concerned about custodial vs non-custodial approaches | Custodial pilot → non-custodial production transition pathway |
| API integration & developer support | High | Mark Moore needs clear API docs, SDK, and integration examples | Regen Ledger REST/gRPC API, KOI API for knowledge access |
| Biodiversity + carbon credit stacking | Medium | Stack biodiversity credits on top of Verra carbon credits | Multi-class credit issuance — carbon (C01-C09) + biodiversity (BT01) for same project |
| Landscape-scale approach support | Medium | Focus on ecosystem-level outcomes rather than single-site optimization | Multi-project registration under single credit class; batch issuance across sites |

## Open Items & Decisions Pending

- [ ] **Wallacea Trust methodology mapping** — Owner: Regen BD team, Status: Not started. Need formal dimension-by-dimension mapping to BT01 credit class requirements
- [ ] **Key management architecture** — Owner: Mark Moore + Regen engineering, Status: Needs technical scoping. Custodial vs non-custodial for pilot phase
- [ ] **BFI verification workflow** — Owner: Joint, Status: Conceptual. How does a third party like BFI independently verify Renew's ecological claims using on-chain attestation records?
- [ ] **Verra carbon credit stacking specifics** — Owner: Joint, Status: Needs clarification. How do Renew's biodiversity credits interact with existing Verra carbon credits? Parallel issuance or wrapped?
- [ ] **Developer support package** — Owner: Regen engineering, Status: Needs scoping. SDK documentation, integration examples, sandbox access

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Wallacea Trust methodology doesn't map cleanly to existing credit classes | Medium | High | BT01 is closest match; may need methodology extension or new credit class proposal. Gap analysis in Act 2 will quantify. |
| Renew selects a competing registry provider | Medium | High | Demonstrate clear technical differentiation through data anchoring and attestation capabilities that alternatives lack |
| Key management complexity deters adoption | Low | Medium | Start with custodial approach for pilot; provide transition plan to non-custodial |
| Biodiversity credit market immaturity | Medium | Medium | Frame as first-mover advantage; reference growing BT01/MBS01/USS01 ecosystem on Regen |
| Technical integration requires more resources than anticipated | Medium | Medium | Phased approach — pilot with minimal integration, expand after validation |

## Recommended Engagement Approach

Lead with technical infrastructure demonstration, not partnership narrative. Renew has sophisticated technical leadership (Mark Moore) who will evaluate based on capability, not claims. The demo should show: (1) their Wallacea Trust methodology mapped against real credit class structures, (2) their biodiversity survey data anchored on-chain with attestation, (3) a concrete integration architecture addressing Mark's key management and API concerns.

Frame the engagement as an 8-week sprint with defined deliverables, not an open-ended exploration. Renew is evaluating other options — speed and specificity matter.

## Draft Proposal Outline

1. **Registry Readiness Assessment** — Formal mapping of Wallacea Trust 5-taxa methodology to Regen credit class framework (BT01 primary target), with gap analysis and methodology extension recommendations
2. **Data Anchoring Proof-of-Concept** — Anchor a sample biodiversity survey dataset on Regen Ledger; demonstrate content hashing, attestation, and third-party verification flow
3. **API Integration Scaffold** — Build the Renew Platform → Regen Registry data pipeline with REST/gRPC endpoints, authentication, and test environment
4. **Key Management Implementation Plan** — Custodial pilot architecture with non-custodial transition roadmap; address Mark Moore's specific concerns
5. **Attestation Framework + BFI Validation Workflow** — Design the multi-party attestation flow enabling BFI and other corporate partners to independently verify ecological claims
6. **Credit Stacking Architecture** — Technical design for issuing biodiversity credits (BT01) alongside existing Verra carbon credits for the same project area
