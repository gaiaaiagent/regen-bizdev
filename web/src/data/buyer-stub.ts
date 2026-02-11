/**
 * BUYER STUB — Buy-Side Demo Data
 *
 * This is NOT a real client. It's a template showing how the same infrastructure
 * serves buy-side personas (CSOs, investors, corporate sustainability).
 *
 * Vocabulary is reframed: "Portfolio Assessment" instead of "Credit Class Mapping",
 * "Due Diligence Score" instead of "Readiness Score", etc.
 */

import type {
  Act1Data, Act2Data, Act3DataLandbanking, Act4DataLandbanking,
} from './types';
import type { ComparisonRow } from '../components/MethodologyComparison';

export interface ScoreComponent {
  label: string;
  current: number;
  max: number;
  description: string;
}

export interface PathStep {
  action: string;
  gain: number;
  target: number;
}

export interface ScoreBreakdown {
  components: ScoreComponent[];
  pathForward: PathStep[];
  targetScore: number;
}

export const scoreBreakdown: ScoreBreakdown = {
  components: [
    { label: 'Verification status', current: 2, max: 3, description: 'Third-party verified for carbon (C-class). Biodiversity verification in progress.' },
    { label: 'Permanence risk', current: 1, max: 2, description: 'Carbon has 25-year buffer pool. Biodiversity permanence framework not yet defined.' },
    { label: 'Methodology quality', current: 2, max: 3, description: 'C-class methodology peer-reviewed. BT01 methodology transparent but newer.' },
    { label: 'Market liquidity', current: 1, max: 2, description: 'Carbon credits tradeable on existing markets. Biodiversity credit market emerging.' },
  ],
  pathForward: [
    { action: 'Confirm BT01 biodiversity verification pathway', gain: 1, target: 7 },
    { action: 'Establish permanence buffer for biodiversity credits', gain: 1, target: 8 },
    { action: 'Secondary market listing for portfolio liquidity', gain: 1, target: 9 },
  ],
  targetScore: 9,
};

export const creditQualityComparison: ComparisonRow[] = [
  { requirement: 'Additionality evidence', registryExpects: 'Documented counterfactual with baseline', clientProvides: 'Carbon: full counterfactual. Biodiversity: baseline established, counterfactual in progress.', status: 'partial' },
  { requirement: 'Permanence assurance', registryExpects: 'Buffer pool or insurance mechanism', clientProvides: 'Carbon: 25-year buffer pool. Biodiversity: not yet formalized.', status: 'partial' },
  { requirement: 'Third-party verification', registryExpects: 'Accredited auditor attestation', clientProvides: 'Carbon: Bureau Veritas verified. Biodiversity: BFI identified, not formalized.', status: 'partial' },
  { requirement: 'Data transparency', registryExpects: 'Content-hashed, on-chain verifiable', clientProvides: 'Data anchored on Regen Ledger with IRI resolution.', status: 'aligned' },
  { requirement: 'Governance track record', registryExpects: 'Methodology approved through governance process', clientProvides: 'Carbon methodology approved. Biodiversity under review.', status: 'partial' },
  { requirement: 'Regulatory alignment', registryExpects: 'ICROA, ICVCM, or equivalent compliance', clientProvides: 'Carbon ICROA-eligible. Biodiversity credit regulatory status varies by jurisdiction.', status: 'partial' },
];

