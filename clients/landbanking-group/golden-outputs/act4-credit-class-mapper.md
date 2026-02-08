# Registry Readiness Assessment: West African Cocoa Agroforestry Nature Equity Asset

## Asset Summary

**Asset Name:** West African Cocoa Agroforestry Nature Equity
**Proponent:** Landbanking Group (via Ritter Sport partnership)
**Location:** Cote d'Ivoire / Ghana
**Area:** 2,400 hectares
**Methodology:** Landler Natural Capital Assessment v3
**Vintage Year:** 2025
**Monitoring Frequency:** Annual
**Verification Status:** Unverified
**Target Investors:** Impact funds, corporate sustainability, sovereign wealth

The Nature Equity Asset aggregates 5 ecological and social dimensions into a composite Nature Equity Score (72.4/100). Each dimension tracks improvement from baseline to current values, with confidence ratings. The asset is designed as an investable instrument representing multi-dimensional nature outcomes.

**Parsed Asset Dimensions:**

| # | Dimension | Metric | Baseline → Current | Measurement Method | Confidence |
|---|-----------|--------|-------------------|-------------------|------------|
| 1 | Carbon Sequestration | tCO2e/ha/yr | 2.1 → 5.8 (+176%) | Remote sensing + field sampling | High |
| 2 | Biodiversity | Landler Biodiversity Index | 0.32 → 0.58 (+81%) | eDNA + acoustic monitoring + visual surveys | Medium |
| 3 | Soil Health | Soil organic carbon (%) | 1.4 → 2.1 (+50%) | Field sampling (0-30cm depth) | High |
| 4 | Water Regulation | Infiltration rate (mm/hr) | 12 → 28 (+133%) | Hydrological modeling + field validation | Medium |
| 5 | Social Impact | Farmer livelihoods index | 0.41 → 0.67 (+63%) | Surveys + economic analysis | Medium |

## Credit Class Mapping

*Source: Regen Ledger `list_classes()` — 13 credit classes queried live. `list_credit_types()` — 5 credit types with unit definitions.*

| Asset Dimension | Closest Regen Credit Class | Credit Type & Unit | Methodology Match | Status | Gap Description |
|----------------|--------------------------|-------------------|-------------------|--------|----------------|
| **Carbon Sequestration** (5.8 tCO2e/ha/yr) | **C01-C09** (Carbon) | C (metric ton CO2 equivalent) | **Strong** — 9 carbon credit classes on Regen Ledger with well-established methodology frameworks. Cocoa agroforestry carbon sequestration maps directly. Remote sensing + field sampling aligns with standard carbon MRV. | ✅ Maps | Minor: Need to select specific C-class methodology (forestry/agroforestry variant). Carbon accounting must distinguish sequestration from avoided emissions. |
| **Biodiversity** (Landler Biodiversity Index 0.58) | **BT01** (BioTerra) | BT (weighted 10m² score of long-term restoration/preservation) | **Partial** — BT01 uses a weighted area-based biodiversity score. Landler's Biodiversity Index is proprietary and multi-method (eDNA, acoustic, visual). Both aggregate biodiversity into a composite metric, but scoring frameworks differ significantly. | ⚠️ Partial | **Key issue:** "Landler Biodiversity Index" is proprietary — reviewers will flag opacity. Needs (1) peer-reviewed methodology documentation, (2) formal mapping to BT01's scoring framework, (3) independent validation of index calculation. Medium confidence rating compounds this concern. |
| **Soil Health** (SOC 2.1%) | — | — | **Gap** — No existing Regen credit class for soil organic carbon or soil health metrics. Soil carbon is tracked as a co-benefit in some C-class methodologies but has no dedicated credit class. | ❌ Gap | No credit class covers soil health as a standalone dimension. Soil organic carbon measurement at 0-30cm depth is a well-established method (high confidence), but the registry framework hasn't formalized it. Could be tracked as co-benefit metadata attached to a C-class or BT01 credit batch. |
| **Water Regulation** (infiltration rate 28 mm/hr) | — | — | **Gap** — No existing Regen credit class for hydrological services or water regulation metrics. | ❌ Gap | Water regulation is outside current Regen credit class scope. Hydrological modeling + field validation is a valid measurement approach, but no registry framework exists. Medium confidence rating adds uncertainty. Potential future credit class proposal — hydrological services are an active area of ecosystem credit development globally. |
| **Social Impact** (farmer livelihoods index 0.67) | — | — | **Gap** — No existing Regen credit class for social impact or livelihood metrics. Social co-benefits are common in credit project design but not typically issued as separate credits. | ❌ Gap | Social impact is outside current Regen credit class scope and unlikely to become a standalone credit class near-term. Best approach: track as co-benefit metadata attached to carbon or biodiversity credits, with structured reporting in project documentation. Surveys + economic analysis methodology is standard but not registry-grade without formal documentation. |

Note: All credit class IDs (C01-C09, BT01, USS01, MBS01, KSH01) and credit type definitions come from live Regen Ledger queries. No fabricated IDs or external registry codes.

## Registry Readiness Score: 4/10

