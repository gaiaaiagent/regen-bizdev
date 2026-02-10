# Regen AI — Business Development Platform

A web dashboard + Claude agent toolkit for pitching Regen Network's registry infrastructure to pilot clients. Combines live blockchain data, a 69K-document knowledge graph, and client-specific analysis into interactive demos.

**Live demo:** https://regen.gaiaai.xyz/bizdev/ (credentials: `demo` / `regen2026`)

## What You're Looking At

This repo powers the "Registry Readiness" demo experience — an interactive web app that shows prospective clients exactly how their ecological assets map to Regen's credit class framework, backed by real on-chain data and KOI knowledge graph search.

Each client gets:
- A **credit class mapping** showing which of Regen's 13 credit classes fit their assets
- A **Registration Pathway score** with concrete next steps
- **Partnership opportunities** with commercial outcomes
- **Live evidence** from the knowledge graph (forum discussions, governance docs, methodology specs)
- A **sprint proposal** for the engagement

## Quick Start

```bash
# Run the web dashboard locally
cd web
npm install
npm run dev
# → http://localhost:5173/

# Build for production
npm run build

# Deploy to production
npm run build && rsync -avz dist/ darren@202.61.196.119:/opt/projects/regen-bizdev-web/
```

## Live Demo URLs

| Page | URL | Description |
|------|-----|-------------|
| Landing | [/bizdev/](https://regen.gaiaai.xyz/bizdev/) | Live infrastructure stats, client selector, demo launcher |
| Renew Dashboard | [/bizdev/renew](https://regen.gaiaai.xyz/bizdev/renew) | Renew/RePlanet credit class mapping + demo walkthrough |
| Landbanking Dashboard | [/bizdev/landbanking](https://regen.gaiaai.xyz/bizdev/landbanking) | Landbanking Group credit class mapping + demo walkthrough |
| Knowledge Explorer | [/bizdev/explore](https://regen.gaiaai.xyz/bizdev/explore) | Search KOI, resolve entities, explore knowledge graph |
| Graph Explorer | [/bizdev/graph](https://regen.gaiaai.xyz/bizdev/graph) | D3 force-directed interactive knowledge graph |

**Automated demos:** Click "Watch Renew Demo" or "Watch Landbanking Demo" on the landing page for a guided walkthrough with presenter notes. Controls: Space (pause), arrows (navigate), Esc (exit).

## Running the Demo (Step-by-Step for Presenters)

### Option A: Live (Recommended — No Setup)
1. Open https://regen.gaiaai.xyz/bizdev/ (auth: `demo` / `regen2026`)
2. Click **"Watch Renew Demo"** or **"Watch Landbanking Demo"** on the landing page
3. The automated walkthrough runs through 4 acts with presenter notes at the bottom
4. **Controls:** Space = pause/resume, → = next step, ← = previous, Esc = exit
5. Duration: ~12 minutes per client (hard cap 15 min)

### Option B: Local Development
1. `cd web && npm install && npm run dev`
2. Open http://localhost:5173/bizdev/
3. Same controls as live

### Key Pages
| Page | URL | Purpose |
|------|-----|---------|
| Landing | `/bizdev/` | Demo launcher with registry track record |
| Renew Dashboard | `/bizdev/renew` | Client-specific analysis |
| Landbanking Dashboard | `/bizdev/landbanking` | Client-specific analysis |
| Knowledge Explorer | `/bizdev/explore` | Interactive entity graph |
| Graph Explorer | `/bizdev/graph` | D3 force-directed knowledge graph |

### If Something Goes Wrong
- **KOI slow (>5s):** Explorer shows "Knowledge graph is loading" message, then fallback after 15s
- **KOI down:** Explorer shows amber "temporarily unavailable" banner with retry button
- **Ledger slow:** Track record counters on landing page may delay — move to client dashboard
- Golden outputs are in `clients/*/golden-outputs/` — paste into conversation if APIs fail

## Repo Structure

```
regen-bizdev/
│
├── web/                           # React SPA (Vite + Tailwind + Radix UI)
│   ├── src/
│   │   ├── pages/                 # Landing, Explorer, GraphExplorer, Renew, Landbanking
│   │   ├── components/            # 35+ components (see Component Index below)
│   │   ├── data/                  # Client data, demo step definitions, shared types
│   │   ├── hooks/                 # useGraphData (accumulated graph state)
│   │   └── lib/                   # API clients for KOI + Ledger, graph types
│   ├── package.json
│   └── vite.config.ts
│
├── clients/                       # Client-specific materials
│   ├── renew-replanet/
│   │   ├── sprint-proposal.md     # Discovery + registry sprint proposal
│   │   ├── golden-outputs/        # 4 pre-generated demo outputs (acts 1-4)
│   │   ├── demo-config.md         # Claude agent client overlay
│   │   └── mock-data/             # Sample biodiversity survey JSON
│   └── landbanking-group/
│       ├── sprint-proposal.md
│       ├── golden-outputs/        # 4 pre-generated demo outputs (acts 1-4)
│       ├── demo-config.md
│       └── mock-data/             # Sample nature equity asset JSON
│
├── demos/                         # Demo scripts with timing + presenter notes
│   ├── renew-demo.md              # 5-act Renew demo script
│   ├── landbanking-demo.md        # 5-act Landbanking demo script
│   ├── knowledge-graph-demo.md    # Supplementary KOI showcase
│   ├── web-app-demo.md            # Web dashboard walkthrough guide
│   └── pre-demo-checklist.md      # Pre-demo verification + fallback strategies
│
├── foundation/                    # Shared agent infrastructure
│   ├── system-prompt.md           # Base system prompt for Claude agent
│   ├── platform-overview.md       # Regen platform technical overview
│   └── workflows/                 # 5 reusable workflow definitions
│       ├── deal-dossier.md
│       ├── credit-class-mapper.md
│       ├── governance-review.md
│       ├── integration-blueprint.md
│       └── verification-plan.md
│
├── BUILD_PLAN.md                  # Build plan (all phases complete)
└── CLAUDE.md                      # Agent instructions + project context
```

## Key Documents Index

### Demo Scripts (start here for understanding the pitch)
| Document | What It Covers |
|----------|----------------|
| [`demos/renew-demo.md`](demos/renew-demo.md) | Full 5-act demo: live data → credit mapping → evidence → partnership opportunities → sprint proposal |
| [`demos/landbanking-demo.md`](demos/landbanking-demo.md) | Same structure, tailored for Landbanking Group's Nature Equity Asset |
| [`demos/web-app-demo.md`](demos/web-app-demo.md) | Web dashboard walkthrough with fallback strategies |
| [`demos/knowledge-graph-demo.md`](demos/knowledge-graph-demo.md) | KOI knowledge graph deep-dive |

### Client Materials
| Document | Client | Content |
|----------|--------|---------|
| [`clients/renew-replanet/sprint-proposal.md`](clients/renew-replanet/sprint-proposal.md) | Renew/RePlanet | Discovery sprint ($15-20K) + registry sprint ($40-60K) proposal |
| [`clients/landbanking-group/sprint-proposal.md`](clients/landbanking-group/sprint-proposal.md) | Landbanking Group | Same structure, carbon-first pathway |
| [`clients/renew-replanet/golden-outputs/`](clients/renew-replanet/golden-outputs/) | Renew/RePlanet | 4 acts: deal dossier, credit class mapping, data anchoring, integration blueprint |
| [`clients/landbanking-group/golden-outputs/`](clients/landbanking-group/golden-outputs/) | Landbanking Group | 4 acts: deal dossier, credit class mapping, governance review, verification plan |

### Agent Foundation
| Document | Purpose |
|----------|---------|
| [`foundation/system-prompt.md`](foundation/system-prompt.md) | Base system prompt — registry expertise + KOI/Ledger tool usage |
| [`foundation/platform-overview.md`](foundation/platform-overview.md) | Regen Network platform technical overview |
| [`foundation/workflows/`](foundation/workflows/) | 5 reusable analysis workflows (deal dossier, credit class mapper, etc.) |

## Web App Architecture

**Stack:** React 19 + Vite + TailwindCSS + Radix UI

### Live Data Sources
| Source | API | What It Provides |
|--------|-----|-----------------|
| KOI Knowledge Graph | `https://regen.gaiaai.xyz/api/koi/` | Document search (69K+ docs), entity resolution, graph context |
| Regen Ledger | `https://lcd-regen.keplr.app` | Credit classes, batches, projects, credit types (live on-chain) |

### Component Index
| Component | Purpose |
|-----------|---------|
| `RegistryTrackRecord` | Live counters from Ledger: 78 batches, 58 projects, 5 credit types |
| `ReadinessScore` | Circular gauge: Foundation → Building → Advancing → Registry-Ready |
| `MappingTable` | Credit class fit matrix (strong/partial/gap per asset dimension) |
| `OpportunityCard` | Partnership opportunity with commercial outcome |
| `EvidenceDrawer` | Expandable panel querying KOI for supporting documents |
| `VerraComparison` | Balanced Regen vs Verra comparison ("Complementary, Not Competing") |
| `JourneyTimeline` | Horizontal stepper: Discovery → Registry → Governance → First Credit |
| `DemoRunner` | Automated walkthrough engine with presenter notes + keyboard controls |
| `Explorer` | Interactive knowledge graph search with entity resolution |
| `GraphExplorer` | D3 force-directed graph with multi-hop node expansion |
| `ForceGraph` | D3 force simulation with typed nodes and drag interaction |
| `InfrastructurePulse` | Landing page live stats (KOI doc count, Ledger class count) |
| `PreparedAnalysisBanner` | Honest disclosure banner (dismissible) |
| `LiveQueryPanel` | Interactive KOI search for ad-hoc queries |
| `FirstCreditCard` | Concrete "Your First Credit" with project details |
| `MethodologyComparison` | Side-by-side registry requirements vs client methodology |
| `SprintProposal` | Inline sprint proposal with pricing and timeline |

## Pilot Clients

### Renew/RePlanet
- UK-based nature data & intelligence, landscape-scale ecological restoration
- **Wallacea Trust v2.1** — 5-taxa conservation-weighted biodiversity scoring
- **2 credit classes matched:** Carbon (C01-C09) + Biodiversity (BT01)
- Registration Pathway: Building (5/10)

### Landbanking Group
- Munich-based natural capital fintech (~$15M raised), "Landler" platform
- **Nature Equity Asset** — 5 dimensions (carbon, biodiversity, soil, water, social)
- **1 class matched:** Carbon (C01-C09). Biodiversity partial (BT01). 3 gaps.
- Registration Pathway: Foundation (4/10) — carbon ready for immediate registration
- **Key framing:** "Landler measures. Regen governs and verifies."

## Registry Data (verified against live ledger)

- **78 credit batches** across 58 projects in 13+ countries
- **13 credit classes:** C01-C09 (Carbon), BT01 (BioTerra), KSH01, MBS01, USS01
- **5 credit types:** C (tCO2e), BT (weighted 10m^2), KSH, MBS, USS
- **BT01 biodiversity:** BT01-001 (CO-ANT, open), BT01-002 (CO-CUN, closed)

## Related Repos

| Repo | Description |
|------|-------------|
| [koi-processor](https://github.com/gaiaaiagent/koi-processor) | Knowledge graph processing, hybrid RAG, embeddings |
| [regen-koi-mcp](https://github.com/gaiaaiagent/regen-koi-mcp) | MCP server for KOI knowledge access |
| [regen-python-mcp](https://github.com/gaiaaiagent/regen-python-mcp) | Python MCP tools for Regen Ledger |

## Team

- **Darren** — KOI development, demo engineering, web app
- **Shawn** — Registry Review Agent
- **Dave/Becca** — Client curation, user journey
- **Gregory** — Strategy, partnerships
