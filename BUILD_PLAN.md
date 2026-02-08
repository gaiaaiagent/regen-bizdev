# Build Plan: BizDev Demo Agent MVP

_Target: Feb 11, 2026 internal milestone_

---

## Implementation Status & Next Steps

_Last updated: Feb 7, 2026 — expanded to 5-act platform demo_

### Completed (Phase 1 — Day 1)

| Step | Description | Status |
|------|-------------|--------|
| 1.1 | MCP Validation — KOI, Ledger tested with pass/fail criteria | DONE — see §1.1.1 for full results |
| 1.2 | Base system prompt (`foundation/system-prompt.md`) | DONE |
| 1.3 | Deal Dossier workflow | DONE |
| 1.4 | Credit Class Mapper workflow (core differentiator) | DONE |
| 1.5 | Governance Review workflow (with simulation disclaimer) | DONE |
| 1.6 | Verification Plan workflow | DONE |
| 1.7 | Integration Blueprint workflow | DONE |
| 2.1 | Renew: demo-config.md + mock data | DONE |
| 2.2 | Landbanking: demo-config.md + mock data | DONE |
| — | Demo scripts (demos/renew-demo.md, demos/landbanking-demo.md) | DONE |
| — | Registry Review MCP added to `.mcp.json` | DONE (needs session validation) |

### Completed (Phase 2 — Feb 7-8, 2026)

| Step | Description | Status |
|------|-------------|--------|
| A | Registry Review MCP validation — all 4 test tools pass | DONE — see §1.1.1 for full results |
| B.1 | Renew Act 1: Deal Dossier golden output | DONE — `clients/renew-replanet/golden-outputs/act1-deal-dossier.md` |
| B.2 | Renew Act 2: Credit Class Mapper golden output (THE MONEY SHOT) | DONE — uses real BT01/USS01/MBS01/C01-C09 IDs from live `list_classes()` |
| B.3 | Renew Act 3: Data Anchoring walkthrough golden output | DONE — references `regen/data/v1`, MsgAnchorData, MsgAttest, IRI resolution |
| B.4 | Renew Act 4: Integration Blueprint golden output | DONE — addresses Mark Moore's key management + API concerns |
| B.5 | Landbanking Act 1: Deal Dossier + Memo Comparison golden output | DONE — includes head-to-head memo comparison, recommends Agile Tokenization first |
| B.6 | Landbanking Act 2: Credit Class Mapper golden output (THE MONEY SHOT) | DONE — maps 5 dimensions, uses real credit class IDs, scores 4/10 (realistic) |
| B.7 | Landbanking Act 3: Governance Review Simulation golden output | DONE — includes simulation disclaimer, 4-stage process, 5 reviewer flags, 24-38 week timeline |
| B.8 | Landbanking Act 4: Verification Plan golden output | DONE — verifier types per dimension, data flow, monitoring schedule, cost estimates |
| C | Quality check all 8 golden outputs against demo script EXPECTED sections | DONE — all pass. No prompt iterations needed. |

### Next Steps (Phase 3 — Day 3-4)

**Step D: Write 8-Week Sprint Proposals** ✅ DONE (Feb 7)

One per client, grounded in golden output findings:
- `clients/renew-replanet/sprint-proposal.md` — 4-phase: credit class mapping → data anchoring pilot → API integration → BFI verification framework
- `clients/landbanking-group/sprint-proposal.md` — 4-phase: credit class mapping → methodology pre-review → MRV framework → first attestation PoC

**Step E: Expanded Demo — Full Stack Showcase** ✅ DONE (Feb 7)

Demo reframed from 4-act agent demo to 5-act infrastructure platform showcase:
- `foundation/platform-overview.md` — 3-tier offering document (Tier 1: Registry Intelligence, Tier 2: Knowledge Infrastructure, Tier 3: Registry Partnership)
- `demos/knowledge-graph-demo.md` — Reusable KOI infrastructure demo script (Act 2 insert)
- `demos/web-app-demo.md` — Reusable Registry Review web app walkthrough (Act 3 insert)
- `demos/renew-demo.md` — Updated to 5 acts (15 min target, 20 min hard cap)
- `demos/landbanking-demo.md` — Updated to 5 acts (15 min target, 20 min hard cap)

New demo structure per client:
1. **Act 1: "The Agent"** (3 min) — Deal Dossier / strategic analysis (table stakes)
2. **Act 2: "The Knowledge Graph"** (3 min) — KOI stats, search, sensor pipeline
3. **Act 3: "The Web App"** (4 min) — Registry Review walkthrough
4. **Act 4: "The Registry Mapping"** (3 min) — THE MONEY SHOT, credit class mapper
5. **Act 5: "The Integration/Verification"** (2 min) — Client-specific next steps
6. **Close: "The Platform Vision"** (1 min) — "Claude Desktop gives you a chatbot. We give you an institutional platform."

**Step F: Polish & Review (Day 4 — Feb 11)**
- Run both full demo flows end-to-end
- Time each act (target: 15 min total per demo, hard cap 20 min)
- Test Registry Review web app authentication
- Internal review with Dave/Becca
- Decide which client to present first (recommend Renew — richer data, further along)

### Key Facts for the Next Agent

