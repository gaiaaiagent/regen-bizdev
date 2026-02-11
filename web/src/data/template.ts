/**
 * CLIENT DATA TEMPLATE
 *
 * Copy this file to `web/src/data/{clientslug}.ts` and fill in the values.
 * Every field is documented with its purpose and expected format.
 *
 * Minimum viable data set (enough for a functional dashboard):
 *   - Org name, slug, tagline
 *   - 1 credit class match with status
 *   - Readiness score (overall + 3-4 components + path forward)
 *   - 3 talking points
 *   - Executive summary (2-3 sentences)
 *
 * Search for "TODO" to find all fields that need filling.
 */

import type {
  Act1Data, Act2Data,
  // Choose one Act 3 variant:
  Act3DataRenew,         // Supply-side (data anchoring walkthrough)
  Act3DataLandbanking,   // Institutional (governance review simulation)
  // Choose one Act 4 variant:
  Act4DataRenew,         // Supply-side (integration blueprint)
  Act4DataLandbanking,   // Institutional (verification plan)
} from './types';
import type { ComparisonRow } from '../components/MethodologyComparison';

// --------------------------------------------------------------------------
// Score Breakdown (for ReadinessBreakdown component)
// --------------------------------------------------------------------------

export interface ScoreComponent {
  /** Short label, e.g. "Carbon methodology alignment" */
  label: string;
  /** Current score for this component */
  current: number;
  /** Maximum possible score */
  max: number;
  /** One-line description of current state */
  description: string;
}

export interface PathStep {
  /** Action to take, e.g. "Submit carbon methodology docs" */
  action: string;
  /** Score points gained by completing this step */
  gain: number;
  /** Cumulative target score after this step */
  target: number;
}

export interface ScoreBreakdown {
  components: ScoreComponent[];
  pathForward: PathStep[];
  /** The target "fully ready" score */
  targetScore: number;
}

/** TODO: Fill in score components matching your client's readiness dimensions */
export const scoreBreakdown: ScoreBreakdown = {
  components: [
    { label: 'TODO: Primary methodology alignment', current: 0, max: 3, description: 'TODO: Describe current alignment state' },
    { label: 'TODO: Secondary methodology', current: 0, max: 3, description: 'TODO: Describe secondary alignment' },
    { label: 'TODO: Data completeness', current: 0, max: 2, description: 'TODO: Describe data state' },
    { label: 'TODO: Verification pathway', current: 0, max: 2, description: 'TODO: Describe verification state' },
  ],
  pathForward: [
    { action: 'TODO: First improvement step', gain: 1, target: 1 },
    { action: 'TODO: Second improvement step', gain: 1, target: 2 },
    { action: 'TODO: Third improvement step', gain: 1, target: 3 },
    { action: 'TODO: Fourth improvement step', gain: 1, target: 4 },
  ],
  targetScore: 8,
};

// --------------------------------------------------------------------------
// Methodology Comparison (optional — for MethodologyComparison component)
// --------------------------------------------------------------------------

/**
 * Side-by-side comparison of registry requirements vs client methodology.
 * Create one array per credit class match (e.g., bt01Comparison, carbonComparison).
 */
export const primaryComparison: ComparisonRow[] = [
  // TODO: Add 6-8 rows comparing registry requirements to client methodology
  { requirement: 'TODO: Unit definition', registryExpects: 'TODO: Registry standard', clientProvides: 'TODO: Client approach', status: 'partial' },
  { requirement: 'TODO: Spatial reference', registryExpects: 'TODO: Registry standard', clientProvides: 'TODO: Client approach', status: 'partial' },
  { requirement: 'TODO: Baseline establishment', registryExpects: 'TODO: Registry standard', clientProvides: 'TODO: Client approach', status: 'aligned' },
  { requirement: 'TODO: Monitoring methodology', registryExpects: 'TODO: Registry standard', clientProvides: 'TODO: Client approach', status: 'partial' },
  { requirement: 'TODO: Additionality framework', registryExpects: 'TODO: Registry standard', clientProvides: 'TODO: Client approach', status: 'gap' },
  { requirement: 'TODO: Data anchoring', registryExpects: 'Content-hashed data on Regen Ledger', clientProvides: 'TODO: Client approach', status: 'gap' },
];

// --------------------------------------------------------------------------
// Act 1: Deal Dossier
// --------------------------------------------------------------------------

