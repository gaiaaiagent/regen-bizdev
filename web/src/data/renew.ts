import type {
  Act1Data, Act2Data, Act3DataRenew, Act4DataRenew,
} from './types';

export const act1: Act1Data = {
  title: 'Deal Dossier: Renew/RePlanet',
  executiveSummary: 'Renew/RePlanet is a UK-based biodiversity credit proponent using the Wallacea Trust v2.1 five-taxa methodology to measure ecological restoration outcomes. Their core asset is landscape-scale biodiversity monitoring across 3D Forest Structure, Invertebrates, Breeding Birds, Bat Fauna, and Higher Plants, with conservation-weighted scoring. Key need: registry infrastructure for verifiable, tradeable biodiversity credits backed by field data. Renew has existing carbon credit capability (Verra) and wants to stack biodiversity credits on Regen.',
  timeline: [
    { date: 'Pre-2026', event: 'Initial ecosystem awareness', people: 'Regen BD team', outcome: 'Renew identified as potential biodiversity credit proponent' },
    { date: 'Jan 2026', event: 'Discovery call & methodology review', people: 'Darren, Dave', outcome: 'Wallacea Trust v2.1 methodology assessed' },
    { date: 'Feb 2026', event: 'Registry readiness analysis & demo prep', people: 'Darren, Dave, Becca', outcome: 'Full 4-act analysis underway' },
  ],
  needs: [
    { need: 'Verifiable biodiversity credit issuance', priority: 'high', evidence: 'Core business model depends on trusted registry', capability: 'Regen Registry with BT01 credit class + data anchoring' },
    { need: 'Third-party data verification pathway', priority: 'high', evidence: 'BFI and institutional investors require independent verification', capability: 'regen/data/v1 module — attestation + IRI resolution' },
    { need: 'Carbon + biodiversity credit stacking', priority: 'medium', evidence: 'Existing Verra carbon credits, want to add biodiversity layer', capability: 'Multi-class credit issuance (C01-C09 + BT01)' },
    { need: 'Landscape intelligence platform integration', priority: 'medium', evidence: 'Long-term product vision for Renew platform', capability: 'SDK + API integration for data anchoring and credit queries' },
  ],
  risks: [
    { risk: 'Wallacea Trust methodology too novel for registry', likelihood: 'medium', impact: 'high', mitigation: 'Phase approach: align with BT01 first, propose extensions later' },
    { risk: 'No existing credit class covers all 5 taxa', likelihood: 'high', impact: 'medium', mitigation: 'Composite score maps to BT01; individual taxa can be co-benefits' },
    { risk: 'Data verification costs prohibitive', likelihood: 'low', impact: 'medium', mitigation: 'Acoustic + eDNA methods are cost-effective at scale' },
    { risk: 'Competing registries capture Renew first', likelihood: 'medium', impact: 'high', mitigation: 'Regen unique combo: on-chain data integrity + biodiversity credits + governance' },
  ],
  openItems: [
    { item: 'BT01 scoring framework alignment', status: 'In progress' },
    { item: 'Multi-taxa composite methodology documentation', status: 'Not started' },
    { item: 'Third-party verifier selection', status: 'Not started' },
    { item: 'Carbon stacking architecture design', status: 'Decision needed' },
  ],
  talkingPoints: [
    { title: 'Data integrity as differentiator', description: 'On-chain anchoring means anyone can verify Renew\'s biodiversity claims independently — no trust required' },
    { title: 'BT01 as starting point', description: 'BioTerra credit class is the closest match; work to align Wallacea Trust scoring with BT01 framework' },
    { title: 'Phased approach reduces risk', description: 'Start with BT01 alignment, then explore USS01 for umbrella species, then carbon stacking' },
    { title: 'Existing carbon infrastructure', description: 'Renew already issues Verra carbon credits; Regen adds biodiversity layer on top' },
  ],
  sprintProposal: [
    { weeks: 'Weeks 1-2', phase: 'BT01 Alignment', deliverable: 'Scoring framework mapping: Wallacea Trust conservation-weighted taxa → BT01 weighted 10m² score' },
    { weeks: 'Weeks 3-4', phase: 'Data Anchoring PoC', deliverable: 'Anchor sample biodiversity survey on-chain; demonstrate attestation workflow' },
    { weeks: 'Weeks 5-6', phase: 'Methodology Documentation', deliverable: 'Draft methodology submission document meeting Regen registry standards' },
    { weeks: 'Weeks 7-8', phase: 'Integration Design', deliverable: 'Technical specification for Renew platform ↔ Regen Ledger integration' },
  ],
  discoverySprint: {
    title: '2-Week Discovery Sprint',
    price: '$15-20K',
    deliverables: [
      'Full credit class mapping with live ledger verification',
      'Pre-review simulation against registry criteria',
      'Pathway document with timeline and cost estimates',
      'Go/no-go recommendation with evidence package outline',
    ],
    cta: 'This dashboard is the preview. The discovery sprint makes it actionable.',
  },
};

