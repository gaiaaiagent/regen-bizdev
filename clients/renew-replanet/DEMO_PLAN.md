# Renew/RePlanet - Demo Agent Plan (v2)

_Revised after strategic review — centers on registry-readiness workflows, not document Q&A._

## Client Profile

- **Company**: Renew (spun out from rePLANET, UK)
- **CEO**: Jason Eis (ex-McKinsey partner, natural capital/nature service line)
- **Science Lead**: Dan Exton (biodiversity researcher, co-founded Wallacea Trust methodology)
- **Tech Lead**: Mark Moore (15 years tech, joined summer 2025, building MVP)
- **Advisor**: Tim (CEO of rePLANET, parent/related entity)
- **Stage**: Early-stage, building development team, evaluating registry solutions

## Relationship Status

Two major calls have happened:
1. **Mar 27, 2025** (rePLANET call) - Gregory, Tica, Dave met with Tim & Jason. Discussed Regen registry platform, enterprise pricing (<$250K build), SaaS vs Build-Operate-Transfer. Tim said it "sounds pretty well ideal." Interest in branded registry ("Molyse Trust Biodiversity Futures Initiative").
2. **Jan 16, 2026** (Renew call) - Becca, Sam, Dave met with Jason, Dan, Mark. Deep technical dive into blockchain integration, DAOs, key management, data anchoring. Renew wants Regen as **backend infrastructure** (not front-facing). They are evaluating other options but Regen is "very high on the list."

**Current status**: Renew was going to send a bullet-point scope of deliverables; Regen would respond within 5-7 business days with a proposal. Need to confirm if this happened.

## What They Need (from their own words)

1. **Data anchoring** - Immutable records of ecological data on chain
2. **Attestation framework** - Third parties (BFI) can independently validate mission plans and data
3. **Trust infrastructure** - Auditability for clients in case of fraud concerns or auditing
4. **Registry** - Project information, methodology information, data collection records
5. **Frictionless integration** - Regen as backend, their own front-end UI
6. **Key management guidance** - Enterprise-grade custodial approach

## Their Workflow

1. Customer comes to Renew with a site/project
2. Renew designs a mission plan (sampling plan for biodiversity data collection)
3. BFI validates the mission plan
4. Field work: data collection across 5 taxa (3D structure, invertebrates, birds, bat fauna, plants)
5. Species weighted by conservation value (1-5) and relative abundance (1-5)
6. Generate report with biodiversity metrics
7. Repeat monitoring in 2 years to measure change
8. Data supports carbon credits (Verra) + stacked biodiversity credits

---

## Strategic Assessment

### Moat Analysis

| Regen Advantage | Strength | Notes |
|----------------|----------|-------|
| Registry infrastructure (credit classes, governance, methodology review) | **Strong** | Hard to replicate, takes years to build. This is the real product. |
| On-chain data access (Ledger MCP) | **Medium** | Unique data, non-trivial to replicate without equivalent chain modules. |
| KOI knowledge graph (69K+ docs, entity resolution, structured queries) | **Medium** | The moat is the graph structure and provenance-linked queries, not raw corpus size. Frontier models will know the domain — they won't have the structured retrieval. |
| Client context pre-loading | **Weak** | Already commoditized. NotebookLM, ChatGPT Enterprise, Claude Team all do this. |
| Domain AI agent (chat interface) | **Weak** | The chat layer is a commodity wrapper. Only defensible when it drives registry/verification workflows. |

### Key Insight

**The agent is not the product. The infrastructure is the product.** The demo must prove that Regen's registry, governance, and verification capabilities are essential — not that we can build a nice chatbot. The AI is the delivery mechanism for showing infrastructure value.

### Commoditization Risks

- Document Q&A and proposal drafting are fully commoditized — every enterprise AI suite does this
- Data anchoring can be approximated with conventional audit trails + cryptographic hashing (AWS QLDB, etc.)
- "Pre-loaded with client context" is not a differentiator
- If the demo only shows text synthesis, it will be dismissed as a ChatGPT wrapper

---

## Recommended Demo Approach: "Registry Readiness Engine"

**Not a chatbot that answers questions — a workflow that produces artifacts.**

The demo takes Renew's actual methodology and workflow, runs it through Regen's registry framework, and produces outputs that could only exist if Regen is the backend. The deal-room narrative (synthesizing calls, drafting proposals) is the wrapper — the registry workflow is the core.

### Demo Flow (4 outputs)

#### Output 1: Deal Dossier (the wrapper — table stakes)
The agent synthesizes both call transcripts, prospect brief, and open items into a concise deal summary with a proposal outline. This demonstrates the "wow factor" Dave wants — surprising depth of preparation — but we don't linger here. It's the appetizer, not the meal.

**Demo prompt**: "Summarize everything we know about Renew, key decisions from both calls, and draft a proposal outline"

#### Output 2: Methodology-to-Registry Map (the differentiator)
A structured table mapping Wallacea Trust methodology fields to Regen's registry schema requirements. Explicit gap analysis: what maps cleanly, what needs adaptation, what evidence is missing. This is something no generic AI tool can produce — it requires knowledge of both the client's methodology and Regen's credit class system.

**Demo prompt**: "Map the Wallacea Trust 5-taxa methodology to Regen's credit class requirements. Show me what aligns, what has gaps, and what evidence would be needed for registry eligibility."

**What the agent uses**:
- KOI MCP: search for existing biodiversity credit methodologies on Regen, Wallacea Trust references, methodology review standards
- Ledger MCP: query existing biodiversity credit classes, their requirements, batch structures
- Client data: Wallacea Trust methodology details from call transcripts and prospect brief

