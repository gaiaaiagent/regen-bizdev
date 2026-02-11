# Renew/RePlanet Demo Script

**Duration:** ~12 minutes (hard cap: 15 min)
**Structure:** 5 acts — Live Infrastructure + Track Record → Deal Dossier → Credit Class Mapping → Data Anchoring → Integration Blueprint
**Web Dashboard:** `https://regen.gaiaai.xyz/bizdev/`

## Setup

**Web dashboard (open in browser beforehand):**
- `https://regen.gaiaai.xyz/bizdev/` — Landing page (will animate on load)
- Have `/bizdev/explore?client=renew` ready in a second tab (or navigate during demo)

**Claude project:**
- `foundation/system-prompt.md` (base agent identity)
- `clients/renew-replanet/demo-config.md` (client overlay)
- All client docs from `clients/renew-replanet/` (prospect brief, call transcripts, PDFs)
- MCP tools: KOI, Ledger

Pre-demo checklist:
- [ ] Web dashboard loads — counters animate, no console errors
- [ ] **Track Record section** shows live batch/project/credit type counts from Ledger
- [ ] Explorer page loads with Renew presets (`/bizdev/explore?client=renew`)
- [ ] KOI MCP responding (`get_stats()` returns data)
- [ ] Golden outputs ready as fallback
- [ ] Mock data JSON ready to paste (`uk-restoration-biodiversity-survey.json`)

---

## Demo Sequence

### Act 0: "Production Track Record" (1.5 min) — THE OPENING

**ACTION:** Open `https://regen.gaiaai.xyz/bizdev/` in browser. Counters animate from zero.

**WHAT HAPPENS:** The landing page fetches live data on load:
- Knowledge Graph stats: 69,000+ documents indexed, data sources
- On-Chain Registry stats: 13 credit classes
- **NEW — Production Track Record section:**
  - 78+ credit batches issued (live from Ledger)
  - 58+ registered projects across 10+ countries
  - 5 credit types (Carbon, BioTerra, KSH, MBS, USS)
  - Vintage date range (2012-2024)
  - **Social proof:** BT01 biodiversity projects in Colombia, C02 soil carbon in US, C03 conservation
  - "Production infrastructure with a multi-year track record — not a prototype"

**SAY:** "Before the analysis — this registry is live and in production. 78+ credit batches issued across 58 projects in 10+ countries, with vintage dates going back to 2012. And critically — there are already 2 active biodiversity projects on BT01. Biodiversity credits on Regen aren't theoretical. That's the production track record."

**ACTION:** Click "Explore the Knowledge Graph" or navigate to `/bizdev/explore?client=renew`.

The Explorer auto-fires the first Renew-specific query ("biodiversity credit methodology BT01 five-taxa") after 1 second. Results appear on the left, entity graph materializes on the right.

**SAY:** "Watch — the system is searching 69,000 documents for biodiversity credit methodology. These results are live. And on the right, entity resolution — the knowledge graph understands relationships, not just keywords."

**Click an entity node** in the graph. It re-centers with new neighbors. "Every connection is backed by indexed documents. Forum posts, methodology specs, governance decisions, GitHub architecture docs."

**POWER MOVE:** Type something unscripted in the search bar. "Let me try something we didn't prepare." Results appear. "This works for any question about ecological credit markets."

**TRANSITION:** "That's the infrastructure — production track record plus institutional knowledge. Now let me show you what it produces for Renew specifically..."

---

### Act 1: "We've Done Our Homework" (1.5 min)

**ACTION:** Navigate to the Renew client dashboard (click "Renew/RePlanet" in the nav). The Deal Dossier tab is shown by default.

**NOTE NEW DASHBOARD FEATURES:**
- Description leads with outcomes: "Renew's five-taxa biodiversity data maps to a production registry with carbon and biodiversity credits already live..."
- "Batches Issued" stat card replaces old "Gaps Identified" (live from Ledger)
- **Discovery Sprint card** (highlighted in green) with $15-20K price and "Schedule Discovery Sprint" CTA
- **Journey Timeline** showing full path: Discovery Sprint → Registry Sprint → Governance Review → First Credit Issuance