export const act2: Act2Data = {
  title: 'Credit Class Mapping: Wallacea Trust 5-Taxa',
  assetSummary: {
    'Methodology': 'Wallacea Trust v2.1 — Conservation-weighted biodiversity scoring',
    'Proponent': 'Renew/RePlanet (UK)',
    'Asset Type': 'Biodiversity credits from landscape-scale ecological restoration',
    'Application': 'UK restoration sites (e.g., Oakwood Manor Restoration Site, Somerset)',
  },
  dimensions: [
    { name: '3D Forest Structure', metrics: 'Canopy cover %, understory density, deadwood volume (m³/ha)', measurementMethod: 'Field survey — structural assessment' },
    { name: 'Invertebrates', metrics: 'Species richness, indicator species presence, sampling method', measurementMethod: 'Pitfall traps + sweep netting' },
    { name: 'Breeding Birds', metrics: 'Species richness, Red List species, territory mapping', measurementMethod: 'Territory mapping surveys' },
    { name: 'Bat Fauna', metrics: 'Species richness, activity index, roost sites, detector type', measurementMethod: 'Passive acoustic monitoring (AudioMoth)' },
    { name: 'Higher Plants', metrics: 'Species richness, native %, indicator species', measurementMethod: 'Botanical field survey' },
  ],
  mappings: [
    {
      dimension: 'Composite biodiversity score (all 5 taxa)',
      creditClass: 'BT01',
      creditClassName: 'BioTerra',
      creditType: 'BT (weighted 10m² score of long-term restoration/preservation)',
      status: 'partial',
      matchDescription: 'BT01 uses a weighted area-based biodiversity score; Wallacea Trust uses conservation-weighted taxa scoring. Both aggregate multi-dimensional biodiversity into a single composite, but scoring frameworks differ.',
      gapDescription: 'Wallacea Trust\'s conservation weighting (1-5 scale per taxon) needs formal mapping to BT01\'s "weighted 10m² score" framework. The conceptual approach is aligned, but unit conversion methodology must be defined.',
    },
    {
      dimension: 'Breeding Birds (Red List species, territory mapping)',
      creditClass: 'USS01',
      creditClassName: 'Umbrella Species Stewardship',
      creditType: 'USS (~1 hectare of umbrella species habitat stewarded for 1 year)',
      status: 'partial',
      matchDescription: 'USS01\'s composite index conceptually maps to bird territory monitoring. Red List species could serve as umbrella species.',
      gapDescription: 'USS01 is structured around individual umbrella species, not multi-species assemblage monitoring. Turtle Dove or Cuckoo could qualify, but methodology would need USS01 index structure.',
    },
    {
      dimension: 'Invertebrates (indicator species: Stag Beetle, White-clawed Crayfish)',
      creditClass: 'MBS01',
      creditClassName: 'Marine Biodiversity Stewardship',
      creditType: 'MBS (biodiversity activities in marine ecosystems)',
      status: 'gap',
      matchDescription: 'MBS01 is marine-specific. Terrestrial invertebrate monitoring has no direct credit class analogue.',
      gapDescription: 'No existing Regen credit class covers terrestrial invertebrate biodiversity. A terrestrial equivalent or BT01 methodology extension is needed.',
    },
    {
      dimension: 'Bat Fauna (acoustic monitoring, roost sites)',
      creditClass: 'USS01',
      creditClassName: 'Umbrella Species Stewardship',
      creditType: 'USS (see above)',
      status: 'partial',
      matchDescription: 'Bats could potentially qualify as umbrella species for woodland ecosystem health, but USS01 index structure doesn\'t accommodate acoustic monitoring data directly.',
      gapDescription: 'Acoustic monitoring data format needs integration pathway into USS01\'s composite index. Activity index and roost site metrics are valuable but not currently mapped.',
    },
    {
      dimension: 'Carbon stacking (Verra carbon + Regen biodiversity)',
      creditClass: 'C01-C09',
      creditClassName: 'Carbon',
      creditType: 'C (metric ton CO2 equivalent)',
      status: 'maps',
      matchDescription: '9 carbon credit classes on Regen Ledger. Renew already issues Verra carbon credits; Regen carbon classes provide the framework for on-chain representation.',
      gapDescription: 'Carbon stacking is technically feasible. Bridging mechanism (Verra → Regen) uses existing credit batch infrastructure.',
    },
  ],
  readiness: {
    overall: 5,
    methodologyCoverage: {
      score: 2,
      max: 5,
      description: 'Composite biodiversity score partially maps to BT01. Individual taxa have weak-to-partial matches. Carbon stacking maps well to C01-C09. Meaningful registry work needed to formalize mapping.',
    },
    dataCompleteness: {
      score: 3,
      max: 5,
      description: 'Survey data is structured and comprehensive — species richness, indicator species, conservation weighting, temporal tracking. Gaps: no content hash or attestation records yet, verification protocol not designed, conservation scoring needs peer-reviewed documentation.',
    },
  },
  gaps: [
    { title: 'BT01 Scoring Integration Sprint', description: 'We map your Wallacea Trust conservation-weighted scores to BT01 units — preserving ecological meaning while meeting registry standards. The conceptual approach is aligned; this sprint defines the formal conversion methodology.', effort: '2-3 week sprint', outcome: 'Enables first biodiversity credit batch issuance' },
    { title: 'Registry Methodology Documentation', description: 'Formalize Wallacea Trust v2.1 to meet Regen registry submission standards: scientific basis, additionality framework, MRV protocol, and data quality standards. We provide templates and guidance from prior successful submissions.', effort: '4-6 week sprint', outcome: 'Qualifies for formal registry submission' },
    { title: 'Terrestrial Invertebrate Integration', description: 'No existing credit class covers terrestrial invertebrate biodiversity. We evaluate two paths: fold into BT01 as a composite component, or propose a terrestrial biodiversity stewardship extension that creates a new credit category.', effort: '2-4 week sprint', outcome: 'Expands credit coverage to all 5 taxa' },
    { title: 'Acoustic Monitoring Evidence Pipeline', description: 'Define the pathway for AudioMoth bat fauna data into the registry evidence package: content hashing of audio files, species ID methodology, activity index calculation — all documented for verifier review.', effort: '1-2 week sprint', outcome: 'Adds acoustic data as verifiable registry evidence' },
    { title: 'Carbon Stacking Architecture', description: 'Design the technical mechanism for Verra carbon credits and Regen biodiversity credits to coexist without double-counting ecological outcomes. Builds on existing credit batch infrastructure.', effort: '2-3 week sprint', outcome: 'Unlocks dual-class credit revenue (carbon + biodiversity)' },
  ],
  pathway: [
    { weeks: 'Weeks 1-4', phase: 'Phase 1: BT01 Alignment', deliverable: 'Define conversion methodology from conservation-weighted taxa scores to BT01 units. Target BT01 as primary credit class.' },
    { weeks: 'Weeks 5-8', phase: 'Phase 2: Registry Submission Prep', deliverable: 'Document adapted methodology to Regen registry standards. Prepare evidence package: scientific basis, peer review, sample data with content hashes.' },
    { weeks: 'Weeks 9-12', phase: 'Phase 3: USS01 Extension', deliverable: 'Evaluate Red List species (Turtle Dove, Cuckoo) for USS01 umbrella species designation. Secondary credit pathway.' },
    { weeks: 'Ongoing', phase: 'Phase 4: Carbon Stacking', deliverable: 'Implement Verra carbon credit bridging for dual-class issuance (carbon + biodiversity) for same restoration sites.' },
  ],
  precedents: [
    { title: 'Biodiversity Credit Type Proposal', source: 'Regen Forum, topic 49', url: 'https://forum.regen.network/t/new-credit-type-proposal-biodiversity/49', description: 'Proposal for voluntary biodiversity credits on-chain, representing units of habitat conservation or restoration action.' },
    { title: 'Desert Regreening Credit Class Proposal', source: 'Regen Forum, topic 490', url: 'https://forum.regen.network/t/feedback-request-desert-regreening-credit-class-proposal/490', description: 'Uses a functional biodiversity index alongside carbon sequestration. Demonstrates precedent for multi-dimensional ecological credits.' },
    { title: 'Natural Capital Tools Collaboration', source: 'Regen Forum, topic 101', url: 'https://forum.regen.network/t/natural-capital-tools-collab-regen-network-x-basin/101', description: 'Collaboration on natural capital measurement tools. Relevant to Renew\'s landscape intelligence positioning.' },
  ],
};

