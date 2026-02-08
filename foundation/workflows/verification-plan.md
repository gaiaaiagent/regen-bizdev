# Verification Plan Workflow

Design MRV (Measurement, Reporting, Verification) infrastructure for a client's ecological asset. Maps data requirements, verifier types, monitoring schedules, and data flow architecture.

## Input

Asset concept and credit class mapping from earlier workflow outputs.

## Process

1. For each asset dimension, determine the appropriate verification approach
2. Identify data types, collection methods, and quality standards
3. Map the data flow from field collection through to on-chain attestation
4. Design a monitoring schedule aligned with credit issuance cycles
5. Reference Regen's data anchoring module for on-chain verification mechanics

## Output Structure

```markdown
# Verification & MRV Plan: [Asset/Project Name]

## Verification Architecture

[Client Platform] → [Data Collection] → [Processing/QA] → [Regen Registry] → [Attestation] → [Verification]

## Verification Bodies
| Dimension | Recommended Verifier Type | Verification Method | Frequency |
|-----------|--------------------------|--------------------| ----------|
| [Dimension] | [e.g., Third-party auditor, Remote sensing provider, Scientific panel] | [Method] | [Annual/Biannual/Continuous] |

## Data Requirements
| Data Type | Source | Format | Collection Frequency | Quality Standard |
|-----------|--------|--------|---------------------|-----------------|
| [Data type] | [Collection method] | [Format] | [Frequency] | [Standard/threshold] |

## On-Chain Data Anchoring
Regen Ledger's data module (regen/data/v1) provides:
- **Content hashing** — Secure hash for raw data (non-canonical) or graph data (RDF)
- **Attestation** — Attestors sign statements about data veracity (like signing a legal document)
- **Timestamping** — On-chain timestamp for data provenance
- **Resolution** — Metadata IRIs resolve to off-chain content with integrity verification

Data flow:
1. Raw ecological data collected in field → Client platform
2. Processed metrics computed → Standardized format
3. Content hash generated → Submitted to Regen data module via `MsgAnchorData`
4. Attestation record created → Attestors sign via `MsgAttest`
5. Credit batch issued → References anchored data via metadata IRI
6. Third-party verification → Independent verifier attests to data quality

## Monitoring Schedule
| Year | Quarter | Activity | Deliverable |
|------|---------|----------|-------------|
| Y1 | Q1 | [Activity] | [Deliverable] |
| Y1 | Q2 | [Activity] | [Deliverable] |
| Y1 | Q3 | [Activity] | [Deliverable] |
| Y1 | Q4 | [Activity] | [Deliverable] |

## Data Flow Architecture
| Step | Source | Data | Destination | Format |
|------|--------|------|-------------|--------|
| 1 | Field collection | Raw ecological data | Client platform | [Format] |
| 2 | Client platform | Processed metrics | Regen Registry API | JSON/Protobuf |
| 3 | Regen Registry | Content hash + attestation | On-chain (regen/data/v1) | Tx hash + IRI |
| 4 | On-chain record | Attestation proof | Verifier | IRI resolution |

## Cost Considerations
[Estimated verification costs per cycle, data infrastructure requirements]
```

## Key References

- Regen data module: `regen/data/v1` — anchoring, attestation, timestamping
- Ecocredit module: `regen/ecocredit` — credit class management, batch issuance
- Content addressing: Metadata IRIs (e.g., `regen:13toV...`) resolve via `api.regen.network`
