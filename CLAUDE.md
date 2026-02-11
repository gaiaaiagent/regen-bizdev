# Regen AI Business Development

## What This Is

A configured Claude agent + web dashboard for pitching Regen Network's registry infrastructure to pilot clients. The demo shows live data from the Regen blockchain (78 credit batches, 58 projects, 13 credit classes) and a 69,000-document knowledge graph (open, queryable via KOI MCP), combined into client-specific dashboards that map their ecological assets to Regen's credit class framework. Value proposition: open data + proprietary workflows + registry expertise + planned ecological knowledge commons (opt-in, sovereignty-controlled).

**Live demo:** `https://regen.gaiaai.xyz/bizdev/` (basic auth: `demo` / `regen2026`, deployed on `darren@202.61.196.119`)

**Parent project:** `/Users/darrenzal/projects/RegenAI/`

## Current Status (Feb 10, 2026)

**DEMO-READY.** Web app built, deployed, client docs ingested into KOI, Explorer page hardened with timeout/fallback, all documentation updated. Ready for GreenBiz 26.

### What's Done
- Web dashboard with live KOI + Ledger integration (React/Vite/Tailwind)
- Automated demo walkthroughs (DemoRunner with presenter notes, keyboard controls)
- 6-phase "Outcome-First Reframing" implemented across all materials
- Sprint proposals for both clients (discovery sprint + registry sprint + full journey)
- 8 golden outputs (4 per client) — deal dossier, credit class mapping, governance/data-anchoring, verification/integration
- All claims fact-checked against live ledger (BT01-001 CO-ANT, BT01-002 CO-CUN confirmed)
- 7-issue critique addressed + 5 structural issues from adversarial review fixed
- Client docs ingested into KOI (7 docs → 196 chunks with embeddings + 191 entity links)
- Explorer page resilience (5s slow timer, 15s abort, amber fallback UI with retry)
- Nginx proxy fixed (KOI API accessible via `/api/koi`)
- D3 force-directed Graph Explorer with interactive node expansion
- Pre-demo checklist, README presenter guide, BUILD_PLAN status updated

### Demo Slam Dunk Fixes (Feb 9, 2026)