export const act3: Act3DataRenew = {
  type: 'data-anchoring',
  title: 'Data Anchoring Walkthrough: UK Biodiversity Survey',
  inputData: {
    'Source': 'uk-restoration-biodiversity-survey.json',
    'Site': 'Oakwood Manor Restoration Site, Somerset, UK',
    'Methodology': 'Wallacea Trust v2.1',
    'Survey Date': '2025-09-15',
    'Composite Score': '56.2 (baseline: 31.8, +76.7% change)',
  },
  steps: [
    { step: 1, title: 'Content Hashing', description: 'Survey JSON is hashed using SHA-256 / BLAKE2B-256. The content hash is deterministic — anyone with the original JSON can recompute and verify it matches the on-chain record.', onChain: false },
    { step: 2, title: 'Anchoring (MsgAnchorData)', description: 'Content hash submitted to Regen Ledger. Creates immutable on-chain record: content hash, timestamp, sender address. The chain stores proof, not payload.', onChain: true },
    { step: 3, title: 'Attestation (MsgAttest)', description: 'Renew signs attestation — formal statement that data is accurate. Like signing a legal document. Multiple parties can attest to same content hash, creating chain of verification.', onChain: true },
    { step: 4, title: 'IRI Resolution', description: 'Anchored data receives metadata IRI (regen:13toV...). Any party queries api.regen.network, receives off-chain content, computes hash, and verifies against on-chain record.', onChain: false },
    { step: 5, title: 'Third-Party Verification', description: 'BFI discovers IRI → resolves data → verifies hash integrity → reviews attestations → verifies content → optionally adds own attestation. No trust required in Renew or Regen.', onChain: true },
    { step: 6, title: 'Credit Batch Issuance', description: 'Anchored and attested data becomes evidence package. MsgCreateBatch issued under BT01, metadata IRI references the anchored survey data. Credits tradeable with full provenance.', onChain: true },
  ],
  dataFlowSummary: 'Field Survey → Process & QA → MsgAnchorData → MsgAttest (Renew) → MsgAttest (BFI) → Credit Batch → Marketplace',
};