export const act1: Act1Data = {
  title: 'Investment Thesis: Regen Ecological Credits',
  executiveSummary: 'Regen Network operates the only ecological credit registry with on-chain governance, transparent methodology review, and content-hashed data anchoring. Portfolio includes 78+ credit batches across carbon (C01-C09), biodiversity (BT01), and emerging credit types (soil, marine, urban), spanning 58 projects in 13+ countries. For buyers seeking high-integrity ecological credits with full auditability, Regen offers institutional-grade transparency unavailable from legacy registries.',
  timeline: [
    { date: 'Est. 2017', event: 'Regen Network founded', people: 'Gregory Landua, CEO', outcome: 'Blockchain-based ecological credit infrastructure' },
    { date: '2020-2023', event: 'Registry operational', people: 'Regen Registry team', outcome: '78 credit batches issued, 58 projects registered' },
    { date: '2024-2025', event: 'BT01 Biodiversity credits launch', people: 'Registry + methodology teams', outcome: '2 active biodiversity projects (Colombia)' },
    { date: '2026', event: 'AI-powered analysis infrastructure', people: 'Regen AI team', outcome: '69K+ document knowledge graph, automated due diligence' },
  ],
  needs: [
    { need: 'High-integrity carbon credits', priority: 'high', evidence: 'ICROA/ICVCM compliance requirements tightening', capability: '13 carbon credit classes (C01-C09) with peer-reviewed methodologies' },
    { need: 'Biodiversity credit exposure', priority: 'high', evidence: 'Emerging regulatory frameworks (EU Biodiversity Strategy, Kunming-Montreal)', capability: 'BT01 BioTerra credit class — operational, 2 active projects' },
    { need: 'Full data auditability', priority: 'medium', evidence: 'Greenwashing risk, ESG reporting requirements', capability: 'Content-hashed data on Regen Ledger — every claim is verifiable' },
    { need: 'Portfolio diversification', priority: 'medium', evidence: 'Multi-credit-type portfolio reduces concentration risk', capability: '5 credit types (carbon, biodiversity, marine, soil, urban)' },
  ],
  risks: [
    { risk: 'Biodiversity credit market immaturity', likelihood: 'high', impact: 'medium', mitigation: 'Carbon credits provide immediate, established value. Biodiversity is growth exposure.' },
    { risk: 'Regulatory uncertainty on blockchain-based credits', likelihood: 'medium', impact: 'medium', mitigation: 'Regen credits are methodology-first — blockchain is infrastructure, not the product.' },
    { risk: 'Limited secondary market liquidity', likelihood: 'medium', impact: 'medium', mitigation: 'Carbon credits tradeable via existing channels. Biodiversity credits OTC for now.' },
  ],
  openItems: [
    { item: 'BT01 biodiversity credit verification finalization', status: 'In progress' },
    { item: 'Secondary market listing for BT credits', status: 'Planned Q3 2026' },
    { item: 'Soil health credit class (SH01) proposal', status: 'Under governance review' },
  ],
  talkingPoints: [
    { title: 'On-chain governance', description: 'Every methodology goes through transparent, auditable governance review — no black-box approvals' },
    { title: 'Data anchoring = auditability', description: 'Content-hashed data on Regen Ledger means every credit is traceable to its source evidence' },
    { title: 'Multi-credit-type portfolio', description: 'Carbon + biodiversity + emerging types = diversified ecological impact portfolio' },
    { title: 'AI-powered due diligence', description: '69K+ document knowledge graph enables automated analysis across registry history' },
  ],
  sprintProposal: [
    { weeks: 'Week 1', phase: 'Portfolio Screening', deliverable: 'Map buyer criteria to available credit classes; identify highest-fit opportunities' },
    { weeks: 'Week 2', phase: 'Credit Quality Analysis', deliverable: 'Deep-dive on 2-3 target credit classes: methodology, verification, permanence' },
    { weeks: 'Week 3', phase: 'Risk Assessment', deliverable: 'Due diligence report: additionality, permanence, regulatory, counterparty risks' },
    { weeks: 'Week 4', phase: 'Recommendation', deliverable: 'Buy/hold/pass recommendation with evidence package and pricing guidance' },
  ],
  discoverySprint: {
    title: 'Due Diligence Package',
    price: '$10-15K',
    deliverables: [
      'Portfolio screening against 13 credit classes',
      'Credit quality analysis with live ledger verification',
      'Risk assessment: permanence, additionality, regulatory alignment',
      'Buy/hold/pass recommendation with full evidence package',
    ],
    cta: 'This dashboard is the preview. The due diligence package makes it actionable.',
  },
};

