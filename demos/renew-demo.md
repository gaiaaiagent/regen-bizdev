# Renew/RePlanet Demo Script

**Duration:** 15 minutes (hard cap: 20 min)
**Structure:** 5 acts — Agent → Knowledge Graph → Web App → Registry Mapping → Integration

## Setup

Load a Claude project with:
- `foundation/system-prompt.md` (base agent identity)
- `clients/renew-replanet/demo-config.md` (client overlay)
- All client docs from `clients/renew-replanet/` (prospect brief, call transcripts, PDFs)
- MCP tools: KOI, Ledger, Registry Review

Pre-demo checklist:
- [ ] Registry Review web app loaded and authenticated
- [ ] KOI MCP responding (`get_stats()` returns data)
- [ ] Golden outputs ready as fallback

---

## Demo Sequence

### Act 1: "The Agent" (3 min)

**PROMPT:**
> Synthesize everything we know about Renew from both calls and the prospect brief. What are their top priorities, what's still unresolved, and draft a proposal outline for a registry integration pilot.

**EXPECTED OUTPUT:** Deal Dossier with:
- Relationship timeline (Mar 2025 rePLANET call, Jan 2026 Renew call)
- Needs assessment (backend infrastructure, key management, developer support, biodiversity credit stacking)
- Open items (Mark Moore's technical concerns, BFI validation workflow, Verra stacking specifics)
- Draft proposal outline for registry integration pilot

**PRESENTER NOTES:** Move through this quickly. Say: "We loaded the call transcripts and prospect brief. The agent synthesized a complete relationship assessment. Impressive but table stakes for a good AI tool."

**TRANSITION:** "Now let me show you what's actually different — the infrastructure behind the agent..."

---

### Act 2: "The Knowledge Graph" (3 min)

_See `demos/knowledge-graph-demo.md` for the full reusable script._

**PROMPT 1:**
> Show me the current state of Regen's knowledge base — how many documents, what sources, and what's been ingested recently.

**PROMPT 2:**
> Search the knowledge base for "biodiversity credit methodology verification requirements" — show me what the system finds and where it comes from.

**PRESENTER NOTES:** Say: "This is what powers the agent. Over 68,000 documents in a knowledge graph — credit methodologies, governance standards, technical specs. Not a static dataset. New content flows in automatically from 20+ sources. When Renew becomes a partner, you'd get your own instance with sensors pointed at YOUR data sources."

**TRANSITION:** "And here's the web application your team would use directly..."

---

### Act 3: "The Web App" (4 min)

_See `demos/web-app-demo.md` for the full reusable script._

**ACTION:** Open Registry Review web app. Walk through:
1. Dashboard with session list
2. Session workspace with methodology documents
3. Requirement mapping with coverage metrics (23/23 mapped, 21 high confidence)
4. PDF annotation with evidence extraction

**PRESENTER NOTES:** Say: "This is our Registry Review application — React 19 frontend, FastAPI backend. Same tooling our team uses. Mark asked about developer support and API integration — this is what that looks like. A production web app backed by a 24-tool API. For Renew, we'd fork this with your workflows and branding."

**TRANSITION:** "Now let me show you what happens when we point all of this at your specific methodology..."

---

### Act 4: "Your Methodology Meets Our Registry" (3 min) — THE MONEY SHOT

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

**WHY IT'S DIFFERENT:** This output queries Regen's actual credit class registry (13 classes, 5 types) and searches 48K+ documents for methodology precedents. No generic AI tool has access to this data.

**PRESENTER NOTES:** Point to the credit class IDs. Say: "These aren't made up — BT01 is a real credit class on Regen Ledger for biodiversity. You just saw the knowledge graph and the web app. THIS is what they produce when pointed at your methodology."

---

### Act 5: "The Integration Path" (2 min)

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

### Close — "The Platform Vision" (1 min)

> "Everything you just saw — the knowledge graph with 68,000+ documents, the governance web app, the methodology mapping, the integration blueprint — these are outputs of our registry infrastructure, not just AI synthesis."
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
- **Knowledge graph (Act 2):** Pre-cached stats (68K+ docs) work fine. Skip SPARQL if slow (requires auth). Search results are the showpiece. See `demos/cached-outputs/act2-koi-*.md` for fallback data.
- **Web app (Act 3):** Screenshots/screen recording as backup. Test authentication on demo morning.
- **Credit class mapper (Act 4):** Present the pre-computed golden output from `golden-outputs/act4-credit-class-mapper.md` and explain: "This is what the workflow produces with current registry data."
- **Integration blueprint (Act 5):** Documentation-based, not query-dependent. Should be robust regardless.
- **Always show the live queries happening** — even partial results demonstrate real infrastructure.

## Timing Guide

| Act | Target | Hard Max | Cut Plan |
|-----|--------|----------|----------|
| 1 - The Agent | 3 min | 4 min | Skip open items, just show Deal Dossier headline |
| 2 - Knowledge Graph | 3 min | 4 min | Skip SPARQL, do stats + search only |
| 3 - Web App | 4 min | 5 min | Skip PDF annotation step |
| 4 - Registry Mapping | 3 min | 4 min | Use golden output if agent is slow |
| 5 - Integration Path | 2 min | 3 min | Verbal summary + point to sprint proposal |
| **Total** | **15 min** | **20 min** | |
