# Registry Review Web App Demo Script

_Reusable Act — insert into any client demo to showcase the web application_

**Duration:** 4 minutes
**Purpose:** Show production-grade tooling that clients would get as a fork for their workflows
**Key message:** "This is a production web app our team uses. For your engagement, we'd fork this into your-specific tooling. Your team uses the web interface; your AI agents use the same tools via MCP."
**URL:** https://regen.gaiaai.xyz (requires authentication)

---

## Setup

- Open browser with Registry Review app pre-loaded and authenticated
- Have a session with documents already uploaded (use existing "Botany Farm E2E" session or create fresh)
- If the app is inaccessible during demo, use screenshots as fallback (prepare these in advance)

---

## Demo Walkthrough

### Step 1: Dashboard Overview (30 sec)

**ACTION:** Open the app, show the dashboard/session list.

**SHOW:**
- Session list with project names
- Status indicators (in-progress, completed)
- Multiple sessions showing the tool is actively used

**SAY:** "This is our Registry Review application — React 19 frontend, FastAPI backend. It's the same tooling our team uses to evaluate credit methodologies against Regen's registry standards. For your engagement, we'd fork this with your branding and workflows."

### Step 2: Session Workspace (60 sec)

**ACTION:** Open an existing session (Botany Farm E2E or similar with populated data).

**SHOW:**
- Session workspace with methodology documents
- The requirement checklist panel
- Document viewer with annotations

**SAY:** "Each session is a methodology review workspace. The system has loaded the registry's requirement checklist — these are the actual criteria a methodology must meet. The AI has already started mapping document evidence to requirements."

### Step 3: Requirement Mapping (60 sec)

**ACTION:** Click through the requirement mapping view.

**SHOW:**
- Requirements list with status (mapped/unmapped/flagged)
- Evidence excerpts linked to specific requirements
- Confidence scores on mappings (high/medium/low)
- Coverage metrics: "23/23 requirements mapped, 100% coverage, 21 high confidence + 2 medium"

**SAY:** "The system maps document evidence to each registry requirement. Here you can see 23 requirements mapped with confidence scores. The AI extracts specific evidence passages and links them to criteria. A reviewer can accept, reject, or adjust each mapping. Two items flagged as medium confidence — those are where human judgment is needed."

### Step 4: PDF Annotation & Evidence (60 sec)

**ACTION:** Open the document viewer showing PDF annotation.

**SHOW:**
- PDF document with highlighted evidence regions
- Evidence extraction panel
- Link between highlighted text and the requirement it supports

**SAY:** "When a methodology document is uploaded, the system identifies evidence passages and highlights them directly in the PDF. Each highlight links to the specific requirement it supports. This is what institutional review looks like — traceable evidence, auditable decisions, clear coverage metrics."

### Step 5: The Fork Pitch (30 sec)

**SAY:** "For your engagement, we'd fork this application for your specific workflows. Your branding, your requirement checklists, your document templates. Your team uses the web interface; your AI agents access the same tools via MCP — the same 24-tool API that powers this app. That's the integration: humans and AI using the same infrastructure, the same evidence, the same governance standards."

---

## Transition to Next Act

> "So that's the full stack — a knowledge graph with 48K+ documents, a production web application for methodology review, and AI agents that query both. Now let me bring it all together with your specific integration path..."

---

## Fallback Strategy

If the web app is inaccessible during demo:
1. **Primary fallback:** Pre-recorded screen capture (record walkthrough on demo morning)
2. **Secondary fallback:** Screenshots of each step above, presented as slides
3. **Narrative fallback:** Describe the workflow while showing the MCP tool outputs that power it:
   - `list_sessions()` → show session data
   - `get_mapping_status()` → show coverage metrics (23/23 mapped, 21 high + 2 medium)
   - Explain: "The web app is a UI on top of this same API"

**Always test the app on demo morning.** Load the session, confirm authentication works, verify data is populated.

---

## Client-Specific Framing

### For Renew/RePlanet
> "Mark asked about developer support and API integration. This is what that looks like in practice — a production web app backed by a 24-tool API. The same API your systems would integrate with."

### For Landbanking Group
> "This is the kind of institutional tooling that Hoffmann and Liechtenstein-tier investors want to see. Not a chatbot — a governance review platform with traceable evidence and auditable decisions. Va does the measuring; this does the governing."