#### Output 3: Integrity Artifact (the proof)
Take a mock biodiversity dataset (sample 5-taxa survey from a UK restoration site), hash it, generate an attestation object, and show how it would be anchored on Regen Ledger with a resolver. This demonstrates the data anchoring and trust infrastructure Renew explicitly asked for — in a way that can't be faked with ChatGPT.

**Demo prompt**: "Here's a sample biodiversity survey dataset from a UK restoration site. Show me how this would be anchored on Regen Ledger — hash the data, generate an attestation record, and show what the on-chain provenance trail would look like."

**What the agent uses**:
- Ledger MCP: demonstrate data anchoring mechanics, resolver patterns
- Registry Review MCP: show how attestation fits the methodology review process

#### Output 4: Integration Blueprint (the deliverable)
A one-page architecture diagram and phased implementation plan showing how Renew integrates with Regen as backend infrastructure. Directly addresses their stated requirement for "frictionless integration" with their own front-end. Includes: API touchpoints, key management approach, data flow from field collection → Renew platform → Regen registry.

**Demo prompt**: "Draft a Phase 1 integration architecture for Renew using Regen as backend. Show the data flow from field data collection through to registry registration, including key management and attestation checkpoints."

### Why This Works

1. **Output 1** gives Dave the "wow factor" narrative — surprising depth of understanding before a second call
2. **Output 2** proves domain expertise that requires structured knowledge (KOI graph + Ledger schema), not just text summarization
3. **Output 3** directly addresses Renew's #1 stated need (data anchoring + trust) with a tangible artifact
4. **Output 4** shows we've thought about their specific integration requirements, not just pitched generically

### What Makes This Better Than ChatGPT (Honest Version)

The old differentiation list was: KOI has 69K docs, we have on-chain data, we pre-loaded their context, etc. That's weak — most of those can be approximated.

**The real differentiation:**
1. **Registry workflow outputs** — No generic AI tool can map a biodiversity methodology to Regen's credit class schema, identify registry eligibility gaps, and generate a verification plan. This requires structured knowledge of Regen's specific infrastructure.
2. **On-chain artifact generation** — Producing a data anchor, attestation object, and provenance trail requires actual integration with Regen Ledger. You can't fake this with RAG.
3. **Governance checkpoints** — The agent can show what would block or advance a methodology through Regen's review process. This reflects real institutional process, not summarization.
4. **Graph-structured domain queries** — KOI's value isn't "more documents" — it's provenance-linked retrieval across 69K+ documents with entity resolution. "Show me all biodiversity methodologies that use taxa-weighted scoring and have been discussed in Regen governance" is a query that requires graph structure, not vector search on a corpus.

---

## What NOT to Build

- **Full biodiversity market intelligence dashboard** — Too broad, easily outgunned by public sources
- **Custom front-end UI** — Renew explicitly wants backend integration; a chat UI is the wrong signal
- **Deep data validation across all 5 taxa** — Derails scope, looks like bespoke consulting
- **Comprehensive competitor analysis** — Not our moat, and easily replicated
- **Elaborate mock data pipeline** — Keep the integrity artifact simple and demonstrative, not production-grade

## MCP Tools to Highlight

- **KOI MCP**: Existing biodiversity credit methodologies on Regen, community discussions about biodiversity crediting, Wallacea Trust references, methodology review standards
- **Ledger MCP**: Biodiversity credit classes, credit batch structures, marketplace data, data anchoring mechanics
- **Registry Review MCP**: Methodology review process, eligibility criteria, governance checkpoints

## Key Talking Points for the Call

1. "We've synthesized both calls and your technical requirements into a concrete integration plan" (Output 1 + 4)
2. "Here's exactly how your Wallacea Trust methodology maps to our registry — and where the gaps are" (Output 2)
3. "This is what data anchoring actually looks like on Regen Ledger, using your kind of data" (Output 3)
4. "This isn't a chatbot demo — these are registry-grade artifacts that could only be produced by our infrastructure"
5. Propose 8-week sprint: registry integration pilot with defined milestones (methodology registration, first data anchor, attestation framework)

## Feb 11 Scope

Realistically for 4 days:
- **Day 1**: Set up Claude project with client data + MCP tools. Get Output 1 (Deal Dossier) working — this is the easiest.
- **Day 2**: Build Output 2 (Methodology-to-Registry Map). This requires testing KOI + Ledger MCP queries for biodiversity credit classes and methodology schemas.
- **Day 3**: Build Output 3 (Integrity Artifact). Mock the data anchoring flow. May need to simplify to a "this is what it would look like" narrative with real Ledger data references.
- **Day 4**: Build Output 4 (Integration Blueprint). Polish, test full demo flow, prepare for internal review.

**Stretch goals** (if time permits):
- Interactive demo where you can modify the sample dataset and see the registry mapping update
- Side-by-side comparison: same question asked to ChatGPT vs our agent, showing the difference in output quality

## Timeline Pressure

- Renew said they want to move "pretty quickly" this year
- They're also evaluating other blockchain options and staying web 2.0
- Need to re-engage before they make a decision without us
- Mark Moore (tech lead) is the key decision-maker on infrastructure choice — the demo must speak to his concerns (key management, API integration, dev support)

## Biz-Dev Agent Implications

Components from this demo that feed the broader biz-dev agent:
- **Deal Dossier generator** — Reusable across all prospects (synthesize calls + docs into proposal)
- **Methodology-to-Registry mapper** — Reusable for any client bringing a methodology to Regen
- **Integration blueprint template** — Parameterized architecture docs for registry-as-backend pattern
- The **Integrity Artifact** pattern is Renew-specific but the "show don't tell" approach to data anchoring is reusable
