# Regen AI Platform Overview

_Purpose-built knowledge infrastructure for ecological credit markets_

---

## What We're Selling

We're not selling an AI agent. We're selling **institutional-grade knowledge infrastructure** for ecological credit markets, with AI agents as the delivery mechanism.

A client with Claude Desktop can chat about their documents. A client with our infrastructure can **run institutional workflows** against a curated knowledge base of regenerative ecology, query real on-chain registry data, simulate governance reviews, and present results through custom web interfaces.

---

## The Competitive Moat

| Layer | What We Have | Generic AI Equivalent | Moat |
|-------|-------------|----------------------|------|
| **Domain Knowledge** | 48K+ docs: credit methodologies, governance standards, forum discussions, technical specs | None — not in any public connector | **Strong** |
| **On-Chain Registry** | 13 credit classes, 58 projects, real attestation infrastructure, marketplace data | No MCP connector exists for Regen Ledger | **Strong** |
| **Governance Workflows** | 24-tool registry review system, 8-stage methodology approval simulation | No equivalent anywhere | **Unique** |
| **Knowledge Graph Pipeline** | Sensors → Event Bridge → Processor → pgvector + Fuseki → Hybrid RAG | Notion/Drive connectors give flat doc access, not semantic graph | **Strong** |
| **Custom Web Apps** | Registry Review (React 19 + FastAPI), white-labelable in days | Client would need to build from scratch | **Strong** |
| **AI Agents** | ElizaOS agents with domain expertise, MCP integration, Telegram/web | Claude Desktop is single-user, no multi-channel | **Moderate** |

---

## Component Inventory

| Component | Status | Deployment Readiness |
|-----------|--------|---------------------|
| KOI Processor (hybrid RAG) | Production | Ready — running on 202.61.196.119 |
| PostgreSQL + pgvector | Production | Ready — 48K+ documents indexed |
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
- Live queries against Regen knowledge graph (48K+ docs) and on-chain registry (13 classes, 58 projects)
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

## Infrastructure Architecture

```
Data Sources                    Knowledge Infrastructure              Delivery
─────────────                   ────────────────────────              ────────

Notion         ─┐
GitHub         ─┤              ┌─────────────────────┐
Discourse      ─┤──► Sensors ──►│   KOI Processor     │
Google Drive   ─┤              │  ┌───────────────┐  │              ┌──────────┐
Custom APIs    ─┘              │  │ pgvector       │  │──► MCP ────►│ AI Agent │
                               │  │ (48K+ docs)    │  │   Server    │ (Claude/ │
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
