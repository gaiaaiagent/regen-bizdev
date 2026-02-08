# Registry Readiness Assessment: Wallacea Trust 5-Taxa Methodology

## Asset Summary

**Methodology:** Wallacea Trust v2.1 — Conservation-weighted biodiversity scoring
**Proponent:** Renew/RePlanet (UK)
**Asset Type:** Biodiversity credits from landscape-scale ecological restoration
**Application:** UK restoration sites (e.g., Oakwood Manor Restoration Site, Somerset)

The Wallacea Trust methodology measures biodiversity across five taxa groups, each scored on conservation value (1-5) and relative abundance (1-5). A composite score aggregates across all taxa with conservation weighting. The methodology is designed for repeat surveys to track biodiversity uplift over time.

**Parsed Asset Dimensions:**

| # | Taxon / Dimension | Metrics | Measurement Method |
|---|-------------------|---------|-------------------|
| 1 | 3D Forest Structure | Canopy cover %, understory density, deadwood volume (m³/ha) | Field survey — structural assessment |
| 2 | Invertebrates | Species richness, indicator species presence, sampling method | Pitfall traps + sweep netting |
| 3 | Breeding Birds | Species richness, Red List species, territory mapping | Territory mapping surveys |
| 4 | Bat Fauna | Species richness, activity index, roost sites, detector type | Passive acoustic monitoring (AudioMoth) |
| 5 | Higher Plants | Species richness, native %, indicator species | Botanical field survey |

## Credit Class Mapping

*Source: Regen Ledger `list_classes()` — 13 credit classes queried live. `list_credit_types()` — 5 credit types with unit definitions.*

| Asset Dimension | Closest Regen Credit Class | Credit Type & Unit | Methodology Match | Status | Gap Description |
|----------------|--------------------------|-------------------|-------------------|--------|----------------|
| **Composite biodiversity score** (all 5 taxa) | **BT01** (BioTerra) | BT (weighted 10m² score of long-term restoration/preservation) | **Partial** — BT01 uses a weighted area-based biodiversity score; Wallacea Trust uses conservation-weighted taxa scoring. Both aggregate multi-dimensional biodiversity into a single composite, but scoring frameworks differ. | ⚠️ Partial | Wallacea Trust's conservation weighting (1-5 scale per taxon) needs formal mapping to BT01's "weighted 10m² score" framework. The conceptual approach is aligned (composite biodiversity metric), but unit conversion methodology must be defined. |
| **Breeding Birds** (Red List species, territory mapping) | **USS01** (Umbrella Species Stewardship) | USS (~1 hectare of umbrella species habitat stewarded for 1 year, composite index: USH + HQ + USpToC) | **Partial** — USS01's composite index (Umbrella Species Health + Habitat Quality + species-specific conservation interventions) conceptually maps to bird territory monitoring. Red List species could serve as umbrella species. | ⚠️ Partial | USS01 is structured around individual umbrella species, not multi-species assemblage monitoring. Turtle Dove or Cuckoo (Red List species in Renew's surveys) could qualify as umbrella species, but the methodology would need to adopt USS01's USH + HQ + USpToC index structure. |
| **Invertebrates** (indicator species: Stag Beetle, White-clawed Crayfish) | **MBS01** (Marine Biodiversity Stewardship) | MBS (generic quantification of biodiversity activities in marine ecosystems) | **Weak** — MBS01 is marine-specific. Terrestrial invertebrate monitoring has no direct credit class analogue. | ❌ Gap | No existing Regen credit class covers terrestrial invertebrate biodiversity. MBS01 demonstrates the credit type precedent for biodiversity stewardship, but is scoped to marine ecosystems. A terrestrial equivalent or BT01 methodology extension is needed. |
| **Bat Fauna** (acoustic monitoring, roost sites) | **USS01** (Umbrella Species Stewardship) | USS (see above) | **Weak** — Bats could potentially qualify as umbrella species for woodland ecosystem health, but USS01's index structure doesn't accommodate acoustic monitoring data directly. | ⚠️ Partial | Acoustic monitoring (AudioMoth) data format needs integration pathway into USS01's composite index. Activity index and roost site metrics are valuable but not currently mapped to any credit class evidence requirements. |
| **Carbon stacking** (Verra carbon + Regen biodiversity) | **C01-C09** (Carbon) | C (metric ton CO2 equivalent) | **Strong** — 9 carbon credit classes on Regen Ledger. Renew already issues Verra carbon credits; Regen carbon classes provide the framework for on-chain representation. | ✅ Maps | Carbon stacking is technically feasible. A project could have both C-class carbon credits and BT01 biodiversity credits. The bridging mechanism (Verra → Regen) uses existing credit batch infrastructure. |

Note: All credit class IDs (BT01, USS01, MBS01, C01-C09, KSH01) and credit type definitions come from live Regen Ledger queries. No fabricated IDs or external registry codes.

