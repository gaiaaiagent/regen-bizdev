# Renew/RePlanet Demo Script

**Duration:** ~11 minutes (hard cap: 15 min)
**Structure:** 4 acts — Deal Dossier → Credit Class Mapping → Data Anchoring → Integration Blueprint

## Setup

Load a Claude project with:
- `foundation/system-prompt.md` (base agent identity)
- `clients/renew-replanet/demo-config.md` (client overlay)
- All client docs from `clients/renew-replanet/` (prospect brief, call transcripts, PDFs)
- MCP tools: KOI, Ledger

Pre-demo checklist:
- [ ] KOI MCP responding (`get_stats()` returns data)
- [ ] Golden outputs ready as fallback
- [ ] Mock data JSON ready to paste (`uk-restoration-biodiversity-survey.json`)

---

## Demo Sequence

### Act 1: "We've Done Our Homework" (2 min)

**PROMPT:**
> Synthesize everything we know about Renew from both calls and the prospect brief. What are their top priorities, what's still unresolved, and draft a proposal outline for a registry integration pilot.

**EXPECTED OUTPUT:** Deal Dossier with:
- Relationship timeline (Mar 2025 rePLANET call, Jan 2026 Renew call)
- Needs assessment (backend infrastructure, key management, developer support, biodiversity credit stacking)
- Open items (Mark Moore's technical concerns, BFI validation workflow, Verra stacking specifics)
- Draft proposal outline for registry integration pilot

**PRESENTER NOTES:** Move through this quickly. Say: "We loaded the call transcripts and prospect brief. The agent synthesized a complete relationship assessment. Impressive but table stakes for a good AI tool."

**TRANSITION:** "Now let me show you what's actually different about working with our infrastructure..."

---

### Act 2: "Your Methodology Meets Our Registry" (3 min) — THE MONEY SHOT

**PROMPT:**
> Map the Wallacea Trust 5-taxa methodology to Regen's credit class requirements. Show me what aligns, what has gaps, and what evidence would be needed for registry eligibility.

**EXPECTED OUTPUT:** Credit Class Mapper output with:
- Asset dimensions parsed: 3D Forest Structure, Invertebrates, Breeding Birds, Bat Fauna, Higher Plants
- Mapping table using real credit class IDs from Ledger:
  - BT01 (BioTerra) — closest match for multi-taxa biodiversity scoring (weighted 10m^2 score)
  - MBS01 (Marine Biodiversity Stewardship) — relevant as biodiversity precedent but marine-specific
  - USS01 (Umbrella Species Stewardship) — relevant for species-level conservation metrics
  - C01-C09 (Carbon) — relevant if Renew's Verra carbon credits stack on Regen
- Gap analysis: Wallacea Trust's 5-taxa approach doesn't directly map to any single existing class; BT01 is closest but may need methodology extension
- Registry readiness score with rubric
- Precedents from KOI: biodiversity credit type proposal (forum topic 49), desert regreening credit class proposal (forum topic 490)

**WHY IT'S DIFFERENT:** This output queries Regen's actual credit class registry (13 classes, 5 types) and searches 68K+ documents for methodology precedents. No generic AI tool has access to this data.

**PRESENTER NOTES:** Point to the credit class IDs. Say: "These aren't made up — BT01 is a real credit class on Regen Ledger for biodiversity. The agent queried our knowledge graph with over 68,000 documents and mapped your methodology against real registry requirements. No other AI tool can do this."

---

### Act 3: "Here's What Your Data Looks Like On-Chain" (3 min)

**PROMPT:**
> Here's a sample biodiversity survey from a UK restoration site [paste uk-restoration-biodiversity-survey.json]. Walk me through how this data would be anchored on Regen Ledger — what gets hashed, what the attestation record looks like, and how a third party like BFI could independently verify it.

**EXPECTED OUTPUT:** Data anchoring walkthrough with:
- Content hashing: survey JSON → SHA-256 digest → content hash identifier
- `MsgAnchorData`: content hash stored on-chain with timestamp and sender address
- `MsgAttest`: Renew signs as data collector; BFI can add independent verification attestation
- Metadata IRI resolution: permanent, verifiable pointer via `api.regen.network`
- Third-party verification workflow: resolve IRI → verify hash → review attestations
- Key property: no trust required in any single party — the chain is the source of truth

**WHY IT'S DIFFERENT:** This directly addresses Mark Moore's questions about trust infrastructure and key management. It shows their actual data type flowing through real Ledger mechanics, not a generic blockchain pitch.

**PRESENTER NOTES:** Say: "This is the trust infrastructure Mark asked about. The chain stores proof, not payload. Anyone can independently verify the data hasn't been tampered with. Multiple parties attest — Renew as data collector, BFI as independent verifier. That's composable verification."

---

### Act 4: "The Integration Path" (2 min)

**PROMPT:**
> Draft a Phase 1 integration architecture for Renew using Regen as backend infrastructure. Show the data flow from field collection through their platform to our registry, including key management and attestation checkpoints. Address Mark Moore's concerns about custodial key management and developer support.

**EXPECTED OUTPUT:** Integration Blueprint with:
- Architecture diagram: Renew Platform → API Layer → Regen Ledger (ecocredit + data modules)
- Data flow table: field survey → processing → content hash → anchor → attest → issue credits
- Key management recommendation: custodial for pilot, non-custodial transition plan
- API touchpoints from actual Ledger modules
- Phased implementation (4 phases, ~8 weeks)
- Developer support: SDK access, documentation, integration examples

**PRESENTER NOTES:** Frame as: "Here's the 8-week sprint to deploy this infrastructure for Renew."

---

### Close — "Registry Infrastructure, Not Just AI Synthesis" (1 min)

> "Everything you just saw — the methodology mapping against real credit classes, the data anchoring walkthrough, the integration architecture — these are outputs of our registry infrastructure, not just AI synthesis."
>
> "Claude Desktop gives you a chatbot. We give you an institutional platform. The same infrastructure Regen built for itself — now available to partners who need registry-grade ecological intelligence."
>
> "For Renew, we're proposing an 8-week sprint: credit class mapping, data anchoring pilot, API integration, and BFI verification framework. You get your own knowledge graph, your own web tooling, and AI agents with domain expertise."

---

### Follow-Up: 8-Week Sprint Proposal (send same day)

| Week | Deliverable |
|------|-------------|
| 1-2 | Wallacea Trust methodology → Regen credit class formal mapping (extend BT01 or propose new class) |
| 3-4 | Data anchoring pilot: sample biodiversity survey → on-chain attestation proof-of-concept |
| 5-6 | API integration scaffold: Renew backend → Regen registry data pipeline |
| 7-8 | Attestation framework + BFI validation workflow + key management implementation plan |

**Deliverables:** Registry-ready methodology package, working API integration, attestation proof-of-concept, key management implementation plan

---

## Fallback Strategy

If MCP tools return sparse results during live demo:
- **Credit class mapper (Act 2):** Present the pre-computed golden output from `golden-outputs/act2-credit-class-mapper.md` and explain: "This is what the workflow produces with current registry data."
- **Data anchoring (Act 3):** This act is mostly architecture documentation — not query-dependent. Use golden output from `golden-outputs/act3-data-anchoring.md` if needed. The Ledger mechanics (MsgAnchorData, MsgAttest) are well-documented.
- **Integration blueprint (Act 4):** Documentation-based, not query-dependent. Should be robust regardless. Golden output at `golden-outputs/act4-integration-blueprint.md`.
- **Always show the live queries happening** — even partial results demonstrate real infrastructure.

## Timing Guide

| Act | Target | Hard Max | Cut Plan |
|-----|--------|----------|----------|
| 1 - Deal Dossier | 2 min | 3 min | Skip open items, just show headline |
| 2 - Credit Class Mapper | 3 min | 4 min | Use golden output if agent is slow |
| 3 - Data Anchoring | 3 min | 4 min | Skip BFI verification workflow detail |
| 4 - Integration Path | 2 min | 3 min | Verbal summary + point to sprint proposal |
| Close | 1 min | 1 min | — |
| **Total** | **~11 min** | **15 min** | |
