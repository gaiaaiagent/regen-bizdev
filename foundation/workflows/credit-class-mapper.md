# Credit Class Mapper Workflow

Map a client's ecological asset concept to Regen's credit class framework. This is the core differentiator — it requires live queries to KOI (methodology corpus) and Ledger (credit class schema) that no generic AI tool can replicate.

## Input

Description of an ecological asset or methodology — the client's own framing of what they measure, verify, and want to register.

## Process

1. **Parse asset dimensions.** Break the client's asset description into measurable ecological outcomes, measurement methods, and verification approaches.

2. **Query Ledger MCP.** Run `list_classes()` and `list_credit_types()` to get current registry structure:
   - 13 credit classes: C01-C09 (Carbon), BT01 (BioTerra), KSH01 (Kilo-sheep-hour), MBS01 (Marine Biodiversity Stewardship), USS01 (Umbrella Species Stewardship)
   - 5 credit types with defined units (metric ton CO2e, weighted 10m^2 score, etc.)

3. **Query KOI MCP.** Search for methodology precedents:
   - `search("biodiversity credit methodology")` — registered methodologies with biodiversity components
   - `search("credit class requirements")` — schema and structural info from docs.regen.network
   - `search("[specific asset type]")` — any existing coverage for the client's asset dimensions

4. **Map dimensions to classes.** For each asset dimension, find the closest credit class and methodology match. Note exact matches, partial matches, and gaps.

5. **Score registry readiness.** Apply the rubric below.

6. **Identify gaps and pathway.** What methodology work is needed? What credit classes could be extended or created?

## Output Structure

```markdown
# Registry Readiness Assessment: [Asset Name]

## Asset Summary
[Parsed from client description — dimensions, measurement methods, verification approach]

## Credit Class Mapping

| Asset Dimension | Closest Regen Credit Class | Credit Type | Methodology Match | Status | Gap Description |
|----------------|--------------------------|-------------|-------------------|--------|----------------|
| [e.g., Carbon sequestration] | C01-C09 | Carbon (tCO2e) | [From KOI search] | Maps | — |
| [e.g., Biodiversity uplift] | BT01 (BioTerra) | BioTerra (weighted 10m^2) | [From KOI search] | Partial | [Specific gap] |
| [e.g., Soil health] | — | — | [Partial match] | Gap | Needs new credit class or methodology extension |

Note: All credit class IDs and methodology references come from live Ledger/KOI queries. No fabricated IDs or external registry codes (e.g., Verra VM numbers).

## Registry Readiness Score: [X/10]

**Methodology Coverage (0-5):**
- 5 = All dimensions map to existing credit classes
- 3 = Majority map with minor gaps
- 1 = Most dimensions require new methodology work
- 0 = No existing coverage
Score: [X] — [Brief rationale]

**Data/Evidence Completeness (0-5):**
- 5 = All required evidence types available and verifiable
- 3 = Most evidence available, some gaps fillable
- 1 = Major evidence gaps
- 0 = No verifiable evidence provided
Score: [X] — [Brief rationale]

## Gaps & Required Actions
1. [Gap]: [What's needed to close it, estimated effort]
2. [Gap]: [What's needed to close it, estimated effort]

## Recommended Pathway
[Which credit classes to target, what methodology work is needed, sequencing recommendation, estimated timeline]

## Relevant Precedents
[From KOI: similar methodologies that went through review, related governance discussions, forum posts about comparable asset types]

Sources:
- Ledger: [credit class IDs queried]
- KOI: [document RIDs referenced]
```

## Key Principles

- Credit class IDs must come from actual `list_classes()` results (C01-C09, BT01, KSH01, MBS01, USS01)
- Credit type units must match actual `list_credit_types()` definitions
- If no existing class maps to a dimension, say so clearly — this is valuable information showing where the registry needs to grow
- The output demonstrates infrastructure, not AI synthesis