## Registry Readiness Score: 5/10

**Methodology Coverage (2/5):**
The composite biodiversity score partially maps to BT01 (BioTerra), and individual taxa have weak-to-partial matches with USS01. However, no existing credit class directly accommodates a 5-taxa conservation-weighted methodology. The carbon stacking dimension maps well to C01-C09. Score reflects that meaningful registry work is needed to formalize the mapping, but the foundational credit types exist.

**Data/Evidence Completeness (3/5):**
Renew's biodiversity survey data is structured and comprehensive — species richness, indicator species, conservation weighting, and temporal tracking (baseline → current → next survey). The data quality is sufficient for credit issuance. Gaps: (1) no formal content hash or attestation records yet, (2) verification protocol for third-party validation not yet designed, (3) conservation value scoring methodology needs peer-reviewed documentation for registry submission.

## Gaps & Required Actions

1. **BT01 scoring framework alignment** — Map Wallacea Trust's conservation-weighted taxa scoring to BT01's "weighted 10m² score" unit definition. This requires defining a conversion methodology that preserves the ecological meaning of both frameworks. *Estimated effort: 2-3 weeks of methodology work.*

2. **Multi-taxa composite methodology documentation** — Wallacea Trust v2.1 needs formal documentation meeting Regen registry submission standards: scientific basis, additionality framework, MRV protocol, data quality standards. *Estimated effort: 4-6 weeks, depending on existing documentation.*

3. **Terrestrial invertebrate coverage gap** — No existing credit class covers terrestrial invertebrate biodiversity monitoring. Options: (a) fold into BT01 as a component of the composite score, (b) propose a terrestrial biodiversity stewardship credit class extension. *Estimated effort: 2-4 weeks for proposal.*

4. **Acoustic monitoring data integration** — Bat fauna data from AudioMoth acoustic monitoring needs a defined pathway into the registry evidence package. Content hashing of audio data files, species identification methodology, and activity index calculation need documentation. *Estimated effort: 1-2 weeks.*

5. **Carbon credit bridging architecture** — Design the technical mechanism for Verra carbon credits and Regen biodiversity credits to coexist for the same project area without double-counting ecological outcomes. *Estimated effort: 2-3 weeks.*

## Recommended Pathway

**Phase 1 (Weeks 1-4): BT01 Methodology Alignment**
Target BT01 (BioTerra) as the primary credit class. BT01's "weighted 10m² score of long-term restoration/preservation" is the closest match to Wallacea Trust's composite biodiversity scoring. Define the conversion methodology from conservation-weighted taxa scores to BT01 units.

**Phase 2 (Weeks 5-8): Registry Submission Preparation**
Document the adapted methodology to Regen registry submission standards. Prepare the evidence package: scientific basis, peer review documentation, sample data with content hashes, verification protocol.

**Phase 3 (Weeks 9-12): USS01 Extension Exploration**
Evaluate whether Red List species in Renew's surveys (Turtle Dove, Cuckoo) qualify for USS01 umbrella species designation. If viable, this creates a secondary credit issuance pathway alongside BT01.

**Phase 4 (Ongoing): Carbon Stacking Implementation**
Once BT01 pathway is established, implement Verra carbon credit bridging to enable dual-class issuance (carbon + biodiversity) for the same restoration sites.

## Relevant Precedents

- **Biodiversity Credit Type Proposal** (Regen Forum, topic 49) — Proposal for voluntary biodiversity credits on-chain, representing units of habitat conservation or restoration action. Directly relevant to Wallacea Trust's biodiversity uplift approach.
  - Source: KOI RID `regen.forum-post:forum.regen.network_49_post_1`
  - URL: https://forum.regen.network/t/new-credit-type-proposal-biodiversity/49

- **Desert Regreening Credit Class Proposal** (Regen Forum, topic 490) — Uses a functional biodiversity index alongside carbon sequestration. Demonstrates precedent for multi-dimensional ecological credits combining biodiversity and carbon.
  - Source: KOI RID `orn:web.page:forum.regen.network/e44f09cdf2bbc265#chunk6`
  - URL: https://forum.regen.network/t/feedback-request-desert-regreening-credit-class-proposal/490

- **Natural Capital Tools Collaboration** (Regen × BASIN, Forum topic 101) — Collaboration on natural capital measurement tools. Relevant to Renew's landscape intelligence positioning.
  - Source: KOI RID `regen.forum-topic:forum.regen.network_topic_101#chunk0`
  - URL: https://forum.regen.network/t/natural-capital-tools-collab-regen-network-x-basin/101

Sources:
- Ledger: Credit classes BT01, USS01, MBS01, C01-C09, KSH01 (13 total via `list_classes()`)
- Ledger: Credit types BT, USS, MBS, C, KSH (5 total via `list_credit_types()`)
- KOI: Forum topics 49, 490, 101
