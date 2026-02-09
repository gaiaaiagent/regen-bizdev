# Registry Review Web App Demo Script

_Reusable Act — insert into any client demo to showcase the web applications_

**Duration:** 4-5 minutes
**Purpose:** Show production-grade tooling that clients would get as a fork for their workflows
**Key message:** "These are production web apps our team uses. For your engagement, we'd fork these into your-specific tooling. Your team uses the web interface; your AI agents use the same tools via MCP."

**URLs:**
- BizDev Intelligence Dashboard: `https://regen.gaiaai.xyz/bizdev/` (basic auth: `demo` / `regen2026`)
- Registry Review App: `https://regen.gaiaai.xyz` (requires authentication)

---

## Setup

- Open BizDev dashboard pre-loaded in browser (`regen.gaiaai.xyz/bizdev/`)
- Open Registry Review app pre-loaded and authenticated in a second tab
- Have a Registry Review session with documents already uploaded (use existing "Botany Farm E2E" session or create fresh)
- If either app is inaccessible during demo, use screenshots as fallback (prepare these in advance)

---

## Demo Walkthrough

### Part A: BizDev Intelligence Dashboard (2 min)

#### Step 1: Live Infrastructure (30 sec)

**ACTION:** Open `https://regen.gaiaai.xyz/bizdev/`. Counters animate from zero.

**SAY:** "This is our business intelligence dashboard — React 19 frontend querying live infrastructure. Those counters just fetched real data from our knowledge graph and the Regen Ledger. 69,000 documents. 13 credit classes on-chain."

#### Step 2: Knowledge Explorer (60 sec)

**ACTION:** Navigate to `/bizdev/explore`. Auto-fires a query.

**SHOW:**
- Search results with source badges (Discourse, GitHub, Notion, etc.)
- Entity graph with typed nodes and click-to-navigate

**SAY:** "This is the Knowledge Explorer — type any question about ecological credits, and the system searches 69,000 documents, resolves entities, and shows you the relationship graph. Every result is sourced. Every connection is traceable."

**ACTION:** Click an entity node. Graph re-centers.

#### Step 3: Client Dashboard (30 sec)

**ACTION:** Navigate to a client dashboard (Renew or Landbanking). Show credit class mapping tab.

**SHOW:**
- Mapping table with green "On-chain" badges
- Evidence drawer opening with live KOI documents

**SAY:** "Each client gets a dedicated analysis dashboard. Credit class IDs verified live on Regen Ledger. Evidence panels backed by the knowledge graph. This is the tooling your team would use."

---

### Part B: Registry Review Application (2-3 min)

#### Step 4: Dashboard Overview (30 sec)

**ACTION:** Switch to the Registry Review app tab. Show the dashboard/session list.

**SHOW:**
- Session list with project names
- Status indicators (in-progress, completed)
- Multiple sessions showing the tool is actively used

**SAY:** "This is our Registry Review application — React 19 frontend, FastAPI backend. It's the same tooling our team uses to evaluate credit methodologies against Regen's registry standards. For your engagement, we'd fork this with your branding and workflows."

#### Step 5: Session Workspace (60 sec)

**ACTION:** Open an existing session (Botany Farm E2E or similar with populated data).

**SHOW:**
- Session workspace with methodology documents
- The requirement checklist panel
- Document viewer with annotations

**SAY:** "Each session is a methodology review workspace. The system has loaded the registry's requirement checklist — these are the actual criteria a methodology must meet. The AI has already started mapping document evidence to requirements."

#### Step 6: Requirement Mapping (60 sec)

**ACTION:** Click through the requirement mapping view.

**SHOW:**
- Requirements list with status (mapped/unmapped/flagged)
- Evidence excerpts linked to specific requirements
- Confidence scores on mappings (high/medium/low)
- Coverage metrics: "23/23 requirements mapped, 100% coverage, 21 high confidence + 2 medium"

**SAY:** "The system maps document evidence to each registry requirement. Here you can see 23 requirements mapped with confidence scores. The AI extracts specific evidence passages and links them to criteria. A reviewer can accept, reject, or adjust each mapping. Two items flagged as medium confidence — those are where human judgment is needed."

#### Step 7: The Fork Pitch (30 sec)

**SAY:** "For your engagement, we'd fork both applications for your specific workflows. Your branding, your requirement checklists, your document templates. Your team uses the web interfaces; your AI agents access the same tools via MCP — the same APIs that power these apps. That's the integration: humans and AI using the same infrastructure, the same evidence, the same governance standards."

---

## Transition to Next Act

> "So that's the full stack — a knowledge graph with 69K+ documents queryable through a live web interface, a production application for methodology review, and AI agents that query both. Now let me bring it all together with your specific integration path..."

---

## Fallback Strategy

**BizDev dashboard fallbacks:**
- **Counters don't animate:** API may be down. Pages show graceful error states. Move to Registry Review app.
- **Explorer no results:** Say: "The knowledge graph is warming up" and show client dashboard tabs instead.
- **Evidence drawers empty:** Skip and explain they pull live from the knowledge graph in production.

**Registry Review app fallbacks:**
1. **Primary fallback:** Pre-recorded screen capture (record walkthrough on demo morning)
2. **Secondary fallback:** Screenshots of each step above, presented as slides
3. **Narrative fallback:** Describe the workflow while showing the MCP tool outputs:
   - `list_sessions()` → show session data
   - `get_mapping_status()` → show coverage metrics (23/23 mapped, 21 high + 2 medium)
   - Explain: "The web app is a UI on top of this same API"

**Always test both apps on demo morning.** Load sessions, confirm authentication works, verify data is populated.

---

## Client-Specific Framing

### For Renew/RePlanet
> "Mark asked about developer support and API integration. This is what that looks like in practice — production web apps backed by live APIs. The same APIs your systems would integrate with."

### For Landbanking Group
> "This is the kind of institutional tooling that Hoffmann and Liechtenstein-tier investors want to see. Not a chatbot — a governance review platform with traceable evidence and auditable decisions, plus a live intelligence dashboard. Va does the measuring; this does the governing."
