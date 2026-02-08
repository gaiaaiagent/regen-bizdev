# Verification & MRV Plan: West African Cocoa Agroforestry Nature Equity Asset

## Verification Architecture

```
Landler Platform          Data Pipeline             Regen Registry            Verification
────────────────          ─────────────             ──────────────            ────────────

Field Collection    →    Process & QA        →     Data Anchoring      →    Independent
(5 dimensions,           (Landler Natural           (regen/data/v1:          Attestation
 multi-method)            Capital v3 scoring,        content hash +          (per dimension,
                          composite score)           MsgAnchorData)          per verifier type)
                                                         │
                                                         ↓
                                                    Attestation         →    Credit Issuance
                                                    (MsgAttest:              (MsgCreateBatch:
                                                     data collector +        project registration,
                                                     verifier sign)          batch under credit class)
```

## Verification Bodies

| Dimension | Recommended Verifier Type | Verification Method | Frequency | Rationale |
|-----------|--------------------------|--------------------| ----------|-----------|
| **Carbon Sequestration** | Accredited carbon auditor (e.g., SCS Global, Bureau Veritas, DNV) | Independent review of remote sensing analysis + field sampling data; recalculation of tCO2e/ha/yr; site visit for ground-truthing | Annual | Carbon verification is well-established with mature auditor ecosystem. High confidence data supports standard verification pathway. |
| **Biodiversity** | Independent ecologist + eDNA laboratory | Peer review of Landler Biodiversity Index calculation; independent eDNA analysis of replicate samples; acoustic monitoring data validation; comparison with visual survey records | Annual | Multi-method measurement requires multi-disciplinary verification. eDNA lab provides analytical independence; ecologist validates species-level interpretation. |
| **Soil Health** | Certified soil testing laboratory (e.g., ISO 17025 accredited) | Independent sampling at same depths (0-30cm); SOC analysis via combustion method or wet oxidation; comparison with Landler's reported values | Biannual | Soil carbon changes slowly; biannual is sufficient. Independent lab sampling prevents measurement bias. |
| **Water Regulation** | Hydrological consultant + remote sensing specialist | Independent hydrological model validation; infiltration rate field testing; watershed-scale water balance assessment | Biannual | Hydrological modeling verification requires both modeling expertise and field validation capacity. Medium confidence rating warrants biannual checks. |
| **Social Impact** | Third-party social auditor (e.g., SA8000 or B Corp certified) | Independent farmer surveys at randomly selected sites; economic analysis validation; stakeholder interviews; benefit-sharing mechanism review | Annual | Social metrics require community-level verification independent of corporate partner (Ritter Sport) interests. |

## Data Requirements

| Data Type | Source | Format | Collection Frequency | Quality Standard |
|-----------|--------|--------|---------------------|-----------------|
| Remote sensing imagery | Satellite providers (Sentinel-2, Planet Labs) | GeoTIFF, NDVI/LAI indices | Quarterly | Cloud-free coverage >80%; radiometric calibration documented |
| Field carbon measurements | Allometric field sampling (DBH, height, species) | CSV with GPS coordinates | Annual (during dry season) | Plot-level sampling protocol per IPCC Tier 2/3 guidelines |
| eDNA samples | Water and soil collection from defined sampling points | FASTQ sequence files + species lists | Annual (wet season) | Chain of custody documented; replicate samples; accredited lab processing |
| Acoustic monitoring data | AudioMoth or equivalent passive acoustic recorders | WAV files + automated species ID | Continuous (deployed annually for 2-4 week recording periods) | Recorder calibration; noise floor documentation; species ID algorithm validation |
| Soil samples | Field sampling at 0-30cm depth from stratified plot grid | Lab analysis certificates (SOC %, bulk density) | Biannual | ISO 17025 certified lab; replicate samples; sampling protocol documented |
| Hydrological measurements | Infiltration rings, piezometers, flow gauges | CSV + model outputs | Quarterly (field) + continuous (gauges) | Calibrated instruments; model validation against observed data |
| Farmer livelihood surveys | Structured interviews at randomly selected farms | Survey responses (digital) | Annual | Sample size adequate for statistical significance; survey instrument validated; enumerator training documented |
| Composite Nature Equity Score | Landler platform calculation | JSON output with per-dimension scores | Annual (after all dimensions updated) | Calculation audit trail; sensitivity analysis; version-controlled scoring algorithm |

## On-Chain Data Anchoring

Regen Ledger's data module (`regen/data/v1`) provides the trust infrastructure for all verification data:

- **Content hashing** — Each data artifact (survey dataset, lab result, model output) receives a secure content hash. Supports raw data (non-canonical) or RDF graph data.
- **Attestation** — Multiple parties sign statements about data veracity via `MsgAttest`. Each attestation is "like signing a legal document" — immutable, timestamped, identity-linked.
- **Timestamping** — On-chain block timestamp provides provenance for when data was anchored and attested.
- **Resolution** — Metadata IRIs (e.g., `regen:13toV...`) resolve via `api.regen.network` to original off-chain content with integrity verification.

**Data flow per verification cycle:**

| Step | Action | Regen Module | Transaction |
|------|--------|--------------|-------------|
| 1 | Raw ecological data collected across 5 dimensions | — | — |
| 2 | Landler processes data → per-dimension scores + composite Nature Equity Score | — | — |
| 3 | Processed data JSON content hash generated | `regen/data/v1` | `MsgAnchorData` — anchors hash on-chain with timestamp |
| 4 | Landbanking attests as data collector: "We collected and processed this data per Landler v3" | `regen/data/v1` | `MsgAttest` — data collector attestation |
| 5 | Independent verifier reviews data and adds attestation per dimension | `regen/data/v1` | `MsgAttest` — verifier attestation (one per verifier per dimension) |
| 6 | Credit batch issued referencing anchored data | `regen/ecocredit` | `MsgCreateBatch` — credit issuance with metadata IRI pointing to verified data |
| 7 | Third parties can resolve IRI, verify hash, review all attestation records | `regen/data/v1` | Query only — no transaction needed for verification |

