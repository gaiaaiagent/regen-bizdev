# Governance Review Workflow

Simulate a methodology review against Regen's published registry governance standards. Uses Registry Review MCP tools for structured checklist assessment and KOI for precedent reviews and governance discussions.

## Input

A methodology or asset concept, typically from credit class mapper output.

## Process

1. **Query Registry Review MCP.** Use `map_all_requirements()` to assess the methodology against the registry checklist, or construct the checklist from known criteria if MCP is unavailable.

2. **Query KOI for precedents.**
   - `search("methodology review process")` — Regen's 4-stage protocol review: Initial submission, Internal review, Expert peer review, Public comment
   - `search("expert peer reviewers")` — reviewer selection and evaluation criteria
   - `search("[methodology type] governance")` — precedent discussions for similar methodologies
   - `search_github_docs("submitting a methodology")` — from regen-registry-handbook

3. **Simulate review.** For each criterion, assess whether the methodology would pass, be flagged for revision, or fail. Base assessments on published standards from the registry handbook.

4. **Compile evidence requirements.** What documentation would reviewers need to see?

5. **Estimate timeline.** Based on the 4-stage process and precedent review durations.

## Output Structure

```markdown
# Methodology Review Simulation: [Methodology Name]

> **Simulated Pre-Review.** This is an indicative assessment based on published Regen registry criteria and precedent reviews. It does not constitute a formal methodology review or approval. Actual review outcomes depend on the full submission and reviewer panel assessment.

## Review Process Overview
Regen's Protocol Review Process consists of four stages:
1. **Initial Submission** — Methodology draft submitted with required documentation
2. **Internal Review** — Regen registry science team reviews within 3 weeks
3. **Expert Peer Review** — Independent expert reviewers evaluate scientific basis
4. **Public Comment** — Community review period for stakeholder feedback

## Review Checklist
| Criterion | Status | Finding | Evidence Needed |
|-----------|--------|---------|-----------------|
| Scientific basis | | [Specific assessment] | [What to provide] |
| Additionality | | [Specific assessment] | [What to provide] |
| Permanence / durability | | [Specific assessment] | [What to provide] |
| MRV feasibility | | [Specific assessment] | [What to provide] |
| Leakage accounting | | [Specific assessment] | [What to provide] |
| Conservative estimates | | [Specific assessment] | [What to provide] |
| Stakeholder impact | | [Specific assessment] | [What to provide] |
| Data quality standards | | [Specific assessment] | [What to provide] |

Status legend: Pass, Flag (needs revision), Fail (blocking issue)

## Reviewer Flags
1. [Specific issue a reviewer would likely raise, with rationale]
2. [Specific issue a reviewer would likely raise, with rationale]

## Required Evidence Package
- [Evidence type]: [What needs to be provided and in what format]
- [Evidence type]: [What needs to be provided and in what format]

## Estimated Review Timeline
| Stage | Duration | Notes |
|-------|----------|-------|
| Initial Submission | [X weeks] | [Preparation needed] |
| Internal Review | ~3 weeks | Standard timeline per registry handbook |
| Expert Peer Review | [X weeks] | [Based on methodology complexity] |
| Public Comment | [X weeks] | [Standard period] |
| Revisions | [X weeks] | [Based on number of flags] |
| **Total** | **[X weeks]** | |

## Precedents
[From KOI: similar methodologies that have gone through review, governance forum discussions, relevant proposals]

Sources:
- Registry Handbook: [URLs referenced]
- KOI: [document RIDs referenced]
```

## Important

The simulation disclaimer must always be included. This output shows institutional process and standards — it demonstrates that Regen has a real governance framework, not just a token issuance platform. This is what institutional investors care about.