- **MCP tool prefixes**: KOI tools use `mcp__plugin_koi_regen-koi__`, Ledger uses `mcp__plugin_ledger_regen-network__`, Registry Review should appear as `registry-review` server tools
- **Credit classes on-chain**: 13 total. Biodiversity-relevant: BT01 (BioTerra), MBS01 (Marine Biodiversity Stewardship), USS01 (Umbrella Species Stewardship). Carbon: C01-C09. Other: KSH01 (Kilo-sheep-hour)
- **Credit type definitions**: BioTerra = "weighted 10m^2 score of long-term restoration/preservation"; Carbon = "metric ton CO2 equivalent"; USS = "~1 hectare of umbrella species habitat stewarded for 1 year"
- **Wallacea Trust** has zero hits in KOI (external methodology). This is expected and the demo scripts account for it.
- **compare_credit_methodologies** returns zeroed scores (metadata-based). Use `list_classes` + `list_credit_types` + KOI search for more useful mapping data.
- **Metadata IRI resolution** works via `resolve_metadata_iri` — resolves through `api.regen.network` with content hash verification. One C01 IRI returned 404 (possibly outdated).
- **Registry handbook** is well-indexed in KOI: methodology submission guidelines, 4-stage review process, expert peer reviewer criteria. Search `search("methodology review process")` or `search_github_docs("submitting a methodology")`.
- **Data anchoring** docs in KOI: `regen/data/v1/tx.proto` (MsgAnchorData, MsgAttest), data module overview, Architecture.tex. Attestation is described as "like signing a legal document."
- **Forum topics for demos**: Biodiversity Credit Type Proposal (topic 49), Desert Regreening Credit Class Proposal (topic 490), Natural Capital Tools Collab (topic 101)

---

## What We're Building

**Not just an agent — a purpose-built knowledge infrastructure platform** for ecological credit markets, with AI agents as the delivery mechanism.

A client with Claude Desktop can chat about their documents. A client with our infrastructure can run institutional workflows against a curated knowledge base of regenerative ecology, query real on-chain registry data, simulate governance reviews, and present results through custom web interfaces.

See `foundation/platform-overview.md` for the full platform vision and three-tier offering.

### Three-Tier Offering

| Tier | What They Get | Effort | Revenue Model |
|------|--------------|--------|---------------|
| **1: Registry Intelligence** | Configured Claude project + MCP tools → registry-grade artifacts | Already built. Config only. | Sprint-based consulting |
| **2: Knowledge Infrastructure** | Their own KOI instance + custom MCP + web app fork + AI agent | 2-3 weeks deployment | Setup fee + monthly hosting |
| **3: Registry Partnership** | Tier 2 + custom credit classes + methodology support + production attestation | 6-12 weeks, ongoing | Revenue share + infrastructure fees |

### The Competitive Moat

| Layer | What We Have | Generic AI Equivalent | Moat |
|-------|-------------|----------------------|------|
| Domain Knowledge | 48K+ docs | None in any public connector | **Strong** |
| On-Chain Registry | 13 credit classes, 58 projects | No MCP connector exists | **Strong** |
| Governance Workflows | 24-tool review system | No equivalent anywhere | **Unique** |
| Knowledge Graph Pipeline | Sensors → Processor → Hybrid RAG | Flat doc access only | **Strong** |
| Custom Web Apps | Registry Review (React 19 + FastAPI) | Build from scratch | **Strong** |
| AI Agents | ElizaOS, multi-channel | Single-user Claude Desktop | **Moderate** |

## Architecture

```
regen-bizdev/
├── foundation/                    # Shared biz-dev agent infrastructure
│   ├── system-prompt.md           # Base system prompt (parameterized per client)
│   ├── platform-overview.md       # Platform vision: 3-tier offering, competitive moat
│   ├── workflows/                 # Reusable workflow definitions
│   │   ├── deal-dossier.md        # Prospect synthesis → proposal outline
│   │   ├── credit-class-mapper.md # Asset concept → registry mapping + gaps
│   │   ├── governance-review.md   # Methodology → review simulation
│   │   ├── verification-plan.md   # Asset → MRV plan + data flow
│   │   └── integration-blueprint.md # Backend integration architecture
│   └── mock-data/                 # Template datasets
│       ├── biodiversity-survey-template.json
│       └── nature-equity-asset-template.json
│
├── clients/
│   ├── renew-replanet/
│   │   ├── DEMO_PLAN.md           # Strategy doc (already written, v2)
│   │   ├── DEEP_RESEARCH_PROMPT.md
│   │   ├── demo-config.md         # Client-specific system prompt overlay
│   │   ├── mock-data/
│   │   │   └── uk-restoration-biodiversity-survey.json
│   │   ├── golden-outputs/        # Pre-computed demo fallbacks (Phase 2)
│   │   │   ├── act1-deal-dossier.md
│   │   │   ├── act2-credit-class-mapper.md
│   │   │   ├── act3-data-anchoring.md
│   │   │   └── act4-integration-blueprint.md
│   │   ├── Renew_RePlanet_Notes.txt
│   │   ├── Regen_Network_rePLANET_otter_ai.pdf
│   │   └── Regen_Renew_otter_ai.pdf
│   │
│   └── landbanking-group/
│       ├── DEMO_PLAN.md           # Strategy doc (already written, v2)
│       ├── DEEP_RESEARCH_PROMPT.md
│       ├── demo-config.md         # Client-specific system prompt overlay
│       ├── mock-data/
│       │   └── cocoa-nature-equity-asset.json
│       ├── golden-outputs/        # Pre-computed demo fallbacks (Phase 2)
│       │   ├── act1-deal-dossier.md
│       │   ├── act2-credit-class-mapper.md
│       │   ├── act3-governance-review.md
│       │   └── act4-verification-plan.md
│       ├── LandBanking_Group_Notes.txt
│       ├── landbanking_alignment_memo_REGEN_centric.pdf
│       └── landbanking_group_alignment_memo.pdf
│
├── demos/                         # Ready-to-run demo scripts
│   ├── renew-demo.md              # 5-act demo: Agent → KOI → Web App → Registry → Integration
│   ├── landbanking-demo.md        # 5-act demo: Agent → KOI → Web App → Registry → Verification
│   ├── knowledge-graph-demo.md    # Reusable KOI infrastructure showcase (Act 2 insert)
│   └── web-app-demo.md            # Reusable Registry Review walkthrough (Act 3 insert)
│
├── BUILD_PLAN.md                  # This file
├── CLAUDE.md
└── README.md
```