*Source: Regen data module — KOI RID `regen.github:github_regen-ledger_x_data_spec_README.md#chunk1`*

## Monitoring Schedule

### Year 1: Baseline Establishment & First Full Cycle

| Quarter | Activity | Deliverable | Verifier |
|---------|----------|-------------|----------|
| Y1 Q1 | Baseline data collection across all 5 dimensions; install monitoring equipment (acoustic recorders, piezometers) | Baseline dataset anchored on Regen Ledger | Data collector attestation (Landbanking) |
| Y1 Q2 | Carbon: remote sensing analysis (quarterly imagery); Water: first quarterly hydrological data | Quarterly data update (carbon + water) | — |
| Y1 Q3 | Full annual survey cycle: eDNA collection, farmer livelihood surveys, soil sampling | Complete annual dataset for all 5 dimensions | Independent verifiers engaged |
| Y1 Q4 | Verification: independent audit of all Year 1 data; composite score calculation; credit batch preparation | Year 1 Verification Report; first credit batch issuance (carbon dimension via C-class) | Carbon auditor attestation; biodiversity ecologist attestation; soil lab certification |

### Year 2: Operational Monitoring

| Quarter | Activity | Deliverable | Verifier |
|---------|----------|-------------|----------|
| Y2 Q1 | Carbon + water quarterly monitoring; begin preparation for annual survey cycle | Quarterly update anchored | — |
| Y2 Q2 | Carbon + water quarterly monitoring; acoustic monitoring deployment | Quarterly update anchored | — |
| Y2 Q3 | Full annual survey: eDNA, acoustic, farmer surveys; soil sampling (biannual cycle) | Complete annual dataset for all dimensions | All verifiers engaged for Year 2 |
| Y2 Q4 | Verification: Year 2 independent audit; trend analysis (Year 1 → Year 2); credit batch issuance | Year 2 Verification Report; credit batch issuance (carbon + potentially BT01 biodiversity) | All verifier attestations |

### Year 3: Expanded Verification & Credit Diversification

| Quarter | Activity | Deliverable | Verifier |
|---------|----------|-------------|----------|
| Y3 Q1 | Carbon + water quarterly; methodology refinement based on Year 1-2 learnings | Methodology update (if needed); quarterly data | — |
| Y3 Q2 | Carbon + water quarterly; acoustic monitoring; confidence improvement pathway review | Quarterly data; confidence assessment report | — |
| Y3 Q3 | Full annual survey; soil sampling (biannual); comprehensive 3-year trend analysis | 3-year dataset; trend analysis; confidence upgrade assessment | All verifiers + external methodology reviewer |
| Y3 Q4 | Verification: 3-year comprehensive audit; credit diversification (additional credit classes if approved) | 3-year Verification Report; expanded credit batch issuance | All verifier attestations; registry methodology review if new classes proposed |

## Data Flow Architecture

| Step | Source | Data | Destination | Format |
|------|--------|------|-------------|--------|
| 1 | Field collection (Cote d'Ivoire / Ghana) | Raw ecological data: satellite imagery, field samples, eDNA, acoustic recordings, soil cores, survey responses | Landler Platform | GeoTIFF, CSV, FASTQ, WAV, JSON |
| 2 | Landler Platform | Processed metrics: per-dimension scores, confidence ratings, composite Nature Equity Score (72.4) | Regen Registry API | JSON (standardized schema) |
| 3 | Regen data module | Content hash + attestation: immutable record of processed data | On-chain (`regen/data/v1`) | Tx hash + metadata IRI |
| 4 | Independent verifiers | Verification attestation: per-dimension sign-off | On-chain (`regen/data/v1`) | `MsgAttest` transaction |
| 5 | Regen ecocredit module | Credit batch issuance: quantity, vintage, project reference, metadata IRI | On-chain (`regen/ecocredit`) | `MsgCreateBatch` transaction |
| 6 | On-chain records | Verification proof: IRI resolution + attestation chain | Institutional investors | IRI resolution via `api.regen.network` |

## Cost Considerations

| Item | Estimated Cost per Cycle | Frequency | Notes |
|------|--------------------------|-----------|-------|
| Carbon verification (accredited auditor) | $5,000 - $15,000 | Annual | Depends on site visits required; remote-first with spot checks reduces cost |
| Biodiversity verification (ecologist + eDNA lab) | $8,000 - $20,000 | Annual | eDNA lab processing is the largest component; ecologist review can be partially remote |
| Soil testing (ISO 17025 lab) | $2,000 - $5,000 | Biannual | Per batch of samples; cost scales with number of sampling points |
| Hydrological verification | $3,000 - $8,000 | Biannual | Model validation is the primary cost; field instrument maintenance separate |
| Social audit | $3,000 - $8,000 | Annual | Travel costs significant for West African sites; local auditor partnerships reduce cost |
| Regen Ledger transactions | <$100 | Per anchoring/attestation | Negligible transaction fees on Regen chain |
| **Total per annual cycle** | **$21,000 - $56,000** | | First year higher (baseline establishment + equipment); subsequent years at lower end |

Sources:
- Regen data module spec: KOI RID `regen.github:github_regen-ledger_x_data_spec_README.md#chunk1`
- Data module overview: KOI RID `orn:web.page:docs.regen.network/6280734ec9e72b3b#chunk1`
- Ecocredit concepts: KOI RID `regen.github:github_regen-ledger_x_ecocredit_spec_01_concepts.md#chunk0`