export const act2: Act2Data = {
  title: 'Portfolio Assessment: Regen Registry Credits',
  assetSummary: {
    'Registry': 'Regen Network',
    'Total Batches': '78+',
    'Active Projects': '58',
    'Countries': '13+',
    'Credit Types': '5 (Carbon, Biodiversity, Marine, Soil, Urban)',
    'Verification Standard': 'Registry governance + third-party verification',
    'Data Integrity': 'Content-hashed on Regen Ledger (on-chain)',
  },
  dimensions: [
    { name: 'Carbon Credits (C01-C09)', metrics: 'tCO2e', measurementMethod: 'Methodology-specific (varies by class)', baseline: 'Established', current: '60+ batches', change: 'Operational', confidence: 'high' },
    { name: 'Biodiversity Credits (BT01)', metrics: 'Weighted 10m² score', measurementMethod: 'BioTerra methodology', baseline: '2 projects', current: '2 active batches', change: 'Growing', confidence: 'medium' },
    { name: 'Marine Credits (MBS01)', metrics: 'Marine biodiversity score', measurementMethod: 'Marine methodology', baseline: '1 class', current: 'Early stage', change: 'Emerging', confidence: 'low' },
  ],
  mappings: [
    {
      dimension: 'Carbon (tCO2e)',
      creditClass: 'C01-C09',
      creditClassName: 'Carbon',
      creditType: 'C (metric ton CO2e)',
      status: 'maps',
      matchDescription: 'Established carbon credit classes with 60+ batches issued. Well-understood methodology and verification.',
      gapDescription: 'Minimal — carbon credits are the most mature offering.',
    },
    {
      dimension: 'Biodiversity (BT01)',
      creditClass: 'BT01',
      creditClassName: 'BioTerra',
      creditType: 'BT (weighted 10m²)',
      status: 'partial',
      matchDescription: 'Operational biodiversity credit class with 2 active projects. Growing but newer than carbon.',
      gapDescription: 'Market still emerging. Secondary market liquidity limited. Verification ecosystem developing.',
    },
    {
      dimension: 'Marine Biodiversity (MBS01)',
      creditClass: 'MBS01',
      creditClassName: 'Marine Biodiversity',
      creditType: 'MBS',
      status: 'gap',
      matchDescription: 'Credit class defined but very early stage.',
      gapDescription: 'No batches issued yet. High potential but pre-market.',
    },
  ],
  readiness: {
    overall: 6,
    methodologyCoverage: {
      score: 3,
      max: 5,
      description: 'Carbon methodology well-established (C01-C09). Biodiversity operational (BT01). Marine/soil/urban in early stages.',
    },
    dataCompleteness: {
      score: 3,
      max: 5,
      description: 'Full data transparency for carbon and biodiversity (on-chain anchoring). Emerging credit types have less track record.',
    },
  },
  gaps: [
    { title: 'Biodiversity Credit Deepening', description: 'Expand BT01 project pipeline beyond Colombia. Support methodology adoption in new bioregions.', effort: 'Ongoing', outcome: 'Broader biodiversity credit portfolio' },
    { title: 'Secondary Market Development', description: 'Establish trading venues for BT01 and emerging credit types. Currently OTC only.', effort: '2026 roadmap', outcome: 'Portfolio liquidity for buyers' },
    { title: 'Soil Health Credit Class', description: 'Proposed SH01 credit class for soil organic carbon. Under governance review.', effort: 'Governance review', outcome: 'New credit type for portfolio diversification' },
  ],
  pathway: [
    { weeks: 'Now', phase: 'Carbon: Portfolio-Ready', deliverable: '60+ batches, verified, tradeable. Immediate purchase available.' },
    { weeks: 'Q1-Q2 2026', phase: 'Biodiversity: Growth Phase', deliverable: 'BT01 pipeline expanding. New projects in Kenya, Indonesia expected.' },
    { weeks: 'Q3-Q4 2026', phase: 'Multi-Type Portfolio', deliverable: 'Soil, marine credit classes reaching operational status.' },
    { weeks: '2027+', phase: 'Full Ecological Portfolio', deliverable: 'Diversified credits across carbon, biodiversity, soil, water, marine.' },
  ],
  precedents: [
    { title: 'BioTerra Credit Type', source: 'Regen Registry', url: 'https://registry.regen.network', description: 'Operational biodiversity credit with on-chain governance and transparent methodology.' },
    { title: 'Biodiversity Credit Markets Report', source: 'Ecosystem Marketplace', url: 'https://www.ecosystemmarketplace.com', description: 'Market analysis of emerging biodiversity credit demand and pricing.' },
  ],
};

