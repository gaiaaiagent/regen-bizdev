# New Client Dashboard — Spinning Checklist

Target: ~45 minutes once client data is prepared.

## Prerequisites

- [ ] Client documents collected (Google Drive folder or direct upload)
- [ ] Client persona determined: **supply-side** (project developer) or **buy-side** (CSO/corporate)
- [ ] At least 1 credit class match identified
- [ ] Executive summary written (2-3 sentences)

## Step-by-Step

### 1. Ingest client docs into KOI (~10 min)

Service account: `rag-ingestion-bot@koi-sensor.iam.gserviceaccount.com`

Share the client's Google Drive folder with the service account, then run ingestion. This makes client-specific documents searchable in the dashboard's KOI panels.

### 2. Create client data file (~15 min)

```bash
cp web/src/data/template.ts web/src/data/{clientslug}.ts
```

Fill in required fields (search for `TODO`). **Minimum viable:**
- Org name, slug, tagline
- 1 credit class mapping with status
- Readiness score (overall + 3-4 components + pathForward)
- 3 talking points
- Executive summary

### 3. Create dashboard pages (~10 min)

```bash
cp -r web/src/pages/_template web/src/pages/{clientslug}
```

In each copied file:
- Replace `../../data/template` imports with `../../data/{clientslug}`
- Update component names (e.g., `TemplateDashboard` → `{Client}Dashboard`)
- Choose Act 3 variant: `DataAnchoring` (supply) or `GovernanceReview` (institutional)
- Choose Act 4 variant: `IntegrationBlueprint` (supply) or `VerificationPlan` (institutional)
- For Act 3/4, copy the corresponding component from `renew/` or `landbanking/`

### 4. Add route to App.tsx (~1 line)

```tsx
import { ClientDashboard } from './pages/{clientslug}/{Client}Dashboard';
// ...
<Route path="{clientslug}" element={<ClientDashboard />} />
```

### 5. Add client to landing page (~10 lines)

In `web/src/pages/Landing.tsx`, add a button/card linking to `/{clientslug}`.

### 6. Add demo chips to DashboardQuery.tsx (~5 lines)

```tsx
// In CHIPS record:
{clientslug}: [
  { label: 'Topic 1', query: 'KOI-optimized question about topic 1' },
  { label: 'Topic 2', query: 'KOI-optimized question about topic 2' },
  { label: 'Topic 3', query: 'KOI-optimized question about topic 3' },
],
```

Also update the `DashboardQueryProps` type to accept the new client slug, and add the client's `scoreBreakdown` import to `ReadinessBreakdown.tsx`.

### 7. Add explorer suggestions (~5 lines)

In `web/src/pages/Explorer.tsx`, add to `CLIENT_SUGGESTIONS`:

```tsx
{clientslug}: [
  'relevant search term 1',
  'relevant search term 2',
  'relevant search term 3',
],
```

### 8. (Optional) Add demo walkthrough steps (~80-150 lines)

In `web/src/data/demoSteps.ts`, add automated demo steps for DemoRunner.

### 9. Build and deploy (~5 min)

```bash
cd web && npm run build
rsync -avz dist/ darren@202.61.196.119:/opt/projects/regen-bizdev-web/
```

### 10. Verify

- [ ] Dashboard loads at `https://regen.gaiaai.xyz/bizdev/{clientslug}`
- [ ] All 4 tabs render without errors
- [ ] Readiness score and breakdown display correctly
- [ ] DashboardQuery chips return results
- [ ] Evidence drawers open with relevant KOI results
- [ ] Live Infrastructure Data section shows ledger stats

## Files Modified (Summary)

| File | Change |
|------|--------|
| `web/src/data/{clientslug}.ts` | NEW — client data |
| `web/src/pages/{clientslug}/*.tsx` | NEW — dashboard pages (3-5 files) |
| `web/src/App.tsx` | Add route (+1 line) |
| `web/src/pages/Landing.tsx` | Add client card (+10 lines) |
| `web/src/components/DashboardQuery.tsx` | Add CHIPS + update type (+8 lines) |
| `web/src/components/ReadinessBreakdown.tsx` | Add client data import (+5 lines) |
| `web/src/pages/Explorer.tsx` | Add CLIENT_SUGGESTIONS (+5 lines) |
| `web/src/data/demoSteps.ts` | Optional: demo walkthrough (+80-150 lines) |