---

## Phase 1: Shared Foundation (Day 1)

Everything in this phase is reusable across all clients. This IS the biz-dev agent seed.

### 1.1 Validate MCP Tools

**This is the first thing to do.** The entire demo depends on KOI and Ledger MCP returning useful data. If the tools don't have what we need, we need to know immediately.

**KOI MCP validation queries:**
```
- Search for "biodiversity credit methodology" → Do we get Regen-registered methodologies back?
- Search for "credit class requirements" → Do we get schema/structure info?
- Search for "methodology review process" → Do we get governance standards?
- Search for "natural capital valuation" → Do we get relevant frameworks?
- Search for "Wallacea Trust" → Any references?
- Search for "data anchoring" or "attestation" → Technical docs?
```

**Ledger MCP validation queries:**
```
- List all credit classes → What biodiversity-related classes exist?
- Get credit class details → What are the actual field requirements?
- List credit batches by class → What does real registered data look like?
- Query marketplace → Any biodiversity credits trading?
- Check governance proposals → Any methodology-related proposals?
```

**Registry Review MCP validation queries:**
```
- What does the methodology review checklist look like?
- What are common review findings?
- What evidence types are required?
```

**Pass/Fail Criteria:**

| Tool | Pass | Fail |
|------|------|------|
| KOI MCP | Returns ≥3 relevant methodologies with document IDs; returns structured info about credit class requirements or methodology review standards | Returns only generic/off-topic results or <2 relevant hits |
| Ledger MCP | Returns ≥1 credit class with schema fields (ideally biodiversity-adjacent); can list credit batches with metadata | Cannot list credit classes or returns no structured schema data |
| Registry Review MCP | Returns a review checklist structure or criteria list; can describe evidence requirements | Returns only narrative text with no structured review criteria |

**Decision gate:** If all three tools pass → proceed as planned with live queries. If one tool fails → build fallback "golden outputs" for that tool's demo acts (see Risk Mitigation). If two+ tools fail → fundamentally rethink the demo scope before proceeding. Document exact tool responses for each query.

### 1.1.1 MCP Validation Results (Feb 7, 2026)

