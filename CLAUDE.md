# Regen AI Business Development

## Project Purpose

This repo contains the business development toolkit for RegenAI — a configured Claude agent with workflows that produce registry-grade artifacts for pilot clients using Regen's MCP infrastructure (KOI + Ledger + Registry Review). Not a chatbot. A reusable biz-dev agent seed.

## Current Status (Feb 7, 2026)

**Phase 1 COMPLETE** — All foundation files and client configs written. MCP validation passed.

**Next steps** → See `BUILD_PLAN.md` § "Implementation Status & Next Steps"

## Key Context

- **Parent project**: `/Users/darrenzal/projects/RegenAI/`
- **Obsidian note**: `Projects/RegenAI Custom Agent BizDev Overview`
- **Notion scope doc**: https://www.notion.so/regennetwork/Regen-AI-Business-Development-Sprint-2ef25b77eda18074904af8b49d76e38a
- **Full build plan**: `BUILD_PLAN.md` (architecture, workflows, MCP validation results, next steps)

## Pilot Clients

### Renew/RePlanet
- UK-based nature data & intelligence company
- Focus: landscape-scale ecological restoration
- Alignment: They do upstream (intelligence, prioritization), Regen does downstream (methodologies, registries, markets)
- Drive folder ID: `1toVpKZaP3DpL31nwA54dTZLlcLxFXXzQ`

### Landbanking Group
- Munich-based natural capital fintech (founded 2022, ~$15M raised)
- Focus: measuring, managing, valuing natural capital via "Landler" platform
- Alignment: MRV verification, registry infrastructure, regenerative asset standards
- Drive folder ID: `1lbVENpjChnvpvKfL0wyC4l8CmkIliXUV`

## MCP Tools

Three MCP servers power the demo workflows:

| Server | Prefix | Key Tools | Status |
|--------|--------|-----------|--------|
| **KOI** | `mcp__plugin_koi_regen-koi__` | `search`, `search_github_docs`, `resolve_metadata_iri`, `resolve_entity` | Validated, 68K+ docs |
| **Ledger** | `mcp__plugin_ledger_regen-network__` | `list_classes`, `list_credit_types`, `list_projects`, `list_credit_batches`, `compare_credit_methodologies` | Validated, 13 classes, 58 projects |
| **Registry Review** | `registry-review` (in `.mcp.json`) | `create_session`, `map_all_requirements`, `extract_evidence`, `get_mapping_status` | Configured, needs session validation |

Registry Review MCP was added to `/Users/darrenzal/projects/RegenAI/.mcp.json` on Feb 7. It uses `uv --directory` to run from `/Users/darrenzal/projects/RegenAI/regen-registry-review-mcp`.

## Directory Structure

```
regen-bizdev/
├── foundation/                    # Shared biz-dev agent infrastructure
│   ├── system-prompt.md           # Base system prompt for all demos
│   ├── workflows/                 # 5 reusable workflow definitions
│   │   ├── deal-dossier.md        # Prospect synthesis → proposal outline
│   │   ├── credit-class-mapper.md # Asset concept → registry mapping + gaps (CORE DIFFERENTIATOR)
│   │   ├── governance-review.md   # Methodology → review simulation (with disclaimer)
│   │   ├── verification-plan.md   # Asset → MRV plan + data flow
│   │   └── integration-blueprint.md # Backend integration architecture
│   └── mock-data/                 # Template datasets
│       ├── biodiversity-survey-template.json
│       └── nature-equity-asset-template.json
├── clients/
│   ├── renew-replanet/            # Prospect brief, Otter transcripts, PDFs, demo-config.md, mock-data/
│   └── landbanking-group/         # Prospect brief, alignment memos, demo-config.md, mock-data/
├── demos/
│   ├── renew-demo.md              # 4-act demo script with presenter notes + fallbacks
│   └── landbanking-demo.md        # 4-act demo script with presenter notes + fallbacks
├── BUILD_PLAN.md                  # Full plan + MCP validation results + next steps
└── CLAUDE.md                      # This file
```

## Key Registry Data (from validation)

- **13 credit classes**: C01-C09 (Carbon), BT01 (BioTerra), KSH01, MBS01 (Marine Biodiversity), USS01 (Umbrella Species)
- **5 credit types**: Carbon (tCO2e), BioTerra (weighted 10m^2), KSH (kilo-sheep-hour), MBS, USS
- **58 projects** across Colombia, DRC, Kenya, Peru, US, Indonesia, Cambodia
- **4-stage review process**: Initial submission → Internal review (3 wks) → Expert peer review → Public comment
- **Data anchoring**: `regen/data/v1` module — MsgAnchorData, MsgAttest, metadata IRI resolution

## Google Drive Access

Service account: `rag-ingestion-bot@koi-sensor.iam.gserviceaccount.com`

```bash
# Get access token
gcloud auth print-access-token \
  --impersonate-service-account=rag-ingestion-bot@koi-sensor.iam.gserviceaccount.com \
  --scopes=https://www.googleapis.com/auth/drive.readonly

# List folders
curl -H "Authorization: Bearer $TOKEN" \
  'https://www.googleapis.com/drive/v3/files?q=mimeType="application/vnd.google-apps.folder"'
```

## Team

- **Darren** - KOI development, Drive sensor, demo engineering
- **Shawn** - Registry Review Agent, lightweight Claude MD approach
- **Dave/Becca** - Client curation, user journey, story mapping
- **Gregory** - Strategy, partnerships

## Milestones

- **Feb 11** - Biz dev front-end MVP
- **Feb 17-19** - GreenBiz 26 (Phoenix) - potential joint presence
