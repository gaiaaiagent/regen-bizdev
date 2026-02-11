# Landbanking Group Demo Script

**Duration:** ~12 minutes (hard cap: 15 min)
**Structure:** 5 acts — Live Infrastructure + Track Record → Deal Dossier → Credit Class Mapping → Governance Review → Verification Plan
**Web Dashboard:** `https://regen.gaiaai.xyz/bizdev/`

**Important framing:** Landbanking has their own AI ("Va") — do NOT position this as an AI demo. Position as infrastructure + institutional governance.

## Setup

**Web dashboard (open in browser beforehand):**
- `https://regen.gaiaai.xyz/bizdev/` — Landing page (will animate on load)
- Have `/bizdev/explore?client=landbanking` ready in a second tab (or navigate during demo)

**Claude project:**
- `foundation/system-prompt.md` (base agent identity)
- `clients/landbanking-group/demo-config.md` (client overlay)
- All client docs from `clients/landbanking-group/` (prospect brief, alignment memos)
- MCP tools: KOI, Ledger

Pre-demo checklist:
- [ ] Web dashboard loads — counters animate, no console errors
- [ ] **Track Record section** shows live batch/project/credit type counts from Ledger
- [ ] Explorer page loads with Landbanking presets (`/bizdev/explore?client=landbanking`)
- [ ] KOI MCP responding (`get_stats()` returns data)
- [ ] Golden outputs ready as fallback
- [ ] Mock data JSON ready to paste (`cocoa-nature-equity-asset.json`)

---

## Demo Sequence

### Act 0: "Production Track Record" (1.5 min) — THE OPENING

**ACTION:** Open `https://regen.gaiaai.xyz/bizdev/` in browser. Counters animate from zero.

**WHAT HAPPENS:** The landing page fetches live data on load:
- Knowledge Graph stats: 69,000+ documents indexed, data sources
- On-Chain Registry stats: 13 credit classes
- **Production Track Record section:**
  - 78+ credit batches issued (live from Ledger)
  - 58+ registered projects across 10+ countries
  - 5 credit types (Carbon, BioTerra, KSH, MBS, USS)
  - Vintage date range (2012-2024)
  - **Social proof:** BT01 biodiversity projects in Colombia, C02 soil carbon in US, C03 conservation
  - "Production infrastructure with a multi-year track record — not a prototype"

**SAY:** "This registry is live and in production. 78+ credit batches issued across 58 projects in 10+ countries, vintage dates spanning 2012-2024. Including biodiversity credits already active in Colombia. This is the institutional infrastructure behind what we'll show you — not a prototype."

**ACTION:** Click "Explore the Knowledge Graph" or navigate to `/bizdev/explore?client=landbanking`.

The Explorer auto-fires the first Landbanking-specific query ("multi-dimensional ecological asset natural capital credit") after 1 second. Results appear on the left, entity graph materializes on the right.

**SAY:** "We pre-loaded queries relevant to Landbanking's Nature Equity approach. The system is searching 69,000 documents — governance forum discussions, methodology specifications, registry handbook entries. On the right, entity resolution — the graph understands how concepts relate to each other."

**Click an entity node.** Graph re-centers. "Every connection is traceable to indexed documents. This is institutional knowledge infrastructure, not a search engine."

**TRANSITION:** "That's the foundation. Now let me show you what it produces for Landbanking specifically..."

---

### Act 1: "We've Analyzed Both Approaches" (1.5 min)

**ACTION:** Navigate to the Landbanking client dashboard (click "Landbanking Group" in the nav). The Deal Dossier tab is shown by default.

**NOTE NEW DASHBOARD FEATURES:**
- Description now reads: "Landbanking's Nature Equity Assets gain institutional credibility through independent registry governance..."
- "Batches Issued" stat card replaces old "Gaps Identified" (live from Ledger)
- **Discovery Sprint card** (highlighted in green) with $15-20K price and "Schedule Discovery Sprint" CTA
- **Journey Timeline** showing full path: Discovery Sprint → Registry Sprint → Governance Review → First Credit Issuance

**SAY (while dashboard loads):** "We analyzed both alignment memos — $REGEN Token and Agile Tokenization — along with your prospect materials."

