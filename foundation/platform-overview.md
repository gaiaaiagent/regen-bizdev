# Regen AI Platform Overview

_Purpose-built knowledge infrastructure for ecological credit markets_

---

## What We're Selling

We're not selling an AI agent. We're selling **institutional-grade knowledge infrastructure** for ecological credit markets, with AI agents as the delivery mechanism.

A client with Claude Desktop can chat about their documents. A client with our infrastructure can **run institutional workflows** against a curated knowledge base of regenerative ecology, query real on-chain registry data, simulate governance reviews, and present results through custom web interfaces.

---

## Current Status (Feb 10, 2026)

**Demo-ready.** Web app deployed, client docs ingested, all materials aligned for GreenBiz 26.

**Live demo:** https://regen.gaiaai.xyz/bizdev/ (auth: `demo` / `regen2026`)

### What's Built
- Interactive web dashboard with live Regen Ledger + KOI knowledge graph integration
- Automated demo walkthroughs for both pilot clients (keyboard-controlled, presenter notes)
- 8 golden outputs (4 per client): deal dossier, credit class mapping, governance/data-anchoring, verification/integration
- Client-specific sprint proposals with discovery sprint ($15-20K) entry point
- D3 force-directed Graph Explorer for interactive knowledge graph navigation
- 7 client docs ingested into KOI (196 chunks, 191 entity links)

### Pilot Clients

| Client | Fit | Entry Point | Key Framing |
|--------|-----|-------------|-------------|
| **Renew/RePlanet** (UK) | 2 credit classes matched (Carbon C01-C09, Biodiversity BT01) | Discovery sprint: $15-20K | Wallacea Trust 5-taxa methodology → BT01 scoring integration |
| **Landbanking Group** (Munich) | Carbon ready now, BT01 partial, 3 gaps (soil, water, social) | Discovery sprint: $15-20K | "Landler measures. Regen governs and verifies." NOT an AI demo. |

### Team
- **Darren** — KOI development, demo engineering, web app
- **Shawn** — Registry Review Agent
- **Dave/Becca** — Client curation, user journey
- **Gregory** — Strategy, partnerships

### Commercial Terms
**Revenue split:** 50/50 between Symbiocene Labs and Regen Network (default). Custom splits negotiable per client.

### Timeline
- **Feb 11** — BizDev front-end MVP (READY)
- **Feb 17-19** — GreenBiz 26 (Phoenix) — potential in-person demos
- **Repo:** https://github.com/gaiaaiagent/regen-bizdev

---

## The Competitive Moat

| Layer | What We Have | Generic AI Equivalent | Moat |
|-------|-------------|----------------------|------|
| **Domain Knowledge** | 69,000+ docs: credit methodologies, governance standards, forum discussions, technical specs. Open and queryable via KOI MCP — no auth required. | None — not in any public connector | **Open data, proprietary workflows.** Anyone can query the corpus. The moat is what we build on top: curated workflows, registry expertise, deployment infrastructure. |
| **On-Chain Registry** | 13 credit classes, 58 projects, real attestation infrastructure, marketplace data | No MCP connector exists for Regen Ledger | **Strong** |
| **Governance Workflows** | 24-tool registry review system, 8-stage methodology approval simulation | No equivalent anywhere | **Unique** |
| **Knowledge Graph Pipeline** | Sensors → Event Bridge → Processor → pgvector + Fuseki → Hybrid RAG | Notion/Drive connectors give flat doc access, not semantic graph | **Strong** |
| **Custom Web Apps** | Registry Review (React 19 + FastAPI), white-labelable in days | Client would need to build from scratch | **Strong** |
| **AI Agents** | ElizaOS agents with domain expertise, MCP integration, Telegram/web | Claude Desktop is single-user, no multi-channel | **Moderate** |
| **Network Effects** | Growing commons of ecological methodology knowledge from partner organizations (planned, opt-in). Shared governance precedents accelerate future reviews. | No equivalent at Verra/Gold Standard — proprietary, siloed knowledge. | **Emerging** — compounds with each new participant. |

---

## Component Inventory

| Component | Status | Deployment Readiness |
|-----------|--------|---------------------|
| KOI Processor (hybrid RAG) | Production | Ready — running on 202.61.196.119 |
| PostgreSQL + pgvector | Production | Ready — 69,000+ documents indexed |
| Apache Jena Fuseki (SPARQL) | Production | Ready — entity graph queryable |
| KOI Sensors (8 data sources) | Production | Ready — Notion, GitHub, Discourse, Drive, etc. |
| Regen Ledger MCP | Production | Ready — 13 classes, 58 projects queryable |
| KOI MCP Server | Production | Ready — search, SPARQL, entity resolution |
| Registry Review Web App | Production | Ready — React 19 + FastAPI, 8-stage workflow |
| Registry Review MCP | Production | Ready — 24 tools for methodology review |
| ElizaOS Agents | Production | Ready — Telegram + web, custom characters |
| BizDev Agent Workflows | MVP | Ready — 5 reusable workflows, 2 client configs |

---

## Three-Tier Offering

### Tier 1: Registry Intelligence
**What they get:** Claude Code/Desktop project configured with Regen MCP tools. Produces registry-grade artifacts: credit class mapping, governance review simulation, verification plans, integration blueprints.

**Effort:** Already built. Configuration only per client.

**Includes:**
- Agent + 5 reusable workflows + golden outputs
- Live queries against Regen knowledge graph (69,000+ docs) and on-chain registry (13 classes, 58 projects)
- 8-week sprint proposal with scoped deliverables

**Differentiator:** No other AI tool can produce these outputs. They require live infrastructure queries against Regen's registry, knowledge graph, and governance standards.

