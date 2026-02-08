# Landbanking Group Demo Script

**Duration:** ~11 minutes (hard cap: 15 min)
**Structure:** 4 acts — Deal Dossier → Credit Class Mapping → Governance Review → Verification Plan

**Important framing:** Landbanking has their own AI ("Va") — do NOT position this as an AI demo. Position as infrastructure + institutional governance.

## Setup

Load a Claude project with:
- `foundation/system-prompt.md` (base agent identity)
- `clients/landbanking-group/demo-config.md` (client overlay)
- All client docs from `clients/landbanking-group/` (prospect brief, alignment memos)
- MCP tools: KOI, Ledger

Pre-demo checklist:
- [ ] KOI MCP responding (`get_stats()` returns data)
- [ ] Golden outputs ready as fallback
- [ ] Mock data JSON ready to paste (`cocoa-nature-equity-asset.json`)

---

## Demo Sequence

### Act 1: "We've Analyzed Both Approaches" (2 min)

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

**TRANSITION:** "Now let me show you what registry readiness actually looks like for a Nature Equity Asset..."

---

### Act 2: "Nature Equity Meets Registry Standards" (3 min) — THE MONEY SHOT

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

**PRESENTER NOTES:** Say: "The agent queried our knowledge graph — over 68,000 documents — and mapped your Nature Equity Asset against real registry requirements. Carbon maps directly. Biodiversity partially. The other three are gaps — and that's the partnership opportunity. We help design the credit classes that don't exist yet."

---

### Act 3: "What Governance Review Looks Like" (3 min)

**PROMPT:**
> If Landbanking submitted this Nature Equity Asset methodology for review on Regen's registry, what would the governance process look like? What would reviewers flag? What evidence would be required to pass?

**EXPECTED OUTPUT:** Governance Review simulation with:
- Clear **"Simulated Pre-Review"** disclaimer
- 4-stage review process: Initial submission → Internal review (~3 weeks) → Expert peer review → Public comment
- Review checklist with pass/flag/fail per criterion (scientific basis, additionality, permanence, MRV feasibility, leakage, conservative estimates, stakeholder impact, data quality)
- Specific reviewer flags:
  - "Landler Biodiversity Index is proprietary — needs independent validation"
  - "Multi-dimensional composite has no precedent on Regen"
  - "Medium confidence on 3/5 dimensions needs improvement pathway"
- Required evidence package per criterion
- Estimated timeline: ~24-38 weeks (longer than typical due to multi-dimensional scope)

**WHY IT'S DIFFERENT:** This shows Regen as an institutional process with standards and accountability. This is what Hoffmann and Liechtenstein-tier investors care about. Landbanking's own AI can't simulate a review process it doesn't participate in.

**PRESENTER NOTES:** Say: "This is what institutional governance looks like. Not a rubber stamp — real reviewer flags, real evidence requirements, a realistic timeline. This is the credibility layer that makes Nature Equity Assets investable for institutional capital."

---

### Act 4: "The Verification Plan" (2 min)

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

### Close — "Landler Measures. Regen Governs." (1 min)

> "Everything you just saw — the methodology mapping against real credit classes, the governance review simulation, the verification plan — this is registry infrastructure, not AI synthesis."
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
- **Credit class mapper (Act 2):** Carbon mapping will be strong (C01-C09 have the most data). Use golden output from `golden-outputs/act2-credit-class-mapper.md` if needed. Frame biodiversity gaps as: "BT01 exists but is new — this is exactly the kind of methodology work the partnership would produce."
- **Governance review (Act 3):** The 4-stage review process is well-documented in KOI (registry handbook). Even without live queries, the simulation can be constructed from handbook documentation. Golden output at `golden-outputs/act3-governance-review.md`.
- **Verification plan (Act 4):** Architecture design, not query-dependent. Robust regardless of live query results. Golden output at `golden-outputs/act4-verification-plan.md`.
- **Always show the live queries happening** — even partial results demonstrate real infrastructure.

## Timing Guide

| Act | Target | Hard Max | Cut Plan |
|-----|--------|----------|----------|
| 1 - Deal Dossier | 2 min | 3 min | Skip memo comparison detail, just show recommendation |
| 2 - Credit Class Mapper | 3 min | 4 min | Use golden output if agent is slow |
| 3 - Governance Review | 3 min | 4 min | Skip evidence package detail, focus on reviewer flags |
| 4 - Verification Plan | 2 min | 3 min | Verbal summary + point to sprint proposal |
| Close | 1 min | 1 min | — |
| **Total** | **~11 min** | **15 min** | |