export const act1: Act1Data = {
  title: 'Deal Dossier: TODO_CLIENT_NAME',

  /** 2-3 sentence executive summary. Include: who they are, what they need, why Regen. */
  executiveSummary: 'TODO: [Client Name] is a [location]-based [type] company focused on [domain]. Key need: [primary need]. Partnership proposition: [one-line value prop].',

  /** 3-4 timeline events showing relationship progression */
  timeline: [
    { date: 'TODO: Pre-2026', event: 'TODO: Initial contact', people: 'TODO: Key people', outcome: 'TODO: Outcome' },
    { date: 'TODO: Jan 2026', event: 'TODO: Discovery phase', people: 'TODO: Key people', outcome: 'TODO: Outcome' },
    { date: 'TODO: Feb 2026', event: 'TODO: Analysis & demo prep', people: 'TODO: Key people', outcome: 'TODO: Outcome' },
  ],

  /** 4-5 client needs, ordered by priority */
  needs: [
    { need: 'TODO: Primary need', priority: 'high', evidence: 'TODO: Evidence from client materials', capability: 'TODO: Regen capability that addresses this' },
    { need: 'TODO: Secondary need', priority: 'high', evidence: 'TODO: Evidence', capability: 'TODO: Capability' },
    { need: 'TODO: Third need', priority: 'medium', evidence: 'TODO: Evidence', capability: 'TODO: Capability' },
    { need: 'TODO: Fourth need', priority: 'medium', evidence: 'TODO: Evidence', capability: 'TODO: Capability' },
  ],

  /** 3-4 risks with likelihood/impact assessment */
  risks: [
    { risk: 'TODO: Primary risk', likelihood: 'medium', impact: 'high', mitigation: 'TODO: Mitigation strategy' },
    { risk: 'TODO: Secondary risk', likelihood: 'low', impact: 'high', mitigation: 'TODO: Mitigation' },
    { risk: 'TODO: Third risk', likelihood: 'medium', impact: 'medium', mitigation: 'TODO: Mitigation' },
  ],

  /** 3-4 open items with status */
  openItems: [
    { item: 'TODO: First open item', status: 'In progress' },
    { item: 'TODO: Second open item', status: 'Not started' },
    { item: 'TODO: Third open item', status: 'Decision needed' },
  ],

  /** 3-4 talking points for the demo meeting */
  talkingPoints: [
    { title: 'TODO: First talking point', description: 'TODO: Detail' },
    { title: 'TODO: Second talking point', description: 'TODO: Detail' },
    { title: 'TODO: Third talking point', description: 'TODO: Detail' },
  ],

  /** 4-phase sprint proposal */
  sprintProposal: [
    { weeks: 'Weeks 1-2', phase: 'TODO: Phase 1 name', deliverable: 'TODO: Phase 1 deliverable' },
    { weeks: 'Weeks 3-4', phase: 'TODO: Phase 2 name', deliverable: 'TODO: Phase 2 deliverable' },
    { weeks: 'Weeks 5-6', phase: 'TODO: Phase 3 name', deliverable: 'TODO: Phase 3 deliverable' },
    { weeks: 'Weeks 7-8', phase: 'TODO: Phase 4 name', deliverable: 'TODO: Phase 4 deliverable' },
  ],

  /** Discovery sprint call-to-action */
  discoverySprint: {
    title: '2-Week Discovery Sprint',
    price: '$15-20K',
    deliverables: [
      'Full credit class mapping with live ledger verification',
      'TODO: Second deliverable',
      'TODO: Third deliverable',
      'Go/no-go recommendation with evidence package outline',
    ],
    cta: 'This dashboard is the preview. The discovery sprint makes it actionable.',
  },
};

// --------------------------------------------------------------------------
// Act 2: Credit Class Mapping
// --------------------------------------------------------------------------