export const act4: Act4DataRenew = {
  type: 'integration-blueprint',
  title: 'Integration Blueprint: Renew Platform × Regen Ledger',
  integrationPoints: [
    { module: 'regen/data/v1', function: 'MsgAnchorData', description: 'Anchor biodiversity survey data with content hash. Establishes on-chain proof of data at specific timestamp.' },
    { module: 'regen/data/v1', function: 'MsgAttest', description: 'Sign attestation on anchored data. Creates legally meaningful on-chain statement about data accuracy.' },
    { module: 'regen/data/v1', function: 'Resolve IRI', description: 'Retrieve off-chain data via metadata IRI. Enables third-party verification of data integrity.' },
    { module: 'regen/ecocredit', function: 'MsgCreateClass', description: 'Register methodology as credit class (if new class needed). Defines credit type, metadata schema, admin.' },
    { module: 'regen/ecocredit', function: 'MsgCreateProject', description: 'Register Oakwood Manor as project under BT01. Links project to credit class and geographic location.' },
    { module: 'regen/ecocredit', function: 'MsgCreateBatch', description: 'Issue credit batch referencing anchored data. Creates tradeable credits with full provenance chain.' },
  ],
  sprintProposal: [
    { weeks: 'Weeks 1-2', phase: 'Foundation', deliverable: 'SDK setup, testnet account, first MsgAnchorData transaction with sample survey data' },
    { weeks: 'Weeks 3-4', phase: 'Data Pipeline', deliverable: 'Automated anchoring: Renew survey export → content hash → MsgAnchorData → attestation' },
    { weeks: 'Weeks 5-6', phase: 'Credit Issuance', deliverable: 'Project registration under BT01, test batch issuance, metadata IRI resolution verification' },
    { weeks: 'Weeks 7-8', phase: 'Production Prep', deliverable: 'Mainnet deployment plan, key management, monitoring, error handling, API security' },
  ],
  developerSupport: [
    { resource: 'Regen SDK (Go)', description: 'Full Ledger client library', access: 'GitHub: regen-network/regen-ledger' },
    { resource: 'CosmJS', description: 'TypeScript/JavaScript client', access: 'npm: @regen-network/api' },
    { resource: 'API documentation', description: 'REST + gRPC reference', access: 'guides.regen.network' },
    { resource: 'Testnet faucet', description: 'Test REGEN tokens', access: 'Discord' },
    { resource: 'Integration examples', description: 'Sample code for anchoring/attestation/issuance', access: 'Provided during onboarding' },
    { resource: 'Developer support', description: 'Dedicated integration contact', access: 'Assigned at pilot kickoff' },
  ],
};
