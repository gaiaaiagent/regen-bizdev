# Landbanking Group Demo Script

**Duration:** 15 minutes (hard cap: 20 min)
**Structure:** 5 acts — Agent → Knowledge Graph → Web App → Registry Mapping → Verification Plan

**Important framing:** Landbanking has their own AI ("Va") — do NOT position this as an AI demo. Position as infrastructure + institutional governance.

## Setup

Load a Claude project with:
- `foundation/system-prompt.md` (base agent identity)
- `clients/landbanking-group/demo-config.md` (client overlay)
- All client docs from `clients/landbanking-group/` (prospect brief, alignment memos)
- MCP tools: KOI, Ledger, Registry Review

Pre-demo checklist:
- [ ] Registry Review web app loaded and authenticated
- [ ] KOI MCP responding (`get_stats()` returns data)
- [ ] Golden outputs ready as fallback

---

## Demo Sequence

### Act 1: "The Agent" (3 min)

**PROMPT:**
> Synthesize everything we know about Landbanking Group. Compare the two alignment memo approaches — $REGEN Token vs Agile Tokenization. Which should we lead with for a first engagement and why? Draft talking points for a first call with Dr. Stuchtey.

**EXPECTED OUTPUT:** Deal Dossier with:
- Partnership assessment (Landler platform, Nature Equity Assets, institutional backing)
- Head-to-head memo comparison:
  - **Agile Tokenization** — Lower commitment, proves value faster, better first move
  - **$REGEN Token** — Deeper integration, better for Phase 2 after trust is established
- Recommendation: Lead with Agile Tokenization approach
- Talking points for Dr. Stuchtey: registry credibility, institutional verification, MRV gap, Hoffmann/Liechtenstein-relevant governance

**PRESENTER NOTES:** Move through this briskly. Say: "The agent analyzed both partnership approaches and recommends leading with Agile Tokenization. Smart strategic analysis, but not the differentiator."

**TRANSITION:** "Now let me show you the infrastructure that makes this more than analysis..."

---

### Act 2: "The Knowledge Graph" (3 min)

_See `demos/knowledge-graph-demo.md` for the full reusable script._

**PROMPT 1:**
> Show me the current state of Regen's knowledge base — how many documents, what sources, and what's been ingested recently.

**PROMPT 2:**
> Search the knowledge base for "natural capital methodology verification multi-dimensional assets" — show me what the system finds and where it comes from.

**PRESENTER NOTES:** Say: "This is the knowledge infrastructure behind every output. Over 68,000 documents — credit methodologies, governance standards, verification requirements. Not a chatbot's training data. A live knowledge graph with entity relationships, updated automatically from 20+ sensors monitoring Regen's ecosystem. For Landbanking, this would include YOUR data sources alongside Regen's."

**TRANSITION:** "And here's the institutional governance tooling that investors want to see..."

---

### Act 3: "The Web App" (4 min)

_See `demos/web-app-demo.md` for the full reusable script._

**ACTION:** Open Registry Review web app. Walk through:
1. Dashboard with session list
2. Session workspace with methodology documents
3. Requirement mapping with coverage metrics (23/23 mapped, 21 high confidence)
4. PDF annotation with evidence extraction

**PRESENTER NOTES:** Say: "This is the kind of institutional tooling that Hoffmann and Liechtenstein-tier investors want to see. Not a chatbot — a governance review platform with traceable evidence and auditable decisions. Va does the measuring. This does the governing. For Landbanking, we'd fork this with your workflows — Nature Equity Asset review criteria instead of credit methodology criteria."

**TRANSITION:** "Now let me show you what happens when we evaluate a Nature Equity Asset against these standards..."

---

### Act 4: "Nature Equity Meets Registry Standards" (3 min) — THE MONEY SHOT

**PROMPT:**
> Here's a Nature Equity Asset from Landbanking's Ritter Sport cocoa partnership [paste cocoa-nature-equity-asset.json]. Translate this into Regen's credit class framework. Map each dimension to existing methodologies, identify eligibility gaps, and generate a registry readiness score.

**EXPECTED OUTPUT:** Credit Class Mapper output with:
- 5 dimensions parsed from Nature Equity Asset
- Mapping table using real credit class IDs from Ledger:
  - **Carbon Sequestration** → C01-C09 (Carbon, metric ton CO2e) — Strong match, multiple existing classes
  - **Biodiversity** → BT01 (BioTerra, weighted 10m^2 score) — Partial match; "Landler Biodiversity Index" is proprietary, needs mapping to BT01's scoring framework
  - **Soil Health** → Gap — No existing Regen credit class for soil organic carbon; relevant methodology discussions in KOI
  - **Water Regulation** → Gap — No existing Regen credit class for hydrological services
  - **Social Impact** → Gap — Outside current Regen credit class scope; could be tracked as co-benefit metadata
