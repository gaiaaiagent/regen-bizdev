# Regen AI Business Development

## What This Is

A configured Claude agent + web dashboard for pitching Regen Network's registry infrastructure to pilot clients. The demo shows live data from the Regen blockchain (78 credit batches, 58 projects, 13 credit classes) and a 69,000-document knowledge graph, combined into client-specific dashboards that map their ecological assets to Regen's credit class framework.

**Live demo:** `https://regen.gaiaai.xyz/bizdev/` (basic auth: `demo` / `regen2026`, deployed on `darren@202.61.196.119`)

**Parent project:** `/Users/darrenzal/projects/RegenAI/`

## Current Status (Feb 8, 2026)

**DEMO-READY.** Web app built, deployed, and audited. All materials aligned.

### What's Done
- Web dashboard with live KOI + Ledger integration (React/Vite/Tailwind)
- Automated demo walkthroughs (DemoRunner with presenter notes, keyboard controls)
- 6-phase "Outcome-First Reframing" implemented across all materials:
  - "Registration Pathway" (not "Registry Readiness Score"), no red colors
  - "Partnership Opportunities" (not "Gaps & Required Actions"), each with commercial outcome
  - Registry Track Record component (live batch/project/credit-type counts from Ledger)
  - Balanced Verra comparison ("Complementary, Not Competing" / "Why On-Chain Verification Matters")
  - Discovery Sprint entry point ($15-20K, 2 weeks) before the full registry sprint ($40-60K, 8 weeks)
  - Journey Timeline showing full path to first credit issuance
  - "Your First Credit" concrete examples in golden outputs
- Sprint proposals for both clients (discovery sprint + registry sprint + full journey)
- 8 golden outputs (4 per client) — deal dossier, credit class mapping, governance/data-anchoring, verification/integration
- Demo scripts with timing guides, fallback strategies, and presenter notes
- All claims fact-checked against live ledger (BT01-001 CO-ANT, BT01-002 CO-CUN confirmed)
- 7-issue critique addressed: BT01 repetition, "78+" overcounting, discovery/registry scope clarity, pricing math, carbon-first timeline, "Your First Credit" examples
- Full repo audit: all DemoRunner tab/button targets verified, no orphaned files, routes match
- Clean build, no TypeScript errors
- `/end` skill created for session wrap-up workflow

### What's Left (Priority Order)

1. **Pre-demo rehearsal** — Run the full automated demo 2-3 times and time Ledger API response on page load. If Track Record section is slow, consider caching.
2. **Test KOI evidence drawers** — The DemoRunner clicks "View Supporting Evidence" at 1-second delay. If KOI API is slow, drawer shows spinner during the 10-second step window.
3. **Explorer page testing** — Auto-fires client-specific queries. Depends on KOI latency. May need fallback if KOI is down.
4. **GreenBiz 26 prep (Feb 17-19, Phoenix)** — Confirm if either client attends. In-person laptop demo >> video call.
5. **Client-specific golden output polish** — Act 1 (deal dossier) and Act 3/4 golden outputs haven't been reframed with the same level of care as Act 2. Could benefit from a pass.
6. **BUILD_PLAN.md update** — Implementation status section is stale (says "Phase 1 COMPLETE" but we're past Phase 3 now).

### Open Questions
- Should the discovery sprint deliverables be scoped down? Current scope is aggressive for $15-20K / 2 weeks (see critique in session notes).
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
- **Build:** `cd web && npm run build` (clean, 443KB JS)
- **Dev:** `cd web && npm run dev`
- **Deploy:** `cd web && npm run build && rsync -avz dist/ darren@202.61.196.119:/var/www/regen-bizdev/`
- **Routes:** `/` (landing), `/explore` (knowledge graph), `/renew` (dashboard), `/landbanking` (dashboard)
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
| `DemoRunner` | Automated walkthrough with presenter notes, progress bar, keyboard controls |
| `EvidenceDrawer` | Expandable panel that queries KOI for supporting documents |
| `Explorer` | Interactive knowledge graph with entity resolution visualization |

### Live Data Sources
| Source | API | What It Fetches |
|--------|-----|-----------------|
| KOI | `https://api.koi.regen.network` | Document search, entity resolution, stats |
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
│   └── web-app-demo.md            # Supplementary Registry Review walkthrough
├── web/                           # React SPA dashboard
│   ├── src/
│   │   ├── components/            # RegistryTrackRecord, OpportunityCard, DemoRunner, etc.
│   │   ├── pages/                 # Landing, Explorer, RenewDashboard, LandbankingDashboard
│   │   ├── data/                  # renew.ts, landbanking.ts, demoSteps.ts, types.ts
│   │   └── lib/                   # koi.ts (API clients for KOI + Ledger)
│   └── dist/                      # Built output (deployed via rsync)
├── BUILD_PLAN.md                  # Original build plan (needs status update)
└── CLAUDE.md                      # This file
```

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

**To load full context from the main implementation session:**
```
Grep pattern="<search term>" path="/Users/darrenzal/.claude/projects/-Users-darrenzal-projects-RegenAI/" glob="c4e9b3ab*.jsonl"
```

## Notion & Obsidian

- **Notion scope doc:** https://www.notion.so/regennetwork/Regen-AI-Business-Development-Sprint-2ef25b77eda18074904af8b49d76e38a
- **Obsidian note:** `Projects/RegenAI Custom Agent BizDev Overview`