**Revenue model:** Sprint-based consulting — 8-week engagements with defined deliverables.

---

### Tier 2: Knowledge Infrastructure
**What they get:** Their own KOI instance populated from THEIR data sources + Regen's. Custom MCP server with filtered tools. Custom web app (forked from Registry Review). AI agent with domain expertise accessible via Telegram/web.

**Effort:** 2-3 weeks per client deployment.

**Components deployed:**

```
Client Environment
├── KOI Processor Instance
│   ├── PostgreSQL + pgvector (their knowledge graph)
│   └── Apache Jena Fuseki (their entity graph)
├── KOI Sensors (configured for their data sources)
│   ├── Notion workspace
│   ├── GitHub repos
│   ├── Discourse forums
│   ├── Google Drive folders
│   └── Custom sources as needed
├── Custom MCP Server
│   └── Tool filtering via KOI_ENABLED_TOOLS
├── Web Application (Registry Review fork)
│   ├── Their branding / CSS
│   ├── Their workflow stages
│   └── Their document templates
└── AI Agent (ElizaOS)
    ├── Custom character + system prompt
    ├── Domain expertise from their KOI instance
    └── Telegram / web / API channels
```

**Differentiator:** They get the SAME infrastructure Regen uses internally, pointed at their domain. Not just API access — a full knowledge platform.

**Revenue model:** Setup fee + monthly infrastructure hosting.

---

### Tier 3: Registry Partnership
**What they get:** Everything in Tier 2 + deep registry integration. Custom credit classes, methodology submission support, production attestation pipeline, marketplace integration.

**Effort:** 6-12 weeks, ongoing relationship.

**Additional components:**
- Custom credit class design and submission
- Methodology review preparation and support
- Production data anchoring pipeline (MsgAnchorData, MsgAttest)
- Marketplace integration for credit issuance and trading
- Ongoing governance participation support

**Differentiator:** Institutional partnership, not just technology licensing. Direct path from data collection to registry-grade ecological credits.

**Revenue model:** Revenue share on credit issuance + infrastructure fees.

---

## Access Model

- **Public corpus:** 69,000+ documents queryable via KOI MCP, no auth required, open to anyone. Credit methodologies, governance standards, forum discussions, technical specs.
- **Private org data:** Internal team data and client-specific data are auth-gated and never shared. Client engagement artifacts, proprietary methodologies, and internal analysis stay private.
- **Optional commons contributions:** Planned. Opt-in. Organizations choose what, if anything, to contribute back. Default is private. See "Ecological Knowledge Commons" below.

---

## Ecological Knowledge Commons

_A planned network property that makes all tiers more valuable over time._

**What it is:** A shared, growing body of ecological methodology knowledge, verification evidence, and governance precedents — contributed by participating organizations with their consent. Not raw data or proprietary methodologies. Methodology learnings, governance review precedents, and verification frameworks that benefit the entire ecosystem.

**How it works:** Federated knowledge sharing with sovereignty controls. Each organization decides what to contribute and what stays private. Default is private. Nothing is shared without explicit opt-in. Organizations retain full control over their data and can withdraw contributions.

**Why it matters:** More participants → richer methodology comparisons → faster governance reviews → more credible credits → more participants. This is the network effect that proprietary registries (Verra, Gold Standard) cannot replicate — their knowledge stays siloed.

**Principles:**
- **Knowledge sovereignty** — each organization controls what they share
- **Methodological transparency** — shared learnings strengthen the science
- **Shared governance** — collective standards benefit all participants

**Now vs Next:**
- **Now:** Public KOI corpus (open, queryable) + private auth-gated data per client. Each engagement is bilateral (Regen ↔ Client). No cross-client knowledge sharing.
- **Next:** Opt-in federated commons. Organizations that choose to share select methodology learnings and governance precedents (not raw data or proprietary methods) enrich a shared intelligence base. This creates network effects as more organizations participate.

This is not a tier — it's a cross-cutting property that emerges as the registry ecosystem grows. It makes Tier 1 consulting faster (richer comparisons), Tier 2 infrastructure smarter (more training signal), and Tier 3 partnerships more valuable (stronger governance foundation).

---

## Infrastructure Architecture

```
Data Sources                    Knowledge Infrastructure              Delivery
─────────────                   ────────────────────────              ────────

Notion         ─┐
GitHub         ─┤              ┌─────────────────────┐
Discourse      ─┤──► Sensors ──►│   KOI Processor     │
Google Drive   ─┤              │  ┌───────────────┐  │              ┌──────────┐
Custom APIs    ─┘              │  │ pgvector       │  │──► MCP ────►│ AI Agent │
                               │  │ (69,000+ docs)    │  │   Server    │ (Claude/ │
                               │  ├───────────────┤  │              │  ElizaOS)│
Regen Ledger ─────────────────►│  │ Fuseki         │  │              └──────────┘
(13 classes,                   │  │ (entity graph) │  │
 58 projects)                  │  └───────────────┘  │              ┌──────────┐
                               └─────────────────────┘──► Web App ─►│ Registry │
                                                        (React 19 + │  Review  │
                                                         FastAPI)   └──────────┘
```

---

## The One-Liner

> Claude Desktop gives you a chatbot. We give you an institutional platform.

_Same infrastructure Regen Network built for itself — now available to partners who need registry-grade ecological intelligence._

**The longer version** (for when you need the network angle):

> Our knowledge graph is open — 69,000 documents, queryable by anyone, no auth required. That's deliberate. Ecological data should be a commons, not an enclosure. What we provide is the expertise to build institutional workflows on top of it, and a growing network of organizations whose shared methodology learnings make every participant's credits more credible.
