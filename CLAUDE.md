# Regen AI Business Development

## Project Purpose

This repo contains the business development toolkit for RegenAI - custom AI agents for clients in regenerative finance and ecological monitoring. The goal is to create "Chief Everything Officer" agents for pilot clients that combine Regen's domain expertise with client-specific data.

## Key Context

- **Parent project**: `/Users/darrenzal/projects/RegenAI/`
- **Obsidian note**: `Projects/RegenAI Custom Agent BizDev Overview`
- **Notion scope doc**: https://www.notion.so/regennetwork/Regen-AI-Business-Development-Sprint-2ef25b77eda18074904af8b49d76e38a

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

## Architecture

The biz dev MVP uses:
1. **KOI MCP** - Regen domain knowledge (48K+ docs)
2. **Ledger MCP** - On-chain credit data, governance, marketplace
3. **Client data** - Downloaded from Google Drive (prospect briefs, call transcripts)
4. **Claude Desktop/Code projects** - Pre-loaded with client context + MCP tools

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

## Directory Structure

```
regen-bizdev/
├── clients/              # Client-specific data (gitignored - sensitive)
│   ├── renew-replanet/   # Prospect brief, Otter transcripts, PDFs
│   └── landbanking-group/# Prospect brief, alignment memos
├── demos/                # Demo configs, Claude project setups
├── docs/                 # Strategy docs, playbooks
└── tasks/                # Task tracking, sprint planning
```

## Team

- **Darren** - KOI development, Drive sensor, demo engineering
- **Shawn** - Registry Review Agent, lightweight Claude MD approach
- **Dave/Becca** - Client curation, user journey, story mapping
- **Gregory** - Strategy, partnerships

## Milestones

- **Feb 11** - Biz dev front-end MVP
- **Feb 17-19** - GreenBiz 26 (Phoenix) - potential joint presence