**SHOW ON DASHBOARD:**
- Executive summary with partnership assessment
- **Discovery Sprint card** — "The 2-week discovery sprint is the entry point. $15-20K gets you a full credit class mapping per dimension, a pre-review against governance criteria, and a go/no-go recommendation. Low risk, high information."
- Journey Timeline — "Here's the full path from discovery sprint to first credit issuance."

**OPTIONAL — CLICK "View Supporting Evidence" BUTTON** below the Executive Summary.

**TRANSITION:** "The agent recommends leading with Agile Tokenization: lower commitment, proves value faster. Now let me show you what registry readiness actually looks like..."

---

### Act 2: "Nature Equity Meets Registry Standards" (3 min) — THE MONEY SHOT

**ACTION:** Click the "Credit Class Mapping" tab on the dashboard.

**NOTE NEW DASHBOARD FEATURES:**
- Intro text: "Five ecological dimensions mapped to an operational registry with carbon and biodiversity credits in production"
- **"Registration Pathway"** heading (not "Registry Readiness Score")
- Score shows **"Building"** in blue (not "Low" in red)
- Context line: "Carbon dimension ready for immediate registration. 4 additional dimensions require methodology development."
- **"Partnership Opportunities"** section (not "Gaps & Required Actions")
- Each opportunity card has "Regen helps" badge and commercial outcome
- **Verra Comparison** collapsible section ("Why On-Chain Verification Matters for Institutional Investors")

**SHOW ON DASHBOARD:**
- Mapping table with real credit class IDs from Regen Ledger
- Green "On-chain" badges (live Ledger verification)

**SAY:** "Carbon maps directly to C01-C09 and is ready for immediate registration. Biodiversity partially maps to BT01 — and BT01 already has 2 active projects, so this pathway is proven. Soil, water, social — those are gaps, and they're the partnership opportunity. We help design the credit classes that don't exist yet."

**ACTION:** Expand the Verra comparison section.

**SAY:** "For institutional investors who will ask about Verra — this table shows the comparison honestly. Verra is the industry standard for carbon. Regen adds on-chain governance, multi-dimensional credits, and transparent data verification. They serve different needs."

**ACTION:** Scroll to Partnership Opportunities.

**SAY:** "Each opportunity has a specific sprint and a commercial outcome. 'Carbon Registration Sprint: Enables first carbon credit batch issuance.' 'Biodiversity Index Validation: Clears the #1 review risk.' These connect to investor milestones."

---

### Act 3: "What Governance Review Looks Like" (3 min)

**ACTION:** Click the "Governance Review" tab on the dashboard.

**SHOW ON DASHBOARD:**
- 4-stage review process visualization
- Review criteria checklist with pass/flag/fail indicators
- Key reviewer flags
- Required evidence package table
- Estimated timeline (~24-38 weeks)

**ACTION:** Click "View Governance Evidence" below the review criteria checklist.

**SAY:** "This is what institutional governance looks like. Not a rubber stamp — a 4-stage review process with real criteria, real reviewer flags, a realistic timeline. The kind of standards Hoffmann and Liechtenstein-tier investors require."

**HIGHLIGHT KEY REVIEWER FLAGS:**
- "Landler Biodiversity Index is proprietary — needs independent validation"
- "Multi-dimensional composite has no precedent on Regen"
- "Medium confidence on 3/5 dimensions needs improvement pathway"

**SAY:** "These are the flags a reviewer would raise. We surface them now so you can prepare evidence before formal submission."

---

### Act 4: "The Verification Plan" (2 min)

**ACTION:** Click the "Verification Plan" tab on the dashboard.

**SAY:** "Landler does the measuring. Regen does the governing and verifying. Each dimension gets a specialist verifier — carbon auditors, ecologists, soil labs. Data flows from Landler through content hashing to on-chain attestation. That's the partnership."

**PRESENTER NOTES:** Walk through the verifier types per dimension and cost estimates. Key point: institutional-grade verification for $21-56K/year — comparable to traditional auditing.

---

### Close — "Landler Measures. Regen Governs." (1 min)

**ACTION:** Switch back to the web dashboard landing page. Track Record section is visible.

> "Landler measures. Your KOI instance manages the knowledge. Regen's registry governs and verifies. Three layers, each doing what it's best at."
>
> "The track record: 78+ batches, 58 projects, 4-year production history, biodiversity credits already live. This is not something you recreate with a coding tool."
>
> "For Landbanking: carbon registration immediate. A 2-week discovery sprint maps the full pathway — $15-20K, credit class mapping per dimension, governance pre-review, go/no-go recommendation. Then phased registration of each dimension. The discovery sprint is the next step."