**SAY (while dashboard loads):** "We loaded your call transcripts and prospect brief into the system. Here's the synthesized view."

**SHOW ON DASHBOARD:**
- Relationship timeline table
- Client needs assessment
- **Discovery Sprint card** — "Notice the 2-week discovery sprint. $15-20K gets you a full credit class mapping with live ledger verification, a pre-review simulation, and a go/no-go recommendation. This dashboard is the preview — the discovery sprint makes it actionable."
- Journey Timeline — "And here's the full path to first credit issuance."

**OPTIONAL — CLICK "View Supporting Evidence" BUTTON** below the Executive Summary.

**TRANSITION:** "Smart preparation, clear next step. Now the differentiator..."

---

### Act 2: "Your Methodology Meets Our Registry" (3 min) — THE MONEY SHOT

**ACTION:** Click the "Credit Class Mapping" tab on the dashboard.

**NOTE NEW DASHBOARD FEATURES:**
- Intro text leads with outcomes: "mapped to an operational registry with carbon and biodiversity credits in production"
- **"Registration Pathway"** heading (not "Registry Readiness Score")
- Score shows **"Building"** in amber (not "Moderate" in red/amber)
- Context line: "2 credit classes matched. 3 gaps identified with clear 8-week resolution pathway."
- **"Partnership Opportunities"** section (not "Gaps & Required Actions")
- Each opportunity card has "Regen helps" badge and commercial outcome
- **Verra Comparison** collapsible section ("Complementary, Not Competing")

**SHOW ON DASHBOARD:**
- Mapping table with real credit class IDs from Regen Ledger
- Green "On-chain" badges next to each verified credit class ID (live Ledger verification)

**SAY:** "Carbon stacking is ready to register now. And as you saw, BT01 already has live projects — so this biodiversity pathway is proven, not theoretical."

**ACTION:** Expand the "Complementary, Not Competing" Verra comparison.

**SAY:** "And here's how Regen compares to Verra — they're complementary, not competing. Renew already has Verra carbon credits. Regen adds biodiversity credits and on-chain data verification. They work together."

**ACTION:** Click "View Source Evidence" below the mapping table.

**SAY:** "These are the actual documents from our knowledge graph that support this mapping. 69,000 documents of curated institutional knowledge."

**THEN — Scroll to Partnership Opportunities.**

**SAY:** "Notice these aren't 'gaps' — they're partnership opportunities, each with a specific sprint and commercial outcome. 'BT01 Scoring Integration Sprint: Enables first biodiversity credit batch issuance.' Every sprint connects to revenue."

---

### Act 3: "Here's What Your Data Looks Like On-Chain" (3 min)

**ACTION:** Click the "Data Anchoring" tab on the dashboard.

**SAY:** "This is the trust infrastructure. The chain stores proof, not payload. Survey data gets hashed, anchored on-chain with a timestamp, then multiple parties attest — Renew as data collector, BFI as independent verifier. Composable verification."

**PRESENTER NOTES:** Walk through the 6-step flow on the dashboard. Key emphasis: "No trust required in any single party — the chain is the source of truth."

---

### Act 4: "The Integration Path" (2 min)

**ACTION:** Click the "Integration" tab on the dashboard.

**SAY:** "Here's the pathway: a 2-week discovery sprint maps the full credit class alignment and produces a go/no-go recommendation. Then an 8-week registry sprint for BT01 alignment, data anchoring, and integration. Carbon stacking is ready now — biodiversity follows the pathway."

**PRESENTER NOTES:** Point back to the Deal Dossier tab's Discovery Sprint card if needed. The journey from discovery to first credit issuance is now visible.

---

### Close — "Production Track Record, Not Just AI Synthesis" (1 min)

**ACTION:** Switch back to the web dashboard landing page. Track Record section is visible.