export const act3: Act3DataLandbanking = {
  type: 'governance-review',
  title: 'Risk Assessment: Regen Ecological Credits',
  reviewStages: [
    { stage: 'Counterparty Due Diligence', description: 'Regen Network Inc. — corporate structure, team, funding, regulatory status' },
    { stage: 'Methodology Quality Review', description: 'Independent assessment of credit class methodologies against ICVCM standards' },
    { stage: 'Verification Audit Trail', description: 'Third-party verifier attestations, data anchoring completeness' },
    { stage: 'Market Risk Assessment', description: 'Liquidity, pricing stability, regulatory trajectory' },
  ],
  checklist: [
    { name: 'Methodology transparency', status: 'pass', finding: 'All methodologies publicly available, governance-reviewed, and documented on-chain.', evidenceNeeded: 'Available via Regen Registry and governance forum' },
    { name: 'Verification independence', status: 'pass', finding: 'Third-party verifiers (Bureau Veritas, SCS Global) provide independent attestation for carbon. Biodiversity uses independent ecologists.', evidenceNeeded: 'Verifier attestations on Regen Ledger' },
    { name: 'Data integrity', status: 'pass', finding: 'Content-hashed data anchored on Regen Ledger. Any third party can verify data integrity via IRI resolution.', evidenceNeeded: 'On-chain anchoring records' },
    { name: 'Permanence assurance', status: 'flag', finding: 'Carbon: 25-year buffer pool established. Biodiversity: permanence framework in development. Emerging types: not yet defined.', evidenceNeeded: 'Biodiversity permanence framework publication' },
    { name: 'Regulatory alignment', status: 'flag', finding: 'Carbon credits ICROA-eligible. Biodiversity credits regulatory status varies. Blockchain-based registry adds novel regulatory questions.', evidenceNeeded: 'Jurisdiction-specific regulatory analysis' },
    { name: 'Market liquidity', status: 'flag', finding: 'Carbon: tradeable on established markets. BT01: OTC only. Emerging types: pre-market.', evidenceNeeded: 'Secondary market development timeline' },
  ],
  flags: [
    { title: 'Biodiversity credit market maturity', description: 'BT01 is operational but the broader biodiversity credit market is nascent. Pricing benchmarks and demand signals are still forming. Early-mover advantage exists but with higher uncertainty.' },
    { title: 'Regulatory landscape', description: 'Blockchain-based registries are gaining acceptance but regulatory frameworks vary by jurisdiction. Carbon is well-understood; biodiversity and emerging types face more regulatory uncertainty.' },
  ],
  evidencePackage: [
    { type: 'Registry governance records', description: 'Complete methodology review history, vote records, expert reviewer reports', format: 'On-chain + PDF' },
    { type: 'Verifier attestations', description: 'Independent auditor reports for carbon and biodiversity projects', format: 'On-chain attestation + PDF report' },
    { type: 'Market analysis', description: 'Pricing data, volume trends, comparable transactions', format: 'PDF' },
  ],
  reviewTimeline: [
    { stage: 'Initial Screening', duration: '1 week', notes: 'Portfolio fit assessment against buyer criteria' },
    { stage: 'Deep Due Diligence', duration: '2-3 weeks', notes: 'Methodology, verification, permanence analysis' },
    { stage: 'Risk Report', duration: '1 week', notes: 'Final risk assessment and recommendation' },
  ],
};

export const act4: Act4DataLandbanking = {
  type: 'verification-plan',
  title: 'Compliance Roadmap: Ecological Credit Portfolio',
  verificationBodies: [
    { dimension: 'Carbon Credits', verifierType: 'Accredited carbon auditor', method: 'Standard carbon verification against approved methodology', frequency: 'Annual', rationale: 'Well-established verification ecosystem' },
    { dimension: 'Biodiversity Credits', verifierType: 'Independent ecologist + laboratory', method: 'Methodology-specific verification (BT01 protocol)', frequency: 'Annual', rationale: 'Emerging verification standards — select experienced practitioners' },
  ],
  monitoringSchedule: [
    { quarter: 'Purchase', activity: 'Due diligence completion; credit acquisition', deliverable: 'Due diligence report + purchase agreement', verifier: 'Internal compliance' },
    { quarter: 'Q1 Post-Purchase', activity: 'Portfolio setup; retirement schedule planning', deliverable: 'Portfolio monitoring dashboard', verifier: '—' },
    { quarter: 'Annual', activity: 'Credit verification confirmation; portfolio rebalancing', deliverable: 'Annual verification confirmation; ESG report data', verifier: 'Third-party verifier' },
  ],
  dataFlowSteps: [
    { step: 1, action: 'Buyer queries credit quality via knowledge graph', module: 'KOI API', transaction: 'Query' },
    { step: 2, action: 'Buyer verifies data integrity via Regen Ledger', module: 'regen/data/v1', transaction: 'IRI Resolution' },
    { step: 3, action: 'Credits purchased and transferred', module: 'regen/ecocredit', transaction: 'MsgSend' },
    { step: 4, action: 'Credits retired for ESG reporting', module: 'regen/ecocredit', transaction: 'MsgRetire' },
  ],
  costs: [
    { item: 'Due diligence package', cost: '$10,000 - $15,000', frequency: 'One-time', notes: 'AI-accelerated analysis reduces cost vs traditional DD' },
    { item: 'Annual portfolio monitoring', cost: '$2,000 - $5,000', frequency: 'Annual', notes: 'Automated via knowledge graph — primarily expert review' },
    { item: 'Credit purchases', cost: 'Market rate', frequency: 'Per transaction', notes: 'Pricing varies by credit type, vintage, and volume' },
  ],
};
