# Knowledge Graph Infrastructure Demo Script

_Reusable Act — insert into any client demo to showcase KOI infrastructure_

**Duration:** 3 minutes
**Purpose:** Show what's behind the agent — the knowledge infrastructure that makes outputs unique
**Key message:** "The agent is only as good as the knowledge infrastructure behind it. You'd get your own instance."
**Web Dashboard:** `https://regen.gaiaai.xyz/bizdev/explore`

---

## Setup

**Option A (preferred): Web Dashboard**
- Open `https://regen.gaiaai.xyz/bizdev/` — Landing page with live counters
- Have `/bizdev/explore` ready (or use client-specific: `?client=renew` / `?client=landbanking`)

**Option B: Claude MCP**
- Requires KOI MCP tools available in session. No client-specific configuration needed.

---

## Demo Sequence (Web Dashboard version)

### Step 1: Live Counters (30 sec)

**ACTION:** Open `https://regen.gaiaai.xyz/bizdev/`. Counters animate from zero.

**SAY:** "This is the knowledge base behind every output the agent produces. Over 69,000 documents — credit methodologies, governance standards, forum discussions, technical specs. 21 data sources. 13 credit classes on Regen Ledger. This isn't a static dataset — new content flows in automatically from sensors monitoring Regen's ecosystem."

### Step 2: Knowledge Explorer — Search + Entity Graph (90 sec)

**ACTION:** Navigate to `/bizdev/explore`. The first suggestion auto-fires after 1 second.

**SHOW:**
- Search results appearing on the left (document cards with source badges)
- Entity graph materializing on the right (D3 force-directed graph with typed nodes)

**SAY:** "Watch — the system is searching 69,000 documents. Results come from multiple sources — forum discussions, GitHub documentation, governance proposals, the registry handbook. The hybrid RAG combines keyword search with semantic embedding search."

**ACTION:** Click an entity node in the graph. It re-centers with new neighbors and fires a new search.

**SAY:** "This is a knowledge GRAPH, not a document store. Entities are connected — a credit class links to its methodology, which links to governance discussions, which links to reviewer feedback. Every connection is backed by indexed documents."

**POWER MOVE:** Type something unscripted. Results appear.

**SAY:** "This works for any question about ecological credit markets. The infrastructure handles it."

### Step 3: Source Diversity (30 sec)

**ACTION:** Point to the source badges on search results (different colors for Discourse, GitHub, Notion, Google Drive, etc.)

**SAY:** "Notice the results come from different sources — forum discussions, governance docs, technical specs, the registry handbook. The hybrid RAG finds conceptually related documents even when they use different terminology. This is how the Credit Class Mapper produces its outputs — by searching across all of these sources simultaneously."

### Step 4: Sensor Pipeline (30 sec)

**PRESENTER NOTES (no prompt needed — just explain):**
> "The knowledge base stays current through automated sensors. When someone posts a new methodology proposal on the Discourse forum, or a governance decision gets documented on GitHub, or a new credit class gets registered on-chain — it flows into the knowledge graph within hours. Your instance would have sensors pointed at YOUR data sources: your Notion workspace, your GitHub repos, your internal documentation."

---

## Demo Sequence (Claude MCP version — fallback)

Use this if the web dashboard is unavailable.

### Step 1: Corpus Stats (30 sec)

**PROMPT:**
> Show me the current state of Regen's knowledge base — how many documents, what sources, and what's been ingested recently.

**EXPECTED OUTPUT:** `get_stats()` returns:
- 69,000+ total documents
- Sources: Discourse forum posts, GitHub documentation, governance proposals, methodology specs, registry handbook, technical architecture docs
- Recent ingestion activity showing the pipeline is live

### Step 2: Entity Graph (60 sec)

**PROMPT:**
> Run a SPARQL query to show me the relationship between credit classes and other entities in the knowledge graph — organizations, evidence, standards. Show the connections — not just a flat list.

**EXAMPLE SPARQL (if the agent needs guidance):**
```sparql
SELECT ?className ?relation ?targetLabel ?targetType
WHERE {
  ?class a ?ctype .
  FILTER(CONTAINS(STR(?ctype), "CREDIT_CLASS"))
  ?class rdfs:label ?className .
  ?other ?relation ?class .
  ?other rdfs:label ?targetLabel .
  ?other a ?targetType .
  FILTER(?targetType != ?ctype)
}
LIMIT 20
```

### Step 3: Hybrid RAG Quality (60 sec)

**PROMPT:**
> Search the knowledge base for "biodiversity credit methodology verification requirements" — show me what the system finds and where it comes from.

### Step 4: Sensor Pipeline (30 sec)

Same as web dashboard version — verbal explanation, no prompt needed.

---

## Transition to Next Act

> "So that's what powers everything — 69K+ documents in a knowledge graph with entity relationships and hybrid search, all queryable through a live web interface. Now let me show you the client-specific analysis..."

---

## Fallback

If both web dashboard and MCP are unavailable:
- Use pre-cached stats: "69,000+ documents from 21 source types"
- Show screenshots of the Explorer page with results + entity graph
- The sensor pipeline explanation (Step 4) requires no live queries
- **Hard minimum:** Steps 1 + 4 = 1 minute with verbal explanation only