- Registry readiness score: Likely 4-5/10 (carbon maps well, biodiversity partial, 3 dimensions are gaps)
- Gap analysis highlighting that multi-dimensional assets are frontier territory — and that's the opportunity
- Precedents from KOI: natural capital tools discussion (forum topic 101), biodiversity credit type proposal (forum topic 49)

**WHY IT'S DIFFERENT:** No generic AI tool can map "Nature Equity" to Regen's specific credit class schema with real eligibility criteria. The gaps are as valuable as the matches — they show exactly where new methodology work is needed.

**PRESENTER NOTES:** Say: "You just saw the knowledge graph and the governance platform. THIS is what they produce when pointed at a Nature Equity Asset. Carbon maps directly. Biodiversity partially. The other three are gaps — and that's the partnership opportunity. We help design the credit classes that don't exist yet."

---

### Act 5: "The Verification Plan" (2 min)

**PROMPT:**
> Draft a verification and MRV plan for this Nature Equity Asset. Who validates each dimension, what data flows from Landler to Regen's registry, and what's the monitoring schedule?

**EXPECTED OUTPUT:** Verification Plan with:
- Verifier types per dimension:
  - Carbon: accredited carbon auditor (annual)
  - Biodiversity: independent ecologist + eDNA lab (annual)
  - Soil: certified soil testing laboratory (biannual)
  - Water: hydrological consultant (biannual)
  - Social: third-party social auditor (annual)
- Data flow: Landler platform → processed metrics → content hash → Regen data module → attestation → credit batch
- Monitoring schedule: Year 1-3 annual cycle with quarterly data checkpoints
- On-chain mechanics: anchoring, attestation, IRI resolution

**PRESENTER NOTES:** Say: "Landler does the measuring. Regen does the governing and verifying. That's the partnership."

---

### Close — "The Platform Vision" (1 min)

> "Everything you just saw — the knowledge graph, the governance platform, the methodology mapping, the verification plan — this is registry infrastructure, not AI synthesis."
>
> "Va does the measuring. Your KOI instance does the knowledge management. Regen's registry does the governance. Three layers, each doing what it's best at."
>
> "Claude Desktop gives you a chatbot. We give you an institutional platform — the same infrastructure Regen built for itself, pointed at your domain."
>
> "We're proposing an 8-week sprint: credit class mapping, methodology pre-review, MRV framework design, and first attestation. You get your own knowledge graph, your own governance tooling, and a direct path from Nature Equity Assets to registry-grade ecological credits."

---

### Follow-Up: 8-Week Sprint Proposal (send same day)

| Week | Deliverable |
|------|-------------|
| 1-2 | Nature Equity Asset → Regen credit class formal mapping (start with carbon + biodiversity dimensions via Ritter Sport cocoa) |
| 3-4 | Methodology pre-review against Regen governance standards (focus on Landler Biodiversity Index validation pathway) |
| 5-6 | MRV framework design: Landler → Regen data flow specification for all 5 dimensions |
| 7-8 | First attestation proof-of-concept + verification plan for cocoa agroforestry pilot |

**Deliverables:** Credit class eligibility report, methodology review readiness package, MRV integration specification, attestation prototype

---

## Fallback Strategy

If MCP tools return sparse results during live demo:
- **Knowledge graph (Act 2):** Pre-cached stats (68K+ docs) work fine. Skip SPARQL if slow (requires auth). Search results are the showpiece. See `demos/cached-outputs/act2-koi-*.md` for fallback data.
- **Web app (Act 3):** Screenshots/screen recording as backup. Test authentication on demo morning.
- **Credit class mapper (Act 4):** Carbon mapping will be strong (C01-C09 have the most data). Use golden output from `golden-outputs/act4-credit-class-mapper.md` if needed. Frame biodiversity gaps as: "BT01 exists but is new — this is exactly the kind of methodology work the partnership would produce."
- **Governance review:** The 4-stage review process is well-documented in KOI (registry handbook). Even without Registry Review MCP, the simulation can be constructed from handbook documentation.
- **Verification plan (Act 5):** Architecture design, not query-dependent. Robust regardless of live query results.
- **Always show the live queries happening** — even partial results demonstrate real infrastructure.

## Timing Guide

| Act | Target | Hard Max | Cut Plan |
|-----|--------|----------|----------|
| 1 - The Agent | 3 min | 4 min | Skip memo comparison detail, just show recommendation |
| 2 - Knowledge Graph | 3 min | 4 min | Skip SPARQL, do stats + search only |
| 3 - Web App | 4 min | 5 min | Skip PDF annotation step |
| 4 - Registry Mapping | 3 min | 4 min | Use golden output if agent is slow |
| 5 - Verification Plan | 2 min | 3 min | Verbal summary + point to sprint proposal |
| **Total** | **15 min** | **20 min** | |