export const act2: Act2Data = {
  title: 'Credit Class Mapping: TODO_ASSET_NAME',

  /** Key-value pairs summarizing the ecological asset */
  assetSummary: {
    'Asset Name': 'TODO: Asset name',
    'Proponent': 'TODO: Client name',
    'Location': 'TODO: Country / region',
    'Area': 'TODO: Hectares',
    'Methodology': 'TODO: Client methodology name',
    'Vintage Year': 'TODO: Year',
    'Verification Status': 'Unverified',
  },

  /** Asset dimensions with measurement data (baseline → current) */
  dimensions: [
    { name: 'TODO: Dimension 1', metrics: 'TODO: Unit', measurementMethod: 'TODO: Method', baseline: '0', current: '0', change: 'TODO%', confidence: 'high' },
    { name: 'TODO: Dimension 2', metrics: 'TODO: Unit', measurementMethod: 'TODO: Method', baseline: '0', current: '0', change: 'TODO%', confidence: 'medium' },
  ],

  /** Dimension → credit class mapping. status: 'maps' | 'partial' | 'gap' */
  mappings: [
    {
      dimension: 'TODO: Dimension name (metric value)',
      creditClass: 'TODO: e.g. C01-C09',
      creditClassName: 'TODO: e.g. Carbon',
      creditType: 'TODO: e.g. C (metric ton CO2e)',
      status: 'maps',
      matchDescription: 'TODO: Why this maps',
      gapDescription: 'TODO: What work remains',
    },
    {
      dimension: 'TODO: Second dimension',
      creditClass: null,     // null if no matching class exists
      creditClassName: null,
      creditType: null,
      status: 'gap',
      matchDescription: 'TODO: No matching class exists',
      gapDescription: 'TODO: Options (co-benefit metadata, new class proposal, etc.)',
    },
  ],

  /** Overall readiness assessment */
  readiness: {
    overall: 4,  // TODO: Set overall score (1-10)
    methodologyCoverage: {
      score: 2,  // TODO: Set score
      max: 5,
      description: 'TODO: Describe methodology coverage state',
    },
    dataCompleteness: {
      score: 2,  // TODO: Set score
      max: 5,
      description: 'TODO: Describe data completeness state',
    },
  },

  /** Partnership opportunities (displayed as OpportunityCards) */
  gaps: [
    { title: 'TODO: First opportunity', description: 'TODO: What we\'d do together', effort: 'TODO: Timeline', outcome: 'TODO: Expected outcome' },
    { title: 'TODO: Second opportunity', description: 'TODO: Description', effort: 'TODO: Timeline', outcome: 'TODO: Expected outcome' },
  ],

  /** Phased pathway */
  pathway: [
    { weeks: 'Weeks 1-4', phase: 'Phase 1: TODO', deliverable: 'TODO: First phase deliverable' },
    { weeks: 'Weeks 5-8', phase: 'Phase 2: TODO', deliverable: 'TODO: Second phase deliverable' },
    { weeks: 'Weeks 9-16', phase: 'Phase 3: TODO', deliverable: 'TODO: Third phase deliverable' },
    { weeks: 'Long-term', phase: 'TODO: Long-term vision', deliverable: 'TODO: Long-term deliverable' },
  ],

  /** Relevant precedents from KOI / Regen Forum */
  precedents: [
    { title: 'TODO: Precedent title', source: 'Regen Forum', url: 'https://forum.regen.network/t/TODO', description: 'TODO: Why this is relevant' },
  ],
};

// --------------------------------------------------------------------------
// Act 3: Choose ONE variant
// --------------------------------------------------------------------------

/**
 * OPTION A: Supply-side (like Renew) — Data Anchoring Walkthrough
 * Use this for project developers / data providers.
 */
export const act3_supply: Act3DataRenew = {
  type: 'data-anchoring',
  title: 'Data Anchoring: TODO_ASSET_NAME',
  inputData: {
    'TODO: Data field 1': 'TODO: Value',
    'TODO: Data field 2': 'TODO: Value',
  },
  steps: [
    { step: 1, title: 'TODO: First step', description: 'TODO: Description', onChain: false },
    { step: 2, title: 'Content hash generated', description: 'SHA-256 hash of processed data for immutable reference', onChain: true },
    { step: 3, title: 'Data anchored on Regen Ledger', description: 'Content hash anchored via MsgAnchorData', onChain: true },
    { step: 4, title: 'Attestation submitted', description: 'Data provider attests to accuracy via MsgAttest', onChain: true },
  ],
  dataFlowSummary: 'TODO: One-sentence summary of how data flows from client system to Regen Ledger.',
};

/**
 * OPTION B: Institutional (like Landbanking) — Governance Review Simulation
 * Use this for institutional / fintech clients needing governance credibility.
 */
export const act3_institutional: Act3DataLandbanking = {
  type: 'governance-review',
  title: 'Governance Review Simulation: TODO_ASSET_NAME',
  reviewStages: [
    { stage: 'Initial Submission', description: 'Methodology draft + required documentation' },
    { stage: 'Internal Review', description: 'Regen Registry science team (~3 weeks)' },
    { stage: 'Expert Peer Review', description: 'Independent expert reviewers evaluate scientific basis' },
    { stage: 'Public Comment', description: 'Community review period for stakeholder feedback' },
  ],
  checklist: [
    { name: 'Scientific basis', status: 'flag', finding: 'TODO: Current state of scientific basis', evidenceNeeded: 'TODO: What evidence is required' },
    { name: 'Additionality', status: 'flag', finding: 'TODO: Current state', evidenceNeeded: 'TODO: Required evidence' },
    { name: 'MRV feasibility', status: 'flag', finding: 'TODO: Current state', evidenceNeeded: 'TODO: Required evidence' },
    { name: 'Stakeholder impact', status: 'pass', finding: 'TODO: Current state', evidenceNeeded: 'TODO: Required evidence' },
  ],
  flags: [
    { title: 'TODO: First flag title', description: 'TODO: Description of review concern' },
  ],
  evidencePackage: [
    { type: 'Methodology white paper', description: 'TODO: What it should contain', format: 'PDF' },
  ],
  reviewTimeline: [
    { stage: 'Submission Preparation', duration: '8-12 weeks', notes: 'TODO: Notes' },
    { stage: 'Internal Review', duration: '3-4 weeks', notes: 'TODO: Notes' },
    { stage: 'Expert Peer Review', duration: '4-6 weeks', notes: 'TODO: Notes' },
    { stage: 'Public Comment', duration: '2-4 weeks', notes: 'TODO: Notes' },
  ],
};