**OPTIONAL — If they ask about long-term value or network effects:**

> "Your carbon credit mapping creates governance precedent that, with your consent, can accelerate future natural capital credit classes. Select methodology learnings you choose to share strengthen the registry's governance foundation — and that ecosystem strength comes back to benefit your credits. Nothing is shared without your explicit opt-in. Default is private. And the knowledge graph itself is open — 69,000 documents, no auth required. We believe ecological data should be a commons. The expertise to build institutional workflows on top of it is the product."

---

### Follow-Up: Discovery Sprint Proposal (send same day)

**2-Week Discovery Sprint — $15-20K**

| Deliverable | Description |
|-------------|-------------|
| Full credit class mapping | Live ledger verification of all 5 dimensions against C01-C09, BT01, and gap analysis |
| Pre-review simulation | Registry governance criteria assessment per dimension |
| Pathway document | Timeline and cost estimates per dimension for full registration |
| Go/no-go recommendation | Evidence package outline with clear next steps |

**Then: 8-Week Registry Sprint**

| Week | Deliverable |
|------|-------------|
| 1-2 | Nature Equity Asset → Regen credit class formal mapping (start with carbon + biodiversity) |
| 3-4 | Methodology pre-review against Regen governance standards (Landler Biodiversity Index validation pathway) |
| 5-6 | MRV framework design: Landler → Regen data flow specification for all 5 dimensions |
| 7-8 | First attestation proof-of-concept + verification plan for cocoa agroforestry pilot |

**Deliverables:** Credit class eligibility report, methodology review readiness package, MRV integration specification, attestation prototype

---

## Fallback Strategy

**Web dashboard fallbacks:**
- **Landing page counters don't animate:** KOI or Ledger API may be down. The page shows graceful error states. Move on to Explorer or Claude agent — don't dwell on it.
- **Track Record section shows spinner/error:** Ledger API pagination may be slow. Say: "The track record data loads from the live blockchain — let me show you the pre-computed outputs while it syncs."
- **Explorer returns no results:** KOI API may be slow. Say: "The knowledge graph is warming up — let me show you the pre-computed outputs while it loads." Switch to Claude agent or dashboard tabs.
- **Evidence drawers empty:** KOI query returned no results. Say: "These evidence panels pull live from the knowledge graph. In production, they surface the specific documents that inform each analysis section."
- **On-chain badges not showing:** Ledger API may be slow. The mapping table still renders — badges are additive.

**Claude agent fallbacks:**
- **Credit class mapper (Act 2):** Carbon mapping will be strong (C01-C09 have the most data). Use golden output from `golden-outputs/act2-credit-class-mapper.md` if needed. Frame biodiversity gaps as: "BT01 exists but is new — this is exactly the kind of methodology work the partnership would produce."
- **Governance review (Act 3):** The 4-stage review process is well-documented in KOI (registry handbook). Even without live queries, the simulation can be constructed from handbook documentation. Golden output at `golden-outputs/act3-governance-review.md`.
- **Verification plan (Act 4):** Architecture design, not query-dependent. Robust regardless of live query results. Golden output at `golden-outputs/act4-verification-plan.md`.
- **Always show the live queries happening** — even partial results demonstrate real infrastructure.

## Timing Guide

| Act | Target | Hard Max | Cut Plan |
|-----|--------|----------|----------|
| 0 - Live Infrastructure + Track Record | 1.5 min | 2 min | Skip Explorer entity clicks, just show track record + auto-fired results |
| 1 - Deal Dossier + Discovery Sprint | 1.5 min | 2 min | Show discovery sprint card, skip evidence drawer + memo comparison |
| 2 - Credit Class Mapper + Verra | 3 min | 4 min | Skip Verra comparison, focus on mapping + opportunities |
| 3 - Governance Review | 3 min | 4 min | Skip Claude prompt, use dashboard + evidence drawer only |
| 4 - Verification Plan | 2 min | 3 min | Verbal summary + point to discovery sprint |
| Close | 1 min | 1 min | — |
| **Total** | **~12 min** | **15 min** | |