**KOI MCP: PASS**
- `search("biodiversity credit methodology")` → 5 results including: Desert Regreening Credit Class Proposal (forum topic 490) with biodiversity uplift via functional biodiversity index; Biodiversity Credit Type Proposal (forum topic 49) for voluntary biodiversity credits on-chain. Both have document RIDs.
- `search("credit class requirements")` → 5 results from docs.regen.network and regen-ledger docs: credit class creation (MsgCreateClass), class issuers, bridge receive. Structured schema data with class properties (id, credit_type_abbrev, metadata IRI).
- `search("methodology review process")` → 5 results including the actual Registry Handbook: 4-stage protocol review process (Initial submission → Internal review → Expert peer review → Public comment), methodology submission guidelines, expert peer reviewer criteria. From regen-registry-handbook and handbook.regen.network.
- `search("Wallacea Trust")` → No direct matches (expected — external methodology not in Regen's corpus). Entity matching returned generic "trust" results.
- `search("natural capital valuation")` → Relevant results: Natural Capital Tools Collab (Regen x BASIN, forum topic 101), Booking Living Capital (Notion).
- `search("data anchoring attestation")` → Strong results: Architecture.tex (data timestamping/indexing), data module docs (content hash anchoring), attestation mechanics from `regen/data/v1/tx.proto` ("like signing a legal document"), data spec README.

**Ledger MCP: PASS**
- `list_classes()` → **13 credit classes**: C01-C09 (Carbon), BT01 (BioTerra), KSH01 (Kilo-sheep-hour), MBS01 (Marine Biodiversity Stewardship), USS01 (Umbrella Species Stewardship). All with admin addresses and metadata IRIs.
- `list_credit_types()` → **5 credit types** with full definitions: BioTerra ("weighted 10m^2 score of long-term restoration/preservation"), Carbon ("metric ton CO2 equivalent"), KSH ("kilo-sheep-hour"), MBS ("generic quantification of marine biodiversity activities"), USS ("~1 hectare of umbrella species habitat stewarded for 1 year, composite index: USH + HQ + USpToC").
- `list_projects()` → **58 projects** with jurisdiction codes and metadata. First 20 include: BT01-001/002 (Colombia), C01-001/002/003 (DRC/Kenya/Peru), C02-001 through C02-012 (US states), C03-001/002/003 (Indonesia/Colombia/Cambodia).
- `compare_credit_methodologies(["C01","BT01","MBS01","USS01"])` → Returns structured comparison but methodology scores are zeroed (keyword-based metadata analysis). Market performance data sparse. Tool works but needs richer metadata for meaningful comparisons.
- Metadata IRI resolution: 3/4 test IRIs resolved successfully via `api.regen.network` with content hashes. One 404 (C01 class metadata IRI — possibly outdated).

**Registry Review MCP: PASS (validated Feb 7, 2026)**
- Added to `.mcp.json` with `uv --directory` command pointing to `/Users/darrenzal/projects/RegenAI/regen-registry-review-mcp`
- Server code verified: 20+ tools (session management, document processing, requirement mapping, evidence extraction, validation), 9 prompts (A-H workflow stages)
- **Validation results:**
  - `list_sessions()` — PASS: Returns 10 existing sessions (Botany Farm E2E tests + Test Project). Server responds correctly.
  - `list_example_projects()` — PASS: Responds correctly (no examples directory configured, returns clean empty result).
  - `create_session(project_name="BizDev Validation Test")` — PASS: Session `session-aaf1f435d3b1` created successfully with 23 requirements (soil-carbon-v1.2.2 methodology).
  - `get_mapping_status(session_id="session-4b3ba9e80357")` — PASS: Returns coverage metrics on existing completed session (23/23 requirements mapped, 100% coverage, 21 high confidence + 2 medium).
  - `get_mapping_status(session_id="session-aaf1f435d3b1")` — Expected error: "File not found: mappings.json" (no documents uploaded to new session). Server handles gracefully.
- Currently configured for `soil-carbon-v1.2.2` methodology. Demo governance review simulations use KOI-sourced registry handbook documentation (4-stage process, reviewer criteria) since biodiversity methodologies aren't pre-loaded.

**Decision: PROCEED** — All three MCP servers pass validation. KOI and Ledger pass decisively. Registry Review MCP is operational with 24 tools available.

### 1.2 Base System Prompt

`foundation/system-prompt.md` — The identity and capability definition that all client demos inherit.

**Core elements:**
- Agent identity: "You are a Regen Network business development agent specializing in registry readiness analysis for ecological assets."
- Available tools: KOI MCP (domain knowledge), Ledger MCP (on-chain data), Registry Review MCP (governance workflows)
- Output standards: Always produce structured artifacts, not narrative summaries. Tables, checklists, gap analyses, architecture diagrams over paragraphs.
- Provenance rules: Cite sources (KOI document IDs, Ledger query results, registry review criteria). Never fabricate registry data.
- Workflow awareness: The agent knows it has access to reusable workflows (deal dossier, credit class mapper, etc.) and can invoke them.

**Key design principle:** The system prompt should make the agent *obviously* tied to Regen's infrastructure. Every output should reference real registry data, real governance standards, or real methodology criteria. If the output could have been produced by ChatGPT with no tools, the prompt is wrong.

### 1.3 Deal Dossier Workflow

`foundation/workflows/deal-dossier.md` — Reusable across all prospects.

**Input:** Client data directory (prospect brief, call transcripts, memos, any docs)

**Output structure:**
```markdown
# Deal Dossier: [Client Name]

## Relationship Timeline
- [Date]: [Event/call summary, key people, key outcomes]

## Client Needs Assessment
| Need | Priority | Evidence (from their words) | Regen Capability |
|------|----------|---------------------------|-----------------|

## Open Items & Decisions Pending
- [ ] [Item] — Owner: [who], Status: [status]

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|

## Recommended Engagement Approach
[1-2 paragraphs with rationale]

## Draft Proposal Outline
1. [Section]
2. [Section]
...
```

**Why this works as table stakes:** It's impressive in a demo (surprising depth of preparation), but we don't claim it's the differentiator. It's the appetizer that earns attention for the registry outputs.

### 1.4 Credit Class Mapper Workflow

`foundation/workflows/credit-class-mapper.md` — **The core differentiator.** Reusable for any client bringing an asset concept to Regen.

**Input:** Description of an ecological asset or methodology (client's own framing)

**Process:**
1. Parse the asset description into dimensions (what ecological outcomes, what measurement methods, what verification approach)
2. Query KOI MCP for existing Regen credit methodologies that overlap
3. Query Ledger MCP for credit class structures and requirements
4. Map each asset dimension to the closest registry requirement
5. Identify gaps (dimensions with no matching requirement, requirements with no matching dimension)
6. Score registry readiness

**Output structure:**
```markdown
# Registry Readiness Assessment: [Asset Name]

## Asset Summary
[Parsed from client description]

## Credit Class Mapping
| Asset Dimension | Closest Regen Credit Class | Methodology Match | Status | Gap Description |
|----------------|--------------------------|-------------------|--------|----------------|
| [e.g., Soil carbon] | [From Ledger query] | [From KOI search] | ✅ Maps | — |
| [e.g., Biodiversity] | [No direct match found] | [Partial match] | ⚠️ Gap | Needs new credit class or methodology extension |

Note: Credit class IDs and methodology references must come from live Ledger/KOI queries. Never use fabricated IDs or external registry IDs (e.g., Verra VM codes).

## Registry Readiness Score: [X/10]

Scoring rubric:
- **Methodology coverage (0-5):** 5 = all dimensions map to existing credit classes; 3 = majority map with minor gaps; 1 = most dimensions require new methodology work; 0 = no existing coverage
- **Data/evidence completeness (0-5):** 5 = all required evidence types available and verifiable; 3 = most evidence available, some gaps fillable; 1 = major evidence gaps; 0 = no verifiable evidence provided

## Gaps & Required Actions
1. [Gap]: [What's needed to close it]
2. ...

## Recommended Pathway
[Which credit classes to target, what methodology work is needed, estimated timeline]

## Relevant Precedents
[From KOI: similar methodologies that went through review, governance discussions]
```

**Why this is defensible:** It requires live queries to KOI (methodology corpus) and Ledger (credit class schema). ChatGPT doesn't have access to Regen's registry structure or methodology review history. The output is only as good as the infrastructure behind it.

### 1.5 Governance Review Workflow

`foundation/workflows/governance-review.md` — Reusable for showing institutional process to any prospect.

**Input:** Methodology or asset concept (from credit class mapper output)

**Process:**
1. Query Registry Review MCP for review criteria and checklist
2. Query KOI for precedent reviews and common findings
3. Simulate a review: what would pass, what would be flagged, what evidence is missing

**Important: All outputs must include this disclaimer:**
> ⚠️ **Simulated Pre-Review.** This is an indicative assessment based on published Regen registry criteria and precedent reviews. It does not constitute a formal methodology review or approval. Actual review outcomes depend on the full submission and reviewer panel assessment.

**Output structure:**
```markdown
# Methodology Review Simulation: [Methodology Name]

> ⚠️ **Simulated Pre-Review.** This is an indicative assessment based on published Regen registry criteria and precedent reviews. It does not constitute a formal methodology review or approval.

## Review Checklist
| Criterion | Status | Finding |
|-----------|--------|---------|
| Scientific basis | ⚠️ | [Specific concern] |
| Additionality | ✅ | [Why it passes] |
| MRV feasibility | ❌ | [What's missing] |
| ...

## Reviewer Flags
1. [Specific issue a reviewer would raise]
2. ...

## Required Evidence
- [Evidence type]: [What needs to be provided]
- ...

## Estimated Review Timeline
[Based on precedents from KOI]
```

### 1.6 Verification Plan Workflow

`foundation/workflows/verification-plan.md` — Reusable for any client needing MRV infrastructure.

**Input:** Asset concept + credit class mapping (from earlier outputs)

**Output structure:**
```markdown
# Verification & MRV Plan: [Asset/Project Name]

## Verification Bodies
| Dimension | Recommended Verifier Type | Frequency |
|-----------|--------------------------|-----------|

## Data Requirements
| Data Type | Source | Format | Collection Frequency |
|-----------|--------|--------|---------------------|

## Monitoring Schedule
| Year | Activity | Deliverable |
|------|----------|-------------|

## Data Flow Architecture
[Client Platform] → [Data type] → [Regen Registry] → [Verification checkpoint]

```

### 1.7 Integration Blueprint Workflow

`foundation/workflows/integration-blueprint.md` — Reusable for any "registry as backend" client.

**Input:** Client platform description, integration requirements, technical constraints (from call transcripts / prospect brief)

**Output structure:**
```markdown
# Integration Blueprint: [Client Name] + Regen Registry

## Architecture Overview
[Client Platform] → [API Layer] → [Regen Registry] → [Verification/Attestation]

## Data Flow
| Step | Source | Data | Destination | Format |
|------|--------|------|-------------|--------|
| 1 | Field collection | Raw ecological data | Client platform | [Format] |
| 2 | Client platform | Processed metrics | Regen Registry API | JSON/Protobuf |
| 3 | Regen Registry | Attestation record | On-chain | Tx hash + resolver |

## API Touchpoints
| Endpoint | Purpose | Auth |
|----------|---------|------|
| [From Ledger MCP capabilities] | | |

## Key Management Approach
[Custodial vs non-custodial recommendation based on client requirements]

## Phased Implementation
| Phase | Duration | Deliverables |
|-------|----------|-------------|
| 1 | [X weeks] | [Specific outputs] |
| 2 | [X weeks] | [Specific outputs] |

## Technical Prerequisites
- [What the client needs to have in place]
- [What Regen needs to provide]
```

---

## Phase 2: Client-Specific Builds

### 2.1 Renew/RePlanet Demo

**`clients/renew-replanet/demo-config.md`** — System prompt overlay:
```markdown
## Client Context: Renew/RePlanet
You have access to the following client-specific documents:
- Prospect brief (Renew_RePlanet_Notes.txt)
- Mar 2025 call transcript with rePLANET (Regen_Network_rePLANET_otter_ai.pdf)
- Jan 2026 call transcript with Renew (Regen_Renew_otter_ai.pdf)

Key context:
- Renew wants Regen as BACKEND infrastructure (not front-facing)
- Their methodology is Wallacea Trust: 5 taxa, conservation-weighted scoring
- Tech lead Mark Moore cares about: key management, API integration, dev support
- They are evaluating other options — we need to demonstrate clear technical value
- They stack biodiversity credits on top of Verra carbon credits
```

**`clients/renew-replanet/mock-data/uk-restoration-biodiversity-survey.json`** — Sample dataset:
```json
{
  "project": "Oakwood Manor Restoration Site",
  "location": "Somerset, UK",
  "survey_date": "2025-09-15",
  "methodology": "Wallacea Trust v2.1",
  "taxa": [
    {
      "taxon": "3D Forest Structure",
      "metrics": {
        "canopy_cover_pct": 42,
        "understory_density": 3.2,
        "deadwood_volume_m3_ha": 8.5
      },
      "conservation_value": 3,
      "relative_abundance": 4
    },
    {
      "taxon": "Invertebrates",
      "metrics": {
        "species_richness": 47,
        "indicator_species_present": ["Stag Beetle", "White-clawed Crayfish"],
        "sampling_method": "pitfall_and_sweep"
      },
      "conservation_value": 4,
      "relative_abundance": 3
    },
    {
      "taxon": "Breeding Birds",
      "metrics": {
        "species_richness": 23,
        "red_list_species": ["Turtle Dove", "Cuckoo"],
        "territory_mapping": true
      },
      "conservation_value": 5,
      "relative_abundance": 3
    },
    {
      "taxon": "Bat Fauna",
      "metrics": {
        "species_richness": 8,
        "activity_index": 342,
        "roost_sites_confirmed": 2,
        "detector_type": "AudioMoth"
      },
      "conservation_value": 4,
      "relative_abundance": 2
    },
    {
      "taxon": "Higher Plants",
      "metrics": {
        "species_richness": 89,
        "native_pct": 78,
        "indicator_species": ["Bluebell", "Early Purple Orchid", "Wood Anemone"]
      },
      "conservation_value": 3,
      "relative_abundance": 4
    }
  ],
  "composite_score": 56.2,
  "baseline_score": 31.8,
  "change_pct": 76.7,
  "next_survey_due": "2027-09-15"
}
```

**`demos/renew-demo.md`** — Demo script (ordered prompts):
```markdown
# Renew/RePlanet Demo Script

## Setup
Load Claude project with:
- foundation/system-prompt.md (base)
- clients/renew-replanet/demo-config.md (overlay)
- All client docs from clients/renew-replanet/
- MCP tools: KOI, Ledger, Registry Review

## Demo Sequence

### Act 1: "We've Done Our Homework" (2 min)
PROMPT: "Synthesize everything we know about Renew from both calls and the
prospect brief. What are their top priorities, what's still unresolved, and
draft a proposal outline for a registry integration pilot."

EXPECTED: Deal Dossier with relationship timeline, needs assessment, open
items, draft proposal. Impressive but brief — move on quickly.

TRANSITION: "Now let me show you what's actually different about working
with our infrastructure..."

### Act 2: "Your Methodology Meets Our Registry" (3 min) — THE MONEY SHOT
PROMPT: "Map the Wallacea Trust 5-taxa methodology to Regen's credit class
requirements. Show me what aligns, what has gaps, and what evidence would be
needed for registry eligibility."

EXPECTED: Credit Class Mapper output — structured table with dimension-by-
dimension mapping, gap analysis, registry readiness score. Agent should use
KOI MCP to find relevant biodiversity methodologies and Ledger MCP to query
credit class structures.

WHY IT'S DIFFERENT: This output requires live queries to Regen's registry
infrastructure. No generic AI tool can produce this.

### Act 3: "Here's What Your Data Looks Like On-Chain" (3 min)
PROMPT: "Here's a sample biodiversity survey from a UK restoration site
[paste uk-restoration-biodiversity-survey.json]. Walk me through how this
data would be anchored on Regen Ledger — what gets hashed, what the
attestation record looks like, and how a third party like BFI could
independently verify it."

EXPECTED: Step-by-step data anchoring walkthrough referencing real Ledger
mechanics. Attestation structure, resolver pattern, verification pathway.

WHY IT'S DIFFERENT: Demonstrates the actual trust infrastructure Renew
asked for, using their kind of data.

### Act 4: "The Integration Path" (2 min)
PROMPT: "Draft a Phase 1 integration architecture for Renew using Regen as
backend infrastructure. Show the data flow from field collection through
their platform to our registry, including key management and attestation
checkpoints. Address Mark Moore's concerns about custodial key management
and developer support."

EXPECTED: Architecture doc with data flow diagram, API touchpoints, phased
milestones, key management approach.

### Close
"Everything you just saw — the methodology mapping, the data anchoring, the
governance checkpoints — these are outputs of our registry infrastructure,
not just AI synthesis. The agent is the delivery mechanism; the registry is
the product. We're proposing an 8-week sprint to build this integration
for real."

### Follow-Up (send same day)
8-week sprint proposal doc with scoped deliverables:
- Week 1-2: Wallacea Trust methodology → Regen credit class formal mapping
- Week 3-4: Data anchoring pilot (sample dataset → on-chain attestation)
- Week 5-6: API integration scaffold (Renew backend → Regen registry)
- Week 7-8: Attestation framework + BFI validation workflow
- Deliverables: Registry-ready methodology package, working API integration,
  attestation proof-of-concept, key management implementation plan
```

### 2.2 Landbanking Group Demo

**`clients/landbanking-group/demo-config.md`** — System prompt overlay:
```markdown
## Client Context: Landbanking Group
You have access to the following client-specific documents:
- Prospect brief (LandBanking_Group_Notes.txt)
- $REGEN Token alignment memo (landbanking_alignment_memo_REGEN_centric.pdf)
- Agile Tokenization alignment memo (landbanking_group_alignment_memo.pdf)

Key context:
- Landbanking has the "Landler" platform with its own AI assistant ("Va") — do NOT position this as an AI demo
- They create "Nature Equity Assets" — multi-dimensional nature outcomes as investable assets
- Their key gap is verification/MRV partners and registry infrastructure
- Named partners: Ritter Sport (cocoa), followfood (regen ag), African Parks (conservation)
- Notable backers: Andre Hoffmann (Roche), Prince of Liechtenstein — institutional credibility matters
- They're in narrative-building mode — need ecosystem legitimacy
- Two alignment memos exist — Agile Tokenization is the better first move
- Frame partnership as "exploratory, with clear learning goals"
```

**`clients/landbanking-group/mock-data/cocoa-nature-equity-asset.json`** — Sample asset:
```json
{
  "asset_name": "West African Cocoa Agroforestry Nature Equity",
  "partner": "Ritter Sport",
  "location": "Côte d'Ivoire / Ghana",
  "area_hectares": 2400,
  "methodology": "Landler Natural Capital Assessment v3",
  "dimensions": [
    {
      "dimension": "Carbon Sequestration",
      "metric": "tCO2e/ha/yr",
      "baseline_value": 2.1,
      "current_value": 5.8,
      "measurement": "Remote sensing + field sampling",
      "confidence": "high"
    },
    {
      "dimension": "Biodiversity",
      "metric": "Landler Biodiversity Index",
      "baseline_value": 0.32,
      "current_value": 0.58,
      "measurement": "eDNA + acoustic monitoring + visual surveys",
      "confidence": "medium"
    },
    {
      "dimension": "Soil Health",
      "metric": "Soil organic carbon (%)",
      "baseline_value": 1.4,
      "current_value": 2.1,
      "measurement": "Field sampling (0-30cm depth)",
      "confidence": "high"
    },
    {
      "dimension": "Water Regulation",
      "metric": "Infiltration rate (mm/hr)",
      "baseline_value": 12,
      "current_value": 28,
      "measurement": "Hydrological modeling + field validation",
      "confidence": "medium"
    },
    {
      "dimension": "Social Impact",
      "metric": "Farmer livelihoods index",
      "baseline_value": 0.41,
      "current_value": 0.67,
      "measurement": "Surveys + economic analysis",
      "confidence": "medium"
    }
  ],
  "composite_nature_equity_score": 72.4,
  "vintage_year": 2025,
  "monitoring_frequency": "annual",
  "verification_status": "unverified",
  "target_investors": ["impact_funds", "corporate_sustainability", "sovereign_wealth"]
}
```

**`demos/landbanking-demo.md`** — Demo script (ordered prompts):
```markdown
# Landbanking Group Demo Script

## Setup
Load Claude project with:
- foundation/system-prompt.md (base)
- clients/landbanking-group/demo-config.md (overlay)
- All client docs from clients/landbanking-group/
- MCP tools: KOI, Ledger, Registry Review

## Demo Sequence

### Act 1: "We've Analyzed Both Approaches" (2 min)
PROMPT: "Synthesize everything we know about Landbanking Group. Compare the
two alignment memo approaches — $REGEN Token vs Agile Tokenization. Which
should we lead with for a first engagement and why? Draft talking points for
a first call with Dr. Stuchtey."

EXPECTED: Deal Dossier with partnership assessment, head-to-head memo
comparison (recommend Agile first, $REGEN later), Stuchtey talking points.
Brief, impressive, move on.

TRANSITION: "Now let me show you what registry readiness actually looks
like for a Nature Equity Asset..."

### Act 2: "Nature Equity Meets Registry Standards" (3 min) — THE MONEY SHOT
PROMPT: "Here's a Nature Equity Asset from Landbanking's Ritter Sport cocoa
partnership [paste cocoa-nature-equity-asset.json]. Translate this into
Regen's credit class framework. Map each dimension to existing
methodologies, identify eligibility gaps, and generate a registry readiness
score."

EXPECTED: Credit Class Mapper output — dimension-by-dimension mapping
using actual credit class IDs and methodology names from live Ledger/KOI
queries (never fabricated IDs or external registry codes like Verra VM
numbers). Readiness score with rubric, gap analysis, recommended pathway.

WHY IT'S DIFFERENT: No generic AI tool can map "Nature Equity" to Regen's
specific credit class schema with real eligibility criteria. This requires
live infrastructure queries.

### Act 3: "What Governance Review Looks Like" (3 min)
PROMPT: "If Landbanking submitted this Nature Equity Asset methodology for
review on Regen's registry, what would the governance process look like?
What would reviewers flag? What evidence would be required to pass?"

EXPECTED: Governance Review simulation — clearly labeled as "Simulated
Pre-Review" — checklist with pass/flag/fail per criterion, specific
reviewer concerns (e.g., "Biodiversity Index is proprietary — needs
independent validation"), required evidence list, estimated timeline
based on precedents.

NOTE: Output must include simulation disclaimer. This is not an approval.

WHY IT'S DIFFERENT: This shows Regen as an institutional process with
standards and accountability. This is what Hoffmann and Liechtenstein-tier
investors care about. Landbanking's own AI can't simulate a review process
it doesn't participate in.

### Act 4: "The Verification Plan" (2 min)
PROMPT: "Draft a verification and MRV plan for this Nature Equity Asset.
Who validates each dimension, what data flows from Landler to Regen's
registry, and what's the monitoring schedule?"

EXPECTED: Concrete plan — verifier types per dimension, data flow (Landler
→ Regen), monitoring schedule.

### Close
"Landler does the measuring. Regen does the governing and verifying.
That's the partnership — your platform creates Nature Equity Assets, our
registry makes them credible and auditable for institutional investors.
We're proposing an 8-week sprint: credit class mapping, methodology
pre-review, MRV framework design, and first attestation."

### Follow-Up (send same day)
8-week sprint proposal doc with scoped deliverables:
- Week 1-2: Nature Equity Asset → Regen credit class formal mapping (start with cocoa/followfood)
- Week 3-4: Methodology pre-review against Regen governance standards
- Week 5-6: MRV framework design (Landler → Regen data flow specification)
- Week 7-8: First attestation proof-of-concept + verification plan
- Deliverables: Credit class eligibility report, methodology review
  readiness package, MRV integration spec, attestation prototype
```

---

## Phase 3: Build Order & Dependencies

```
Day 1 (Fri Feb 7) ✅ COMPLETE — ahead of schedule
├── 1.1 Validate MCP tools ✅ KOI PASS, Ledger PASS, Registry Review CONFIGURED
├── 1.2 Write base system prompt ✅
├── 1.3 Write deal dossier workflow ✅
├── 1.4 Write credit class mapper workflow ✅
├── 1.5 Write governance review workflow ✅
├── 1.6 Write verification plan workflow ✅
├── 1.7 Write integration blueprint workflow ✅
├── 2.1 Renew: demo-config.md + mock data ✅
├── 2.2 Landbanking: demo-config.md + mock data ✅
├── Demo scripts written (demos/*.md) ✅
└── Registry Review MCP added to .mcp.json ✅

Day 2 (Fri Feb 7 evening) ✅ COMPLETE
├── Validate Registry Review MCP ✅ PASS (all 4 tools tested, 24 tools available)
├── Renew golden outputs (4 acts) ✅ All quality checks pass
├── Landbanking golden outputs (4 acts) ✅ All quality checks pass
└── Quality review against demo script EXPECTED sections ✅ No iterations needed

Day 3 (Fri Feb 7 late evening) ✅ COMPLETE
├── Sprint proposals written (one per client) ✅
├── Expanded demo: platform-overview.md ✅
├── Expanded demo: knowledge-graph-demo.md ✅
├── Expanded demo: web-app-demo.md ✅
├── Updated renew-demo.md to 5 acts ✅
└── Updated landbanking-demo.md to 5 acts ✅

Day 4 (Mon Feb 10)
├── End-to-end timed run of both 5-act demos
├── Test Registry Review web app authentication
├── Record screen capture fallback for web app act
└── Prepare screenshots for offline fallback

Day 5 (Tue Feb 11)
├── Polish and rehearse
├── Internal review with Dave/Becca
├── Decide which client to present first
└── Demo day
```

### Dependencies

```
MCP Validation (1.1) ← blocks everything
    ↓
Base System Prompt (1.2) ← blocks all workflows
    ↓
    ├── Credit Class Mapper (1.4) ← blocks Act 2, Act 3 (governance), Act 4 (verification)
    │       ↓
    │   Governance Review (1.5) + Verification Plan (1.6)
    │
    ├── Deal Dossier (1.3) ← independent, can build in parallel
    │
    └── Integration Blueprint (1.7) ← independent, can build in parallel
                                      (Renew Act 3 data anchoring also independent)
    ↓
Client Configs (2.1, 2.2) ← blocks demo testing
    ↓
Demo Scripts + Testing (Day 3) + 8-Week Sprint Proposals
    ↓
Polish + Internal Review (Day 4)
```

Note: Deal Dossier, Integration Blueprint, and Renew's data anchoring walkthrough (Act 3) do NOT depend on the Credit Class Mapper. They can be built in parallel. This means if the mapper is hard, other outputs still make progress.

### Risk Mitigation

**Golden Output Strategy:** For each demo act, pre-compute a "golden output" during Day 2 using cached MCP tool runs. These serve as fallbacks if live tool queries are slow, empty, or inconsistent during the demo. The demo should always TRY to run live first — pre-cached outputs are the safety net, not the default. If a golden output is used, the presenter should say "let me show you what this produces" rather than pretending it's live.

**If MCP tools return sparse data for biodiversity/natural capital:**
- Fallback: Lean harder on KOI narrative synthesis for methodology knowledge, use Ledger for structural examples (even if not biodiversity-specific), and frame as "this is what the workflow produces — and it gets richer as more methodologies are registered"
- This is still differentiated because it shows the workflow and infrastructure integration, even with partial data
- Golden outputs from cached runs ensure the demo still works

**If credit class mapper doesn't produce convincing output:**
- Fallback: Pre-compute the mapping table using cached KOI/Ledger results, have the agent present and explain it rather than generate it fully live
- Still show the live MCP queries happening — even partial results demonstrate real infrastructure

**If we can't finish both clients by Feb 11:**
- Priority: Renew first (richer data, clearer technical requirements, further along in relationship)
- Landbanking can reuse 80% of the foundation, so it's fast to add after

---

## Biz-Dev Agent Evolution Path

What we build for Feb 11 is version 0.1 of the biz-dev agent. Here's how it grows:

**v0.1 (Feb 11)** — Manual: Claude project with system prompt + client docs + MCP tools. Demo scripts run manually.

**v0.2 (Feb-Mar)** — Semi-automated: Workflows formalized as reusable prompt chains. New client onboarding = drop docs in directory + run workflows. Deal dossier, credit class mapping, governance review generated automatically.

**v0.3 (Mar-Apr)** — Automated intake: Google Drive sensor auto-ingests new client docs into KOI. Agent monitors for new prospects and generates preliminary assessments. Dave/Becca review and refine rather than build from scratch.

**v1.0 (Q2)** — Full biz-dev agent: Prospect research, competitive analysis, registry readiness assessment, proposal generation, follow-up tracking. The "Chief Everything Officer" for Regen's BD team. Each client engagement produces artifacts that feed back into KOI, making the agent smarter for the next client.

### Reusable Components Across All Future Clients

| Component | Built For | Reusable How |
|-----------|-----------|-------------|
| Deal Dossier generator | Both | Any prospect with docs/transcripts |
| Credit Class Mapper | Both | Any asset concept → Regen registry |
| Governance Review sim | Both | Any methodology entering review (with simulation disclaimer) |
| Verification Plan | Both | Any project needing MRV design |
| Integration Blueprint | Renew (primary) | Any "registry as backend" client |
| Alignment Memo comparator | Landbanking | Any prospect with multiple engagement paths |
| 8-Week Sprint Proposal | Both | Template for scoping paid engagements |
| System prompt template | Both | Parameterize for any new client in minutes |
| Mock data templates | Both | Adapt for any asset type |
| Golden output cache | Both | Fallback artifacts for demo resilience |
