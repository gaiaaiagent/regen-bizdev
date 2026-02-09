export type MappingStatus = 'maps' | 'partial' | 'gap';
export type Priority = 'high' | 'medium' | 'low';
export type Confidence = 'high' | 'medium' | 'low';
export type ReviewStatus = 'pass' | 'flag' | 'fail';

export interface AssetDimension {
  name: string;
  metrics: string;
  measurementMethod: string;
  baseline?: string;
  current?: string;
  change?: string;
  confidence?: Confidence;
}

export interface CreditClassMapping {
  dimension: string;
  creditClass: string | null;
  creditClassName: string | null;
  creditType: string | null;
  status: MappingStatus;
  matchDescription: string;
  gapDescription: string;
}

export interface ReadinessScore {
  overall: number;
  methodologyCoverage: { score: number; max: number; description: string };
  dataCompleteness: { score: number; max: number; description: string };
}

export interface Gap {
  title: string;
  description: string;
  effort: string;
  outcome?: string;
}

export interface DiscoverySprint {
  title: string;
  price: string;
  deliverables: string[];
  cta: string;
}

export interface ReviewCriterion {
  name: string;
  status: ReviewStatus;
  finding: string;
  evidenceNeeded: string;
}

export interface ReviewerFlag {
  title: string;
  description: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
  people: string;
  outcome: string;
}

export interface NeedAssessment {
  need: string;
  priority: Priority;
  evidence: string;
  capability: string;
}

export interface Precedent {
  title: string;
  source: string;
  url: string;
  description: string;
}

export interface SprintWeek {
  weeks: string;
  phase: string;
  deliverable: string;
}

export interface RiskAssessment {
  risk: string;
  likelihood: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  mitigation: string;
}

export interface DataFlowStep {
  step: number;
  title: string;
  description: string;
  onChain: boolean;
}

export interface VerificationBody {
  dimension: string;
  verifierType: string;
  method: string;
  frequency: string;
  rationale: string;
}

export interface CostEstimate {
  item: string;
  cost: string;
  frequency: string;
  notes: string;
}

export interface ReviewTimeline {
  stage: string;
  duration: string;
  notes: string;
}

export interface MonitoringQuarter {
  quarter: string;
  activity: string;
  deliverable: string;
  verifier: string;
}

export interface AlignmentComparison {
  dimension: string;
  approach1: string;
  approach2: string;
}

export interface OpenItem {
  item: string;
  status: string;
}

export interface TalkingPoint {
  title: string;
  description: string;
}

// Top-level client data structure
export interface ClientData {
  name: string;
  slug: string;
  tagline: string;
  act1: Act1Data;
  act2: Act2Data;
  act3: Act3DataRenew | Act3DataLandbanking;
  act4: Act4DataRenew | Act4DataLandbanking;
}

export interface Act1Data {
  title: string;
  executiveSummary: string;
  timeline: TimelineEvent[];
  needs: NeedAssessment[];
  risks: RiskAssessment[];
  openItems: OpenItem[];
  talkingPoints: TalkingPoint[];
  sprintProposal: SprintWeek[];
  discoverySprint?: DiscoverySprint;
}

export interface Act2Data {
  title: string;
  assetSummary: Record<string, string>;
  dimensions: AssetDimension[];
  mappings: CreditClassMapping[];
  readiness: ReadinessScore;
  gaps: Gap[];
  pathway: SprintWeek[];
  precedents: Precedent[];
}

// Renew Act 3: Data Anchoring
export interface Act3DataRenew {
  type: 'data-anchoring';
  title: string;
  inputData: Record<string, string>;
  steps: DataFlowStep[];
  dataFlowSummary: string;
}

// Landbanking Act 3: Governance Review
export interface Act3DataLandbanking {
  type: 'governance-review';
  title: string;
  reviewStages: { stage: string; description: string }[];
  checklist: ReviewCriterion[];
  flags: ReviewerFlag[];
  evidencePackage: { type: string; description: string; format: string }[];
  reviewTimeline: ReviewTimeline[];
}

// Renew Act 4: Integration Blueprint
export interface Act4DataRenew {
  type: 'integration-blueprint';
  title: string;
  integrationPoints: { module: string; function: string; description: string }[];
  sprintProposal: SprintWeek[];
  developerSupport: { resource: string; description: string; access: string }[];
}

// Landbanking Act 4: Verification Plan
export interface Act4DataLandbanking {
  type: 'verification-plan';
  title: string;
  verificationBodies: VerificationBody[];
  monitoringSchedule: MonitoringQuarter[];
  dataFlowSteps: { step: number; action: string; module: string; transaction: string }[];
  costs: CostEstimate[];
}