// --------------------------------------------------------------------------
// Act 4: Choose ONE variant (matches Act 3 choice)
// --------------------------------------------------------------------------

/**
 * OPTION A: Supply-side — Integration Blueprint
 */
export const act4_supply: Act4DataRenew = {
  type: 'integration-blueprint',
  title: 'Integration Blueprint: TODO_CLIENT_NAME',
  integrationPoints: [
    { module: 'regen/data/v1', function: 'MsgAnchorData', description: 'TODO: What data gets anchored' },
    { module: 'regen/data/v1', function: 'MsgAttest', description: 'TODO: Who attests and to what' },
    { module: 'regen/ecocredit', function: 'MsgCreateBatch', description: 'TODO: Credit batch creation details' },
  ],
  sprintProposal: [
    { weeks: 'Week 1-2', phase: 'TODO: Integration phase 1', deliverable: 'TODO: Deliverable' },
    { weeks: 'Week 3-4', phase: 'TODO: Integration phase 2', deliverable: 'TODO: Deliverable' },
  ],
  developerSupport: [
    { resource: 'SDK Documentation', description: 'Regen Ledger JavaScript/TypeScript SDK', access: 'https://github.com/regen-network/regen-js' },
    { resource: 'API Reference', description: 'LCD REST endpoints for ecocredit module', access: 'https://lcd-regen.keplr.app' },
  ],
};

/**
 * OPTION B: Institutional — Verification Plan
 */
export const act4_institutional: Act4DataLandbanking = {
  type: 'verification-plan',
  title: 'Verification & MRV Plan: TODO_ASSET_NAME',
  verificationBodies: [
    { dimension: 'TODO: First dimension', verifierType: 'TODO: Type of verifier', method: 'TODO: Verification method', frequency: 'Annual', rationale: 'TODO: Why this approach' },
  ],
  monitoringSchedule: [
    { quarter: 'Y1 Q1', activity: 'Baseline across all dimensions', deliverable: 'Baseline anchored on Ledger', verifier: 'Client attestation' },
    { quarter: 'Y1 Q4', activity: 'Verification: independent audit', deliverable: 'Year 1 Report; first batch issuance', verifier: 'All verifier attestations' },
  ],
  dataFlowSteps: [
    { step: 1, action: 'Raw ecological data collected', module: '—', transaction: '—' },
    { step: 2, action: 'Content hash generated', module: 'regen/data/v1', transaction: 'MsgAnchorData' },
    { step: 3, action: 'Attestation submitted', module: 'regen/data/v1', transaction: 'MsgAttest' },
    { step: 4, action: 'Credit batch issued', module: 'regen/ecocredit', transaction: 'MsgCreateBatch' },
  ],
  costs: [
    { item: 'TODO: Verification item', cost: '$5,000 - $15,000', frequency: 'Annual', notes: 'TODO: Notes' },
    { item: 'Regen Ledger transactions', cost: '<$100', frequency: 'Per anchoring/attestation', notes: 'Negligible transaction fees' },
  ],
};

// --------------------------------------------------------------------------
// Export: Assemble the final ClientData object
// --------------------------------------------------------------------------

// Uncomment the variant you're using:

// Supply-side client (like Renew):
// export const clientData = {
//   name: 'TODO_CLIENT_NAME',
//   slug: 'TODO_CLIENT_SLUG',
//   tagline: 'TODO: One-liner outcome statement',
//   act1,
//   act2,
//   act3: act3_supply,
//   act4: act4_supply,
// };

// Institutional client (like Landbanking):
// export const clientData = {
//   name: 'TODO_CLIENT_NAME',
//   slug: 'TODO_CLIENT_SLUG',
//   tagline: 'TODO: One-liner outcome statement',
//   act1,
//   act2,
//   act3: act3_institutional,
//   act4: act4_institutional,
// };