**Methodology Coverage (2/5):**
Only 1 of 5 dimensions (carbon) maps directly to existing credit classes. Biodiversity partially maps to BT01 but requires significant methodology work to bridge proprietary scoring to registry standards. Soil health, water regulation, and social impact have no existing credit class coverage. This is expected for a multi-dimensional Nature Equity Asset — the registry is growing into these areas, and the gaps represent opportunity for new credit class proposals. Score: **2** — Carbon maps well, biodiversity partial, three dimensions are gaps.

**Data/Evidence Completeness (2/5):**
Carbon and soil health data have high confidence ratings and established measurement methods. Biodiversity, water, and social impact have medium confidence — sufficient for initial assessment but requiring improvement for registry submission. Verification status is "unverified" — no independent attestation exists. The Landler Natural Capital Assessment v3 methodology lacks public peer-reviewed documentation. Score: **2** — Data exists but verification and methodology documentation gaps are substantial.

## Gaps & Required Actions

1. **Landler Biodiversity Index documentation** — The proprietary index is the most critical gap. Registry reviewers will require: (a) peer-reviewed scientific basis, (b) transparent calculation methodology, (c) reproducibility criteria, (d) independent validation study. *Estimated effort: 6-8 weeks of scientific documentation + peer review engagement.*

2. **Carbon methodology selection** — Choose which C-class methodology framework to apply. Cocoa agroforestry carbon sequestration likely fits forestry/land use change methodologies. Need to map Landler's remote sensing + field sampling approach to a specific standard. *Estimated effort: 2-3 weeks.*

3. **BT01 scoring framework alignment** — Map Landler Biodiversity Index to BT01's "weighted 10m² score" unit definition. Requires defining a conversion methodology. eDNA + acoustic monitoring + visual surveys need standardized protocols for registry compliance. *Estimated effort: 3-4 weeks.*

4. **Soil health credit class proposal pathway** — No existing class covers SOC as a standalone credit. Options: (a) track as co-benefit metadata on C-class credits, (b) propose a new soil health credit class through Regen governance, (c) partner with existing soil carbon methodology developers. *Estimated effort: 2-3 weeks for pathway analysis.*

5. **Confidence improvement for medium-rated dimensions** — Biodiversity, water, and social impact all have medium confidence. Registry submission standards require documented uncertainty quantification and improvement pathways. *Estimated effort: ongoing, per dimension.*

6. **Verification protocol establishment** — Asset is currently "unverified." Need to design the verification workflow: who verifies each dimension, what evidence is required, and how attestations are recorded on-chain. *Estimated effort: 3-4 weeks.*

## Recommended Pathway

**Phase 1 (Weeks 1-4): Carbon First**
Start with carbon sequestration — it maps directly to C01-C09 with minimal methodology work. Register the cocoa agroforestry project, anchor sample carbon data, issue a test credit batch. This creates immediate proof of value and a working pipeline.

**Phase 2 (Weeks 5-8): Biodiversity Bridge**
Map the Landler Biodiversity Index to BT01 (BioTerra). This requires methodology documentation work — define the scientific basis, make the index calculation transparent, identify what peer review documentation is needed. Run a pre-review simulation to identify specific reviewer concerns.

**Phase 3 (Weeks 9-16): Multi-Dimensional Expansion**
With carbon and biodiversity credit classes established, explore credit class proposals for uncovered dimensions (soil health, water regulation). Social impact remains as co-benefit metadata rather than standalone credit. Begin formal methodology submission preparation.

**Long-term: Registry as Credibility Infrastructure**
As more Nature Equity Asset dimensions get registered credit classes, the composite Nature Equity Score gains registry backing dimension-by-dimension. The full multi-dimensional asset becomes verifiable through the registry rather than solely through Landler's proprietary platform.

## Relevant Precedents

- **Biodiversity Credit Type Proposal** (Regen Forum, topic 49) — Proposal for voluntary biodiversity credits on-chain. Directly relevant to Landler Biodiversity Index registration pathway. Demonstrates Regen community interest in biodiversity credit infrastructure.
  - Source: KOI RID `regen.forum-post:forum.regen.network_49_post_1`
  - URL: https://forum.regen.network/t/new-credit-type-proposal-biodiversity/49

- **Desert Regreening Credit Class Proposal** (Regen Forum, topic 490) — Multi-dimensional credit combining carbon sequestration with functional biodiversity index. Directly parallels Landbanking's multi-dimensional approach.
  - Source: KOI RID `orn:web.page:forum.regen.network/e44f09cdf2bbc265#chunk6`
  - URL: https://forum.regen.network/t/feedback-request-desert-regreening-credit-class-proposal/490

- **Natural Capital Tools Collaboration** (Regen × BASIN, Forum topic 101) — Collaboration on natural capital measurement tools. Relevant to Landler's platform positioning and multi-dimensional valuation approach.
  - Source: KOI RID `regen.forum-topic:forum.regen.network_topic_101#chunk0`
  - URL: https://forum.regen.network/t/natural-capital-tools-collab-regen-network-x-basin/101

Sources:
- Ledger: Credit classes C01-C09, BT01, USS01, MBS01, KSH01 (13 total via `list_classes()`)
- Ledger: Credit types C, BT, USS, MBS, KSH (5 total via `list_credit_types()`)
- KOI: Forum topics 49, 490, 101
