# Pre-Demo Checklist

## 24 Hours Before
- [ ] Confirm internet connection at demo venue (hotel WiFi, hotspot backup)
- [ ] Test live site: https://regen.gaiaai.xyz/bizdev/ (auth: demo / regen2026)
- [ ] Open each client dashboard — verify counters animate, no console errors
- [ ] Open Explorer page — verify auto-query fires and returns results within 5 seconds
- [ ] Click "View Supporting Evidence" on at least one dashboard section — verify drawer opens
- [ ] Review the demo script for your target client (`demos/renew-demo.md` or `demos/landbanking-demo.md`)
- [ ] Have golden outputs folder open: `clients/<client>/golden-outputs/`

## 1 Hour Before
- [ ] Hard refresh the landing page (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] Verify Track Record section shows: 78 batches, 58 projects, 13 credit classes
- [ ] Test Knowledge Explorer with client-specific query
- [ ] Close all other browser tabs (cleaner demo, fewer distractions)
- [ ] Silence phone, close Slack/email

## Critical Reminders
- **Renew:** Lead with data integrity and Mark Moore's trust concerns. Act 3 (data anchoring) is the strongest moment.
- **Landbanking:** Do NOT position as AI demo. "Landler measures. Regen governs and verifies." Act 3 (governance review) shows real consulting value.
- **If APIs are slow (>3 sec):** Say "The track record data loads live from the blockchain — let me show you the prepared analysis while that completes." Switch to golden outputs.
- **If KOI is down:** Skip Explorer, go straight to client dashboard. Evidence drawers will show cached results.
- **If everything fails:** Golden outputs in `clients/*/golden-outputs/` contain the full analysis. Paste act2 into a Claude conversation and walk through it live.

## Fallback Priority
1. Live web app (best case)
2. Golden outputs pasted into Claude Desktop conversation
3. Golden outputs shown as markdown files (worst case, still professional)
