# Knowledge Graph Infrastructure Demo Script

_Reusable Act — insert into any client demo to showcase KOI infrastructure_

**Duration:** 3 minutes
**Purpose:** Show what's behind the agent — the knowledge infrastructure that makes outputs unique
**Key message:** "The agent is only as good as the knowledge infrastructure behind it. You'd get your own instance."

---

## Setup

Requires KOI MCP tools available in session. No client-specific configuration needed — this act showcases shared infrastructure.

---

## Demo Sequence

### Step 1: Corpus Stats (30 sec)

**PROMPT:**
> Show me the current state of Regen's knowledge base — how many documents, what sources, and what's been ingested recently.

**EXPECTED OUTPUT:** `get_stats()` returns:
- 68,000+ total documents
- Sources: Discourse forum posts, GitHub documentation, governance proposals, methodology specs, registry handbook, technical architecture docs
- Recent ingestion activity showing the pipeline is live

**PRESENTER NOTES:** Say: "This is the knowledge base behind every output the agent produces. Over 68,000 documents — credit methodologies, governance standards, forum discussions, technical specs. This isn't a static dataset. New content flows in automatically from 20+ sensors monitoring Regen's ecosystem."

### Step 2: Entity Graph (60 sec)

**PROMPT:**
> Run a SPARQL query to show me the relationship between credit classes and methodology documents in the knowledge graph. Show the connections — not just a flat list.

**EXAMPLE SPARQL (if the agent needs guidance):**
```sparql
SELECT ?class ?className ?doc ?docTitle
WHERE {
  ?class a koi:CreditClass ;
         rdfs:label ?className .
  ?doc koi:references ?class ;
       dc:title ?docTitle .
}
LIMIT 20
```

**EXPECTED OUTPUT:** Entity relationship results showing credit classes connected to their methodology documents, governance discussions, and review materials.

**PRESENTER NOTES:** Say: "This is a knowledge GRAPH, not a document store. Entities are connected — a credit class links to its methodology, which links to governance discussions, which links to reviewer feedback. When the agent searches for 'biodiversity methodology,' it traverses these relationships. A flat document search can't do this."

### Step 3: Hybrid RAG Quality (60 sec)

**PROMPT:**
> Search the knowledge base for "biodiversity credit methodology verification requirements" — show me what the system finds and where it comes from.

**EXPECTED OUTPUT:** `search()` returns 5+ results from multiple sources:
- Registry Handbook sections on methodology submission
- Biodiversity Credit Type Proposal (forum topic 49)
- Desert Regreening Credit Class Proposal (forum topic 490)
- BioTerra (BT01) credit class documentation
- Technical documentation on verification standards

**PRESENTER NOTES:** Say: "Notice the results come from different sources — forum discussions, governance docs, technical specs, the registry handbook. The hybrid RAG combines keyword search with semantic embedding search, so it finds conceptually related documents even when they use different terminology. This is how the Credit Class Mapper produces its outputs — by searching across all of these sources simultaneously."

### Step 4: Sensor Pipeline (30 sec)

**PRESENTER NOTES (no prompt needed — just explain):**
> "The knowledge base stays current through automated sensors. When someone posts a new methodology proposal on the Discourse forum, or a governance decision gets documented on GitHub, or a new credit class gets registered on-chain — it flows into the knowledge graph within hours. Your instance would have sensors pointed at YOUR data sources: your Notion workspace, your GitHub repos, your internal documentation."

---

## Transition to Next Act

> "So that's what powers the agent — 68K+ documents in a knowledge graph with entity relationships and hybrid search. Now let me show you the web application that your team would use directly..."

---

## Fallback

If `get_stats()` or `sparql_query()` are slow or return errors:
- Use pre-cached stats: "68,000+ documents from 8 source types"
- Skip the SPARQL query — the search results in Step 3 are more visually impressive anyway
- The sensor pipeline explanation (Step 4) requires no live queries

**Hard minimum:** Steps 1 + 3 + 4 = 2 minutes. Step 2 (SPARQL) can be cut if pressed for time.
