# Methodology Review Simulation: Landler Natural Capital Assessment v3

> **Simulated Pre-Review.** This is an indicative assessment based on published Regen registry criteria and precedent reviews. It does not constitute a formal methodology review or approval. Actual review outcomes depend on the full submission and reviewer panel assessment.

## Review Process Overview

Regen's Protocol Review Process consists of four stages:

1. **Initial Submission** — Methodology draft submitted with required documentation package (scientific basis, monitoring plan, data quality standards, sample calculations)
2. **Internal Review** — Regen Registry science team reviews within approximately 3 weeks. Assesses whether the protocol framework is sufficient to warrant review by expert peers.
3. **Expert Peer Review** — Independent expert reviewers evaluate scientific basis, data quality, and MRV feasibility. Reviewers fill in a Revision Report with suggested comments. Multiple rounds possible if revisions needed.
4. **Public Comment** — Community review period for stakeholder feedback on methodology transparency, applicability, and potential concerns.

*Source: Regen Registry Handbook — Methodology Review Process (KOI RID `regen.github:github_regen-registry-handbook_methodology-development_methodology-review-process.md#chunk2`, URL: https://github.com/regen-network/regen-registry-handbook/blob/main/methodology-development/methodology-review-process.md)*

Expert peer reviewers are selected as respected subject matter experts. The review process values both the reviewer's expertise and the potential for long-lasting collaboration between reviewer and methodology developer.

*Source: Expert Peer Reviewers documentation (KOI RID `orn:web.page:handbook.regen.network/eb62057780669b0d#chunk1`, URL: https://handbook.regen.network/protocol-development/who-are-expert-peer-reviewers)*

## Review Checklist

| Criterion | Status | Finding | Evidence Needed |
|-----------|--------|---------|-----------------|
| **Scientific basis** | ⚠️ Flag | The Landler Natural Capital Assessment v3 measures 5 dimensions with a composite scoring approach. Carbon sequestration methodology is well-established (remote sensing + field sampling). However, the **Landler Biodiversity Index is proprietary** — reviewers will require transparent, peer-reviewed documentation of the index calculation, validation studies, and reproducibility criteria. The composite Nature Equity Score aggregation formula also needs scientific justification. | Peer-reviewed publication or white paper on Landler Biodiversity Index; statistical validation study; composite score aggregation methodology with sensitivity analysis |
| **Additionality** | ⚠️ Flag | Baseline values are provided (e.g., carbon: 2.1 tCO2e/ha/yr baseline → 5.8 current), but the **counterfactual scenario for cocoa agroforestry conversion needs published justification**. What would have happened without the intervention? Cocoa agroforestry may have carbon sequestration benefits regardless of Landbanking's intervention — reviewers will probe whether the uplift is truly additional. | Published counterfactual analysis for cocoa agroforestry in West Africa; baseline establishment protocol with temporal documentation; evidence that improvements would not have occurred under business-as-usual |
| **Permanence / durability** | ⚠️ Flag | No permanence framework documented for the Nature Equity Asset. Cocoa agroforestry systems face specific permanence risks: commodity price fluctuations incentivizing land use change, climate change impacts on cocoa viability, and land tenure uncertainty in Cote d'Ivoire/Ghana. | Risk assessment for cocoa agroforestry permanence; buffer pool or insurance mechanism for reversal risk; minimum commitment period for project participants; land tenure documentation |
| **MRV feasibility** | ⚠️ Partial Pass | Carbon and soil health measurements use established methods with high confidence. Biodiversity (eDNA + acoustic monitoring + visual surveys) uses emerging but accepted methods — **medium confidence rating needs an improvement pathway**. Water regulation relies on hydrological modeling (medium confidence). Social impact surveys need standardized methodology. | MRV protocol per dimension with uncertainty quantification; quality assurance procedures; auditor qualification requirements; data management plan; improvement pathway for medium-confidence dimensions |
| **Leakage accounting** | ⚠️ Flag | Not addressed in the Nature Equity Asset description. For cocoa agroforestry, potential leakage includes: (1) displacement of conventional agriculture to other land, (2) market leakage if cocoa production shifts geography, (3) activity-shifting if farmers intensify production elsewhere. | Leakage analysis covering activity-shifting, market effects, and ecological displacement; monitoring plan for leakage boundaries |
| **Conservative estimates** | ⚠️ Flag | Current values show significant improvements across all dimensions (+50% to +176%). The **social impact dimension's "farmer livelihoods index" lacks external benchmarking** — what constitutes a 0.67 score, and how does this compare to comparable interventions? Medium confidence on 3/5 dimensions suggests estimates may not meet conservativeness standards. | Uncertainty analysis per dimension; confidence interval calculations; conservative adjustment factors for medium-confidence measurements; external benchmarking for proprietary indices |
| **Stakeholder impact** | ✅ Pass | Cocoa agroforestry inherently involves smallholder farmer communities. The social impact dimension (farmer livelihoods index) directly tracks stakeholder outcomes. Ritter Sport as corporate partner suggests existing stakeholder engagement framework. | Stakeholder engagement plan; free, prior, and informed consent (FPIC) documentation; benefit-sharing mechanism description; grievance mechanism |
| **Data quality standards** | ⚠️ Flag | Data quality varies by dimension: high confidence for carbon and soil, medium for biodiversity, water, and social impact. **Annual monitoring frequency may be insufficient for some dimensions** (e.g., biodiversity eDNA may show seasonal variation requiring more frequent sampling). The proprietary Landler platform as sole data management system raises questions about data independence and auditability. | Data quality management plan; independent data audit protocol; raw data access provisions for verifiers; calibration and validation procedures per measurement method |

Status legend: ✅ Pass — meets registry standards | ⚠️ Flag — needs revision or additional documentation | ❌ Fail — blocking issue requiring fundamental changes

## Reviewer Flags

1. **Proprietary index opacity** — "The Landler Biodiversity Index is a proprietary metric without published peer-reviewed documentation. Reviewers cannot assess the scientific validity of a methodology they cannot independently evaluate. We require either: (a) publication of the full index methodology with validation data, or (b) adoption of an established, published biodiversity assessment framework."

2. **Multi-dimensional novelty and precedent gap** — "No existing Regen credit methodology combines 5 ecological dimensions into a single composite asset. While this is innovative, it raises questions about appropriate unit definition, credit type classification, and how to handle dimensional trade-offs. We recommend the proponent consider phased registration, starting with dimensions that map to existing credit classes (carbon → C-class, biodiversity → BT01) while building the case for new credit types."

3. **Confidence thresholds** — "Three of five dimensions report medium confidence. Registry standards require documented uncertainty quantification and defined improvement pathways. For dimensions where confidence cannot be raised to high within a defined timeline, the methodology should specify conservative adjustment factors that account for measurement uncertainty."

4. **Composite score aggregation** — "The Nature Equity Score of 72.4 aggregates 5 heterogeneous dimensions with different units, scales, and confidence levels into a single number. The aggregation methodology, weighting scheme, and sensitivity to individual dimension changes need formal documentation and justification. How does the composite score handle a situation where one dimension declines while others improve?"

5. **Baseline integrity** — "Baseline values appear to be single-point-in-time measurements without documented establishment protocols. For a multi-year crediting period, baseline stability assumptions need validation, and mechanisms for baseline adjustment need to be defined."

## Required Evidence Package

| Evidence Type | Description | Format |
|---------------|-------------|--------|
| Methodology white paper | Complete description of Landler Natural Capital Assessment v3: scientific basis, dimensional framework, scoring algorithms, composite aggregation | PDF, peer-reviewed or submitted for review |
| Biodiversity Index documentation | Full calculation methodology, input data requirements, validation study results, reproducibility protocol | PDF with supplementary data |
| Additionality analysis | Counterfactual scenario for West African cocoa agroforestry; baseline establishment protocol | PDF with quantitative models |
| MRV protocol | Per-dimension monitoring plan: measurement methods, frequency, quality standards, auditor requirements | PDF with annexes per dimension |
| Leakage assessment | Activity-shifting and market leakage analysis for cocoa agroforestry | PDF with spatial analysis |
| Permanence risk assessment | Risk analysis for cocoa system permanence; buffer pool or insurance mechanism | PDF with risk matrix |
| Sample dataset with calculations | Complete worked example using real project data; composite score calculation walkthrough | JSON data + PDF calculation guide |
| Stakeholder engagement plan | FPIC documentation, benefit-sharing mechanism, grievance process | PDF |
| Data quality management plan | Quality assurance for all 5 dimensions; independent audit provisions | PDF |

## Estimated Review Timeline

| Stage | Duration | Notes |
|-------|----------|-------|
| **Submission Preparation** | 8-12 weeks | Significant documentation work needed: Biodiversity Index publication, additionality analysis, MRV protocols per dimension. This is the longest phase. |
| **Internal Review** | ~3-4 weeks | Standard timeline per registry handbook. May extend due to methodology novelty (multi-dimensional composite not previously reviewed). |
| **Expert Peer Review** | 4-6 weeks | Longer than typical due to 5-dimensional scope requiring reviewers with diverse expertise (carbon, biodiversity, soil science, hydrology, social impact). May require 2+ review rounds given number of flags. |
| **Revisions** | 4-8 weeks | Depends on flag resolution. Biodiversity Index documentation and additionality analysis are most likely to require substantive revision. |
| **Public Comment** | 2-4 weeks | Standard community review period. Novel multi-dimensional approach may generate significant community discussion. |
| **Final Approval** | 2 weeks | Assuming satisfactory resolution of all flags. |
| **Total** | **~24-38 weeks** | Longer than typical single-dimension methodologies due to multi-dimensional scope and proprietary index documentation requirements. |

## Precedents

- **Methodology Review Process** — Regen's 4-stage protocol review described in the Registry Handbook. Internal review targets 3-4 weeks; expert peer reviewers selected for subject matter expertise; revision reports guide methodology improvements.
  - Source: KOI RID `regen.github:github_regen-registry-handbook_methodology-development_methodology-review-process.md#chunk2`
  - URL: https://handbook.regen.network/protocol-development/methodology-review-process

- **Methodology Submission Guidelines** — Handbook documentation on what a methodology draft should include: standards and tools for monitoring, reporting, and verification.
  - Source: KOI RID `regen.github:github_regen-registry-handbook_methodology-development_submitting-a-methodology.md#chunk4`
  - URL: https://handbook.regen.network/protocol-development/protocol-methodology-development-overview

- **Expert Peer Reviewers** — Selection criteria and process for independent expert review. Reviewers are respected subject matter experts; contacts from review can lead to long-lasting collaboration.
  - Source: KOI RID `orn:web.page:handbook.regen.network/eb62057780669b0d#chunk1`
  - URL: https://handbook.regen.network/protocol-development/who-are-expert-peer-reviewers

- **Desert Regreening Credit Class** — Multi-dimensional credit combining carbon with functional biodiversity index. Closest precedent for a multi-dimensional approach on Regen.
  - Source: KOI RID `orn:web.page:forum.regen.network/e44f09cdf2bbc265#chunk6`
  - URL: https://forum.regen.network/t/feedback-request-desert-regreening-credit-class-proposal/490

Sources:
- Registry Handbook: https://handbook.regen.network/protocol-development/methodology-review-process
- Registry Handbook: https://handbook.regen.network/protocol-development/who-are-expert-peer-reviewers
- Registry Handbook: https://handbook.regen.network/protocol-development/protocol-methodology-development-overview
- KOI: RIDs `regen.github:github_regen-registry-handbook_methodology-development_methodology-review-process.md#chunk2`, `orn:web.page:handbook.regen.network/eb62057780669b0d#chunk1`, `orn:web.page:handbook.regen.network/1810b1f989f385e5#chunk5`
