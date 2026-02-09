# Pipeline Activation: Stop Polishing, Start Closing

_Generated Feb 9, 2026. Materials are good enough for a first meeting. Get one meeting scheduled before building anything else._

---

## 1. Questions for Dave (Priority: Immediate)

Dave and Becca are coordinating client outreach and demos. These are the questions we need answers to before drafting any outreach:

### GreenBiz 26 (Feb 17-19, Phoenix) — 8 days away

> **Research result: None of our target prospects appear to be attending.** Web search of the full 341-speaker list, exhibitor directory, and sponsor pages found no presence from Ponterra, Batis, Renew/RePlanet, Landbanking Group, or Regen Network. GreenBiz 26 is heavily skewed toward large US corporates (Disney, GM, REI, Salesforce) and Big 4 consulting firms.
>
> **One actionable contact:** Scott Greenberg (Sr. Director of Marketing and Business Development, Verra) is attending as an individual — NOT speaking or exhibiting. Given our "Complementary, Not Competing" framing, this could be a useful conversation.

1. **Is anyone from the team attending GreenBiz 26?** Gregory, Dave, Becca, Darren — who's going? This was flagged as needing a decision in the Feb 3 meeting but wasn't discussed. Given no prospects are confirmed, the in-person meeting opportunity is limited — but the Verra contact and the Regenerating Nature track sessions could still be valuable networking.

2. **If anyone IS going:** Relevant sessions to attend:
   - "Diamonds in the Rough: How to Secure High-Quality Carbon Credits" (Wed 1:30-2:30pm, ERM-sponsored)
   - "Nature and Biodiversity Pathways" (Wed 1:30-2:30pm)
   - "Navigating the Latest in Nature Disclosures and Reporting" (Wed 4:30-5:30pm, CDP/TNFD)

3. **Strategy implication:** Since prospects aren't at GreenBiz, we proceed with email outreach. No need to wait.

### Pipeline Status

4. **What's the current status with Batis?** Our research found "Batis Foundation" (batisbatis.org) — a Colombian environmental research center in Puerto Colombia, Atlantico that does environmental offsets and carbon credits. But we're not sure this is the same "Batis" from the curated prospect list. Can you confirm which company this is and whether we have a contact?

5. **What's the current status with Ponterra?** **Important correction:** Our critical analysis said "Ponterra publicly references Regen" — but web research found **no mention of Regen Network** on Ponterra's website, news page, or FAQ. They use **Verra VCS VM0047** exclusively. Also: Ponterra is London-based operating in **Panama** (not New Zealand as our analysis stated). A detailed prospect summary already exists at `bd-prospects/Ponterra/Ponterra-summary.md`. The SD VISta biodiversity credit pilot may be an entry point. Contact: hello@ponterra.eco.

6. **Which prospects are closest to scheduling a call?** Not warmest relationship — closest to having a meeting on the calendar. We have demo-ready materials for any prospect; what we don't have is a conversation.

### Revenue Split Confirmation

7. **Has the revenue split been discussed with Gregory since the Feb 3 meeting?** The meeting notes showed unresolved tension: Jan 27 discussion mentioned 50/50, but the written "Next Stage" doc shows 70/30. We're working with **50/50 default, custom per client** as the baseline. Does Gregory agree?

---

## 2. Jaguar/Verifit Case Study (70% Version)