> "Everything you just saw — the live knowledge graph, the methodology mapping against real credit classes, the data anchoring walkthrough, the integration architecture — these are outputs of production registry infrastructure, not just AI synthesis."
>
> "78+ credit batches issued. 58 projects across 10 countries. 4-year production track record. Biodiversity credits already live. Plus 69,000 indexed documents, entity resolution, and on-chain verification. That's the moat."
>
> "For Renew: carbon stacking ready now, biodiversity registration on an 8-week pathway. Starting with a 2-week discovery sprint — $15-20K, full credit class mapping, go/no-go recommendation. That's the next step."

**OPTIONAL — If they ask about long-term value beyond the sprint:**

> "With your consent, your methodology learnings can become part of a growing ecological knowledge commons. Other organizations building on BT01 benefit from the precedent you establish — and you benefit from theirs. It's a network, not just a consulting engagement. Nothing is shared without your explicit opt-in — you choose what, if anything, to contribute. And by the way, the knowledge graph itself is open. 69,000 documents, queryable by anyone, no auth. We believe ecological data should be a commons. What we provide is the expertise to build on top of it."

---

### Follow-Up: Discovery Sprint Proposal (send same day)

**2-Week Discovery Sprint — $15-20K**

| Deliverable | Description |
|-------------|-------------|
| Full credit class mapping | Live ledger verification of all 5 taxa against BT01, USS01, C01-C09 |
| Pre-review simulation | Registry criteria assessment with specific evidence requirements |
| Pathway document | Timeline and cost estimates for full registration |
| Go/no-go recommendation | Evidence package outline with clear next steps |

**Then: 8-Week Registry Sprint**

| Week | Deliverable |
|------|-------------|
| 1-2 | Wallacea Trust methodology → BT01 formal mapping (scoring integration) |
| 3-4 | Data anchoring pilot: sample biodiversity survey → on-chain attestation proof-of-concept |
| 5-6 | API integration scaffold: Renew backend → Regen registry data pipeline |
| 7-8 | Attestation framework + BFI validation workflow + key management implementation plan |

**Deliverables:** Registry-ready methodology package, working API integration, attestation proof-of-concept, key management implementation plan

---

## Fallback Strategy

**Web dashboard fallbacks:**
- **Landing page counters don't animate:** KOI or Ledger API may be down. The page shows graceful error states. Move on to Explorer or Claude agent — don't dwell on it.
- **Track Record section shows spinner/error:** Ledger API pagination may be slow. Say: "The track record data loads from the live blockchain — let me show you the pre-computed outputs while it syncs."
- **Explorer returns no results:** KOI API may be slow. Say: "The knowledge graph is warming up — let me show you the pre-computed outputs while it loads." Switch to Claude agent or dashboard tabs.
- **Evidence drawers empty:** KOI query returned no results. Say: "These evidence panels pull live from the knowledge graph. In production, they surface the specific documents that inform each analysis section."

**Claude agent fallbacks:**
- **Credit class mapper (Act 2):** Present the pre-computed golden output from `golden-outputs/act2-credit-class-mapper.md` and explain: "This is what the workflow produces with current registry data."
- **Data anchoring (Act 3):** This act is mostly architecture documentation — not query-dependent. Use golden output from `golden-outputs/act3-data-anchoring.md` if needed.
- **Integration blueprint (Act 4):** Documentation-based, not query-dependent. Should be robust regardless. Golden output at `golden-outputs/act4-integration-blueprint.md`.
- **Always show the live queries happening** — even partial results demonstrate real infrastructure.

## Timing Guide

| Act | Target | Hard Max | Cut Plan |
|-----|--------|----------|----------|
| 0 - Live Infrastructure + Track Record | 1.5 min | 2 min | Skip Explorer entity clicks, just show track record + auto-fired results |
| 1 - Deal Dossier + Discovery Sprint | 1.5 min | 2 min | Show discovery sprint card, skip evidence drawer |
| 2 - Credit Class Mapper + Verra | 3 min | 4 min | Skip Verra comparison, focus on mapping + opportunities |
| 3 - Data Anchoring | 3 min | 4 min | Skip BFI verification workflow detail |
| 4 - Integration Path | 2 min | 3 min | Verbal summary + point to discovery sprint |
| Close | 1 min | 1 min | — |
| **Total** | **~12 min** | **15 min** | |