**Priority 1 — Credibility Armor:**
- Evidence drawers pre-fetch on mount (no spinners during demo)
- Query strings fixed to target actual KOI content (not client names that don't exist in KOI)
- "Prepared Analysis" disclosure banner on both dashboards (dismissible, honest framing)
- Presenter notes updated: "prepared analysis" not "synthesized view", close steps disclose preparation
- `data-demo-target` attributes on all interactive elements for resilient automation

**Priority 2 — "Wow" Moment:**
- MappingTable expanded rows show live Ledger batch evidence (denom, jurisdiction, issuance date, status)
- LiveQueryPanel on Credit Mapping tabs — interactive KOI search for ad-hoc demo moments
- FirstCreditCard on both DealDossiers — concrete "Your First Credit" with specific project details
- DemoRunner uses `data-demo-target` first, falls back to text matching

**Priority 3 — Depth:**
- Cached Ledger responses (`getCachedBatches`, `getCachedProjects`) prevent redundant API calls
- MethodologyComparison component — expandable BT01/C-class requirements vs client methodology side-by-side
- Renew: 8-row BT01 vs Wallacea Trust comparison
- Landbanking: 8-row BT01 vs Landler Index + 6-row carbon comparison

### What's Left (Priority Order)

1. **GreenBiz 26 prep (Feb 17-19, Phoenix)** — Confirm if either client attends. In-person laptop demo >> video call.
2. **Pre-demo rehearsal** — Run full automated demo 2-3 times, verify evidence drawers open instantly
3. **Internal review with Dave/Becca** — Walk through both demos, get feedback on flow and messaging
4. **Strategic messaging alignment** — Team review of knowledge commons framing, openness narrative, "Beyond the Sprint" positioning

### Open Questions
- Should the discovery sprint deliverables be scoped down? Current scope is aggressive for $15-20K / 2 weeks.
- If a client asks "what if we do the registry work ourselves after discovery?" — prepare the answer.
- Carbon on existing C-class: does it truly skip the 24-38 week governance review? Need to confirm with registry team.

## Pilot Clients

### Renew/RePlanet
- UK-based nature data & intelligence company, landscape-scale ecological restoration
- **Wallacea Trust v2.1** — 5-taxa conservation-weighted biodiversity scoring
- **2 credit classes matched:** Carbon (C01-C09, strong) + Biodiversity (BT01, partial)
- **3 partnership opportunities:** BT01 scoring integration, methodology docs, carbon stacking
- Registration Pathway: Building (5/10)
- Sprint proposal: `clients/renew-replanet/sprint-proposal.md`
- Drive folder ID: `1toVpKZaP3DpL31nwA54dTZLlcLxFXXzQ`

### Landbanking Group
- Munich-based natural capital fintech (~$15M raised), "Landler" platform, Ritter Sport partnership
- **Nature Equity Asset** — 5 dimensions (carbon, biodiversity, soil, water, social) with composite score
- **1 class matched:** Carbon (C01-C09, strong). Biodiversity partial (BT01). 3 gaps (soil, water, social).
- Registration Pathway: Foundation (4/10) — carbon ready for immediate registration
- Sprint proposal: `clients/landbanking-group/sprint-proposal.md`
- **Key framing:** "Landler measures. Regen governs and verifies." NOT an AI demo (they have their own AI "Va").
- Drive folder ID: `1lbVENpjChnvpvKfL0wyC4l8CmkIliXUV`

## Key Registry Data (verified Feb 8 against live ledger)

- **78 credit batches** (exact count from paginated ledger query)
- **58 projects** across 13+ countries (CO, CD, KE, PE, US, ID, KH, BR, CN, CG, GB, AU, EC)
- **13 credit classes:** C01-C09 (Carbon), BT01 (BioTerra), KSH01, MBS01, USS01
- **5 credit types:** C (tCO2e), BT (weighted 10m^2), KSH, MBS, USS
- **Vintage dates:** 2012-2024 (most recent batch issued Jan 2026)
- **BT01 biodiversity projects:** BT01-001 (CO-ANT, batch issued 2024-04-03, open), BT01-002 (CO-CUN, batch issued 2025-03-10, closed)

## Web App (`web/`)

- **Stack:** React 19 + Vite + TailwindCSS + Radix UI
- **Build:** `cd web && npm run build` (clean, 555KB JS)
- **Dev:** `cd web && npm run dev`
- **Deploy:** `cd web && npm run build && rsync -avz dist/ darren@202.61.196.119:/opt/projects/regen-bizdev-web/`
- **Routes:** `/` (landing), `/explore` (knowledge graph), `/graph` (D3 force graph), `/renew` (dashboard), `/landbanking` (dashboard)
- **Demo mode:** `?demo=renew` or `?demo=landbanking` URL param, or click buttons on landing page
- **Keyboard:** Space (pause), arrows (navigate), Esc (exit)

### Key Components
| Component | Purpose |
|-----------|---------|
| `RegistryTrackRecord` | Live batch/project/credit-type counters from Ledger LCD API |
| `ReadinessScore` | Circular gauge with "Foundation/Building/Advancing/Registry-Ready" labels |
| `OpportunityCard` | Partnership opportunity with "Regen helps" badge + commercial outcome |
| `VerraComparison` | Balanced comparison table (acknowledges Verra strengths) |
| `JourneyTimeline` | Horizontal stepper: Discovery → Registry → Governance → First Credit |
| `DemoRunner` | Automated walkthrough with `data-demo-target` support, presenter notes, keyboard controls |
| `EvidenceDrawer` | Pre-fetches KOI evidence on mount (instant open during demo) |
| `Explorer` | Interactive knowledge graph with entity resolution visualization |
| `GraphExplorer` | D3 force-directed graph with interactive node expansion, zoom/pan |
| `ForceGraph` | D3 force simulation with typed nodes, drag interaction, click-to-expand |
| `GraphControls` | Filter panel for graph: entity types, importance threshold, layout |
| `GraphTooltip` | Hover tooltip showing entity details and relationship count |
| `PreparedAnalysisBanner` | Honest disclosure: "Analysis prepared Feb 2026..." (dismissible) |
| `LiveQueryPanel` | Interactive KOI search — type any topic, get live results |
| `FirstCreditCard` | Concrete "Your First Credit" with project-specific details |
| `MappingTable` | Credit class mapping with live Ledger batch evidence in expanded rows |
| `MethodologyComparison` | Side-by-side: registry requirements vs client methodology |

### Live Data Sources
| Source | API | What It Fetches |
|--------|-----|-----------------|
| KOI | `https://regen.gaiaai.xyz/api/koi` | Document search, entity resolution, stats |
| Ledger | `https://lcd-regen.keplr.app` | Credit classes, batches, projects, credit types (paginated) |

## MCP Tools

| Server | Key Tools | Status |
|--------|-----------|--------|
| **KOI** (`mcp__plugin_koi_regen-koi__`) | `search`, `resolve_entity`, `get_stats` | Validated, 69K+ docs |
| **Ledger** (`mcp__plugin_ledger_regen-network__`) | `list_classes`, `list_credit_batches`, `list_projects` | Validated, 78 batches, 58 projects |
| **Registry Review** (`registry-review`) | `create_session`, `map_all_requirements`, `extract_evidence` | Configured, needs session validation |

## Directory Structure

```
regen-bizdev/
├── foundation/                    # Shared agent infrastructure
│   ├── system-prompt.md           # Base system prompt
│   ├── platform-overview.md       # Regen platform technical overview
│   ├── knowledge-commons.md       # Team-facing knowledge commons one-pager
│   └── workflows/                 # 5 reusable workflow definitions
├── clients/
│   ├── renew-replanet/
│   │   ├── sprint-proposal.md     # Discovery sprint + registry sprint proposal
│   │   ├── golden-outputs/        # 4 golden outputs (act1-4)
│   │   ├── demo-config.md         # Client overlay for Claude agent
│   │   └── mock-data/             # Sample biodiversity survey JSON
│   └── landbanking-group/
│       ├── sprint-proposal.md     # Discovery sprint + registry sprint proposal
│       ├── golden-outputs/        # 4 golden outputs (act1-4)
│       ├── demo-config.md         # Client overlay for Claude agent
│       └── mock-data/             # Sample nature equity asset JSON
├── demos/
│   ├── renew-demo.md              # 5-act demo script (Act 0-4 + Close)
│   ├── landbanking-demo.md        # 5-act demo script (Act 0-4 + Close)
│   ├── knowledge-graph-demo.md    # Supplementary KOI showcase
│   ├── web-app-demo.md            # Supplementary Registry Review walkthrough
│   └── pre-demo-checklist.md      # Pre-demo verification checklist + fallback strategies
├── web/                           # React SPA dashboard
│   ├── src/
│   │   ├── components/            # RegistryTrackRecord, OpportunityCard, DemoRunner, etc.
│   │   ├── pages/                 # Landing, Explorer, RenewDashboard, LandbankingDashboard
│   │   ├── data/                  # renew.ts, landbanking.ts, demoSteps.ts, types.ts
│   │   ├── hooks/                 # useGraphData (accumulated graph state for multi-hop exploration)
│   │   └── lib/                   # koi.ts (API clients for KOI + Ledger), graph-types.ts
│   └── dist/                      # Built output (deployed via rsync)
├── BUILD_PLAN.md                  # Build plan (all phases complete)
└── CLAUDE.md                      # This file
```

## Commercial Terms

**Revenue split:** 50/50 between Symbiocene Labs and Regen Network (default). Custom splits may be negotiated per client depending on scope and who leads the engagement. Decided Feb 9, 2026.

## Team

- **Darren** — KOI development, demo engineering, web app
- **Shawn** — Registry Review Agent
- **Dave/Becca** — Client curation, user journey
- **Gregory** — Strategy, partnerships

## Milestones

- **Feb 11** — Biz dev front-end MVP (READY)
- **Feb 17-19** — GreenBiz 26 (Phoenix) — potential in-person demos

## Google Drive Access

Service account: `rag-ingestion-bot@koi-sensor.iam.gserviceaccount.com`

## Session History

| Session ID | Date | Scope | Key Work |
|------------|------|-------|----------|
| `5b7587bc` | Feb 7 | regen-bizdev | Golden outputs creation, initial demo scripts |
| `ea32b8e6` | Feb 8 AM | regen-bizdev | Earlier session work |
| `c4e9b3ab` | Feb 8 | RegenAI (parent) | **Main session:** 6-phase outcome-first reframing (web implementation + deployment + all doc updates). Continuation: BT01 ledger verification, 7-issue critique fixes, full repo audit, `/end` skill. |
| `9df37eeb` | Feb 9 | regen-bizdev | **Demo Slam Dunk:** Adversarial review fixes — eager evidence fetch, query string fixes, PreparedAnalysisBanner, LiveQueryPanel, FirstCreditCard, MappingTable batch evidence, MethodologyComparison, data-demo-target, cached Ledger helpers, presenter note updates. |
| `fadfb2eb` | Feb 10 | regen-bizdev | **GreenBiz Readiness:** KOI client doc ingestion (196 chunks + 191 entity links), Explorer timeout/fallback, nginx proxy fix, D3 Graph Explorer, doc polish (BUILD_PLAN, README, pre-demo checklist, sprint proposals, web-app-demo URL fix). |
| *(current)* | Feb 10 | regen-bizdev | **Strategic Reframing:** Knowledge commons, open data philosophy, "Beyond the Sprint" sections. Reframed competitive moat (open data + proprietary workflows), added access model, updated system prompt with 3-tier awareness + openness guidance, created knowledge-commons.md team doc. |

**To load full context from the main implementation session:**
```
Grep pattern="<search term>" path="/Users/darrenzal/.claude/projects/-Users-darrenzal-projects-RegenAI/" glob="c4e9b3ab*.jsonl"
```

## Notion & Obsidian

- **Notion scope doc:** https://www.notion.so/regennetwork/Regen-AI-Business-Development-Sprint-2ef25b77eda18074904af8b49d76e38a
- **Obsidian note:** `Projects/RegenAI Custom Agent BizDev Overview`