_What we can prove from public on-chain data. The 30% gap (registrant's perspective) is flagged._

> **NOTE:** This section will be populated with data from KOI and Ledger queries. Research is in progress — see below for what we're looking for.

### ERA Brazil × Verifit: Jaguar Conservation Credits on Regen Registry

_A completed registrant journey — from methodology creation to verified credit issuance._

---

**Who:** [ERA Brazil](https://www.erabrazil.com/) (methodology developer) + [Instituto Homem Pantaneiro](https://www.institutohomempantaneiro.org.br/) (project operator, NGO dedicated to Pantanal preservation) + [Verifit](https://verifit.com.br/) (independent verifier, 18+ years experience, 800+ carbon assessments across 20+ countries)

**What:** USS01 — Umbrella Species Stewardship biodiversity credit class. Uses jaguar as the umbrella species: protecting jaguar habitat protects the entire ecosystem. Methodology measures conservation through three components: population dynamics (Umbrella Species Health), ecosystem composition (Habitat Quality), and community-driven Theory of Change.

**Where:** Serra do Amolar, Mato Grosso do Sul, Brazil — **40,613 hectares** of Pantanal wetland (the world's largest inland wetland).

**Timeline:**

| Date | Milestone |
|------|-----------|
| Jan 2021 | Project operations begin (USS01-001) |
| ~2022 | ERA Brazil develops USS methodology (V2.2) |
| ~2023 | USS01 credit class created on Regen Ledger through governance process |
| Jan 2025 | Verifit completes Validation & Verification Report |
| **Feb 21, 2025** | **3 credit batches issued** (vintages 2021, 2022, 2023) |

**On-Chain Records (verified via Regen Ledger):**

| Batch | Vintage | Issued | Status |
|-------|---------|--------|--------|
| USS01-001-20210101-20211231-001 | 2021 | Feb 21, 2025 | Closed |
| USS01-001-20220101-20221231-002 | 2022 | Feb 21, 2025 | Closed |
| USS01-001-20230101-20231231-003 | 2023 | Feb 21, 2025 | Closed |

**Infrastructure Used:**
- Data anchoring: All project metadata content-addressed on Regen Ledger via IRIs
- Verification: Verifit's report permanently anchored on-chain (`regen:114Zqeh...pdf`)
- Monitoring: Okala (independent monitor)
- Registry: [app.regen.network/project/USS01-001](https://app.regen.network/project/USS01-001)

**Replication:** The model was replicated in Ecuador — **USS01-002** (Biocultural Jaguar Credits) with the Sharamentsa Community of the Achuar Nation, 10,200 hectares of tropical forest. Batch issued July 25, 2025. This second project adds indigenous cultural preservation as a co-benefit.

**Key Proof Points for Prospects:**
- End-to-end journey from methodology development to credit issuance — **completed**
- Independent third-party verification (Verifit) with verification report permanently on-chain
- Multi-year vintage coverage with retroactive issuance
- Model successfully replicated in a second country (Ecuador) with different project type
- All data independently verifiable via Regen's content-addressed metadata

---

### What's Missing (The 30% Gap)

These require direct cooperation from ERA Brazil, IHP, or Verifit:

- **Registrant's perspective:** How long did the registration process take? What was hard?
- **Cost data:** What did registration, verification, and monitoring cost?
- **Credit quantities:** Specific number of credits per batch (not exposed through current API endpoints)
- **Revenue outcomes:** Credit pricing, sales volume, buyer identities
- **Governance timeline:** How long USS01 class approval took through Regen's 4-stage process
- **Comparison:** How this experience compared to Verra/Gold Standard for Verifit

_We flag these gaps honestly rather than fabricate data. The on-chain proof points are strong enough for initial outreach. Filling the 30% gap requires a conversation with ERA Brazil or Verifit._

---

## 3. Carbon Governance Question (For Gregory / Registry Team)

### The Question

> Both sprint proposals (Renew and Landbanking) assume that a project registering carbon credits under an **existing** C-class (C01-C09) can skip the full governance review and proceed directly to project registration and credit issuance. The proposals estimate this takes ~4-8 weeks after the sprint.
>
> **Is this correct?** Specifically:
>
> 1. If a new registrant (e.g., Landbanking's cocoa agroforestry project) wants to issue carbon credits using an existing approved methodology under C01-C09, do they need to go through the 4-stage governance review process?
> 2. Or is governance review only required when proposing a **new** credit class or **new** methodology?
> 3. What is the actual timeline from "sprint complete" to "first carbon credit issued" for a project using an existing class?
>
> This affects both proposals' timelines and is the single biggest assumption we haven't validated.

### Why This Matters

Both sprint proposals show this timeline:
```
Discovery Sprint (2 wks) → Registry Sprint (8 wks) → Carbon Credits Live (~Month 4)
```

If carbon **does** require governance review, the timeline becomes:
```
Discovery Sprint (2 wks) → Registry Sprint (8 wks) → Governance Review (24-38 wks) → Carbon Credits Live (~Month 12)
```

### If Governance IS Required — This Is the Better Product

**Frame this as an opportunity, not a setback:**

- **"Governance Readiness Assessment"** is a more defensible discovery sprint scope than "credit class mapping." It's harder for the client to do themselves.
- The engagement becomes deeper and longer — **higher revenue per client**.
- "We help you prepare the strongest possible governance submission" positions Regen as essential infrastructure, not optional tooling.
- Both proposals need timeline rewrites, but the value proposition gets stronger: you're not just mapping credits, you're navigating a real institutional process.

**Contingency framing for Gregory:**
> "If governance review is required for carbon on existing C-classes, that actually strengthens our consulting value. The discovery sprint becomes a governance readiness assessment — we're the only ones who know the review criteria, the reviewer expectations, and the common failure modes. That's worth more than credit class mapping."

---

## 4. Outreach Drafts

_Strategy depends on GreenBiz answer (Question #1 above). These drafts work for both email and in-person intro._

### 4a. Ponterra — Registry Fit Assessment

**Why Ponterra:** Microsoft is their buyer. 3.2Mt carbon removal project (ARC Restaura Azuero, Panama). High-profile press coverage (Reuters, FT, Bloomberg, WSJ). They're piloting Verra's SD VISta biodiversity methodology — and frustrated with Verra bottlenecks (per prospect summary). London HQ, Panama operations.

**Correction from earlier analysis:** Ponterra does NOT publicly reference Regen. This is a **cold outreach**, not a warm reconnection. They use Verra VCS VM0047 exclusively. The angle is: "Regen's biodiversity credit class (BT01) already has credits issued — 24 months ahead of where SD VISta typically delivers."

> **Subject:** Biodiversity Credit Infrastructure for Ponterra's Reforestation Projects
>
> Hi [contact name — check with Dave],
>
> Ponterra's ARC project in Panama — 3.2 million tonnes of carbon removal across 75+ native species — sounds like it generates biodiversity outcomes well beyond what a carbon credit captures.
>
> Regen Network has the only operational biodiversity credit class on a public registry (BT01 — 2 active projects already issuing credits in Latin America). We've also issued 78 carbon credit batches across 58 projects. If you're exploring how to capture biodiversity value alongside your Verra carbon credits, our registry infrastructure could complement what you're already doing — not replace it.
>
> Would a 30-minute **Registry Fit Assessment** be useful? We'd map ARC's biodiversity outcomes against our credit class framework and give you a clear answer on whether dual-registry issuance (Verra for carbon, Regen for biodiversity) makes sense for your projects.
>
> [Attached: ERA Brazil case study — a completed biodiversity registrant journey on Regen]

**Key framing:** "Complement Verra, not replace it." Ponterra is committed to Verra for carbon — the opportunity is the biodiversity co-benefits they're currently leaving on the table.

### 4b. Batis — Registry Fit Assessment

**Why Batis:** Colombia-based habitat banks with a secured buyer. Clear transaction path. But the connection may be cold — need to check with Dave on contact warmth.

> **Subject:** Biodiversity Credit Infrastructure for Batis Habitat Banks
>
> Hi [contact name],
>
> Regen Network has the only live biodiversity credit class on a public registry — BT01 (BioTerra), with 2 active projects already issuing credits in Colombia (Antioquia and Cundinamarca). Your habitat bank model maps well to this framework, and the Colombian regulatory context (habitat banks as biotic offset mechanisms) aligns with what BT01 was designed for.
>
> We're offering a **Registry Fit Assessment** — a 30-minute call where we map your biodiversity data against our credit class requirements and give you a clear answer on whether Regen's registry is the right infrastructure for your credits. We've issued 78 credit batches across 58 projects in 13+ countries over 4 years — including the first voluntary biodiversity credits ever issued on a public blockchain.
>
> Would this be useful? Happy to send a 1-page case study showing a completed registrant journey beforehand.

**Note:** The BT01 connection is strong here — Batis operates in Colombia, and both existing BT01 projects are Colombian (CO-ANT, CO-CUN). This is a natural geographic and methodological fit.

**Adapt if at GreenBiz:** Same approach — printed 1-pager, lead with the Colombia/BT01 connection.

---

## 5. Revenue Split — Documented Decision

### Decision (Feb 9, 2026)

**Default: 50/50 revenue split between Symbiocene Labs and Regen Network** for all Regen AI business development client engagements.

- Applies to both Discovery Sprint ($15-20K) and Registry Sprint ($40-60K)
- Custom splits may be negotiated per client depending on scope and who leads the engagement
- This resolves the open question from the Feb 3 meeting (50/50 vs 70/30 in "Next Stage" doc)

### Where This Is Documented

- [x] `CLAUDE.md` — Commercial Terms section (already added)
- [ ] `clients/renew-replanet/sprint-proposal.md` — needs Commercial Terms section
- [ ] `clients/landbanking-group/sprint-proposal.md` — needs Commercial Terms section

### Still Needs Confirmation

The Feb 3 meeting notes flag: _"Jan 27 discussion mentioned 50/50 split, but written 'Next Stage' doc shows 70/30 hybrid. Which is current?"_

The distinction in the Next Stage doc was:
- **Platform revenue** (recurring, e.g., Intelligence Studio subscriptions): 70/30 favoring Regen
- **Services revenue** (one-time, e.g., sprint consulting): different split

**Working assumption:** Sprint proposals are services revenue → 50/50 applies. But this needs explicit confirmation from Gregory. Add to Questions for Dave (#7 above).

---

## What Happens Next

| If... | Then... |
|-------|---------|
| Dave confirms Batis identity + contact | Send Batis outreach email (adapted from draft above) |
| Dave confirms Ponterra contact name | Send Ponterra outreach email (biodiversity complement angle) |
| Gregory confirms carbon governance timeline | Update both sprint proposals with correct timeline |
| Gregory confirms revenue split (50/50 default) | Commercial Terms already added to both proposals — confirm alignment |
| GreenBiz team member identified | Prep Verra meeting (Scott Greenberg) + session attendance |
| First meeting happens | Stop everything, iterate based on real feedback |

**GreenBiz 26 result:** No prospects attending. Proceed with email outreach — no need to wait.

**The single metric that matters: one meeting on the calendar.**
