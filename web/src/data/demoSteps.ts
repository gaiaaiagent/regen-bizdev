export interface DemoAction {
  type: 'click-tab' | 'click-button' | 'scroll-top';
  /** For click-tab: tab trigger text. For click-button: partial button text match. */
  target?: string;
  /** Delay in ms after step starts before executing this action. */
  delay: number;
}

export interface DemoStep {
  route: string;
  act: string;
  title: string;
  notes: string;
  /** Time in ms before auto-advancing to next step. */
  duration: number;
  actions?: DemoAction[];
}

// ---------------------------------------------------------------------------
// Renew / RePlanet demo
// ---------------------------------------------------------------------------

export const renewSteps: DemoStep[] = [
  {
    route: '/',
    act: 'Act 0',
    title: 'Live Infrastructure + Track Record',
    notes:
      'Before the analysis — this registry is live. 78+ credit batches issued across 58 projects in 10+ countries, with vintage dates spanning 2012-2024. Including 2 active biodiversity projects in Colombia. That\'s the production track record. The knowledge graph and on-chain data you see are queried in real time.',
    duration: 10000,
    actions: [{ type: 'scroll-top', delay: 200 }],
  },
  {
    route: '/explore?client=renew',
    act: 'Act 0',
    title: 'Knowledge Explorer',
    notes:
      'The system is searching 69,000 documents for biodiversity credit methodology. These results are live. And on the right — entity resolution. The knowledge graph understands relationships, not just keywords. Every connection is backed by indexed documents.',
    duration: 14000,
  },
  {
    route: '/renew',
    act: 'Act 1',
    title: 'Deal Dossier',
    notes:
      'We prepared this analysis using call transcripts, prospect materials, and the knowledge graph. The live evidence panels show the actual documents that informed it. This is what a client engagement starts with.',
    duration: 10000,
    actions: [
      { type: 'scroll-top', delay: 200 },
      { type: 'click-tab', target: 'Deal Dossier', delay: 800 },
    ],
  },
  {
    route: '/renew',
    act: 'Act 1',
    title: 'Live Evidence Backing',
    notes:
      'These evidence panels query the knowledge graph right now — real registry documents, not generated summaries. Click any link to see the original source.',
    duration: 10000,
    actions: [
      { type: 'click-button', target: 'View Supporting Evidence', delay: 1000 },
    ],
  },
  {
    route: '/renew',
    act: 'Act 2',
    title: 'Credit Class Mapping',
    notes:
      'Now the differentiator. Each credit class ID — BT01, USS01, C01 — is verified live against Regen Ledger. Carbon stacking is ready to register now. BT01 biodiversity has 2 active projects already in production. This isn\'t theoretical — it\'s an operational registry.',
    duration: 12000,
    actions: [
      { type: 'click-tab', target: 'Credit Mapping', delay: 800 },
    ],
  },
  {
    route: '/renew',
    act: 'Act 2',
    title: 'Mapping Evidence',
    notes:
      'Here are the actual documents from our knowledge graph that support this mapping. Forum discussions about biodiversity credit proposals, methodology specs, the registry handbook. 69,000 documents of curated institutional knowledge — not public training data.',
    duration: 10000,
    actions: [
      { type: 'click-button', target: 'View Source Evidence', delay: 1000 },
    ],
  },
  {
    route: '/renew',
    act: 'Act 3',
    title: 'Data Anchoring',
    notes:
      'This is the trust infrastructure Mark Moore asked about. The chain stores proof, not payload. Survey data gets hashed, anchored on-chain with a timestamp, then multiple parties attest — Renew as data collector, BFI as independent verifier. Composable verification.',
    duration: 12000,
    actions: [
      { type: 'click-tab', target: 'Data Anchoring', delay: 800 },
    ],
  },
  {
    route: '/renew',
    act: 'Act 4',
    title: 'Integration Path',
    notes:
      'Here\'s the pathway: a 2-week discovery sprint maps the full credit class alignment and produces a go/no-go recommendation. Then an 8-week registry sprint for BT01 alignment, data anchoring, and integration. Carbon stacking is ready now — biodiversity follows the pathway.',
    duration: 10000,
    actions: [
      { type: 'click-tab', target: 'Integration', delay: 800 },
    ],
  },
  {
    route: '/',
    act: 'Close',
    title: 'The Pitch',
    notes:
      'The analysis you saw was prepared for this meeting. The infrastructure behind it — knowledge graph, ledger queries, entity resolution — that\'s what we deploy for clients. For Renew: carbon stacking ready now, biodiversity registration on an 8-week pathway, starting with a 2-week discovery sprint.',
    duration: 14000,
    actions: [{ type: 'scroll-top', delay: 200 }],
  },
];

// ---------------------------------------------------------------------------
// Landbanking Group demo
// ---------------------------------------------------------------------------

export const landbankingSteps: DemoStep[] = [
  {
    route: '/',
    act: 'Act 0',
    title: 'Live Infrastructure + Track Record',
    notes:
      'This registry is live and in production. 78+ credit batches issued across 58 projects in 10+ countries, vintage dates spanning 2012-2024. Including biodiversity credits already active in Colombia. This is the institutional infrastructure behind what we\'ll show you — not a prototype.',
    duration: 10000,
    actions: [{ type: 'scroll-top', delay: 200 }],
  },
  {
    route: '/explore?client=landbanking',
    act: 'Act 0',
    title: 'Knowledge Explorer',
    notes:
      'We pre-loaded queries relevant to Landbanking\'s Nature Equity approach. The system is searching 69,000 documents — governance forum discussions, methodology specs, registry handbook entries. On the right: entity resolution showing how concepts relate. This is institutional knowledge infrastructure, not a search engine.',
    duration: 14000,
  },
  {
    route: '/landbanking',
    act: 'Act 0',
    title: 'Q&A Panel',
    notes:
      'Click \'Credit class mapping\' — results appear instantly. Say: "You can ask anything. This is your knowledge base — 69,000 documents of registry methodology, governance discussions, and project precedents." Don\'t type a custom query unless this lands cleanly first.',
    duration: 12000,
    actions: [
      { type: 'scroll-top', delay: 200 },
      { type: 'click-button', target: 'Credit class mapping', delay: 1500 },
    ],
  },
  {
    route: '/landbanking',
    act: 'Act 0',
    title: 'Readiness Breakdown',
    notes:
      'Click the readiness score. Walk through: "You\'re at 4 out of 10. Carbon alignment is strong at 2 of 3. Governance is at zero — that\'s the gap. Here\'s the path to 8." Each step is concrete and specific.',
    duration: 12000,
    actions: [
      { type: 'click-button', target: 'Readiness Score', delay: 1000 },
    ],
  },
  {
    route: '/landbanking',
    act: 'Act 1',
    title: 'Deal Dossier',
    notes:
      'We prepared this analysis from both alignment memos and prospect materials. The evidence panels show the actual registry documents that informed each assessment. This is what a client engagement starts with.',
    duration: 10000,
    actions: [
      { type: 'click-tab', target: 'Deal Dossier', delay: 800 },
    ],
  },
  {
    route: '/landbanking',
    act: 'Act 1',
    title: 'Live Evidence Backing',
    notes:
      'These evidence panels query the knowledge graph right now — real registry documents, not generated summaries. Click any link to see the original source.',
    duration: 10000,
    actions: [
      { type: 'click-button', target: 'View Supporting Evidence', delay: 1000 },
    ],
  },
  {
    route: '/landbanking',
    act: 'Act 2',
    title: 'Credit Class Mapping',
    notes:
      'Carbon maps directly to C01-C09 and is ready for immediate registration. Biodiversity partially maps to BT01 — and BT01 already has 2 active projects, so this pathway is proven. Soil, water, social — those are gaps, and they\'re the partnership opportunity. We help design the credit classes that don\'t exist yet.',
    duration: 12000,
    actions: [
      { type: 'click-tab', target: 'Credit Mapping', delay: 800 },
    ],
  },
  {
    route: '/landbanking',
    act: 'Act 2',
    title: 'Mapping Evidence',
    notes:
      'Here are the actual documents that inform this mapping. Biodiversity credit type proposals from the governance forum, methodology specifications, the registry handbook. Curated institutional knowledge — not publicly available training data.',
    duration: 10000,
    actions: [
      { type: 'click-button', target: 'View Source Evidence', delay: 1000 },
    ],
  },
  {
    route: '/landbanking',
    act: 'Act 3',
    title: 'Governance Review',
    notes:
      'This is what institutional governance looks like. Not a rubber stamp — a 4-stage review process with real criteria, real reviewer flags, a realistic 24-38 week timeline. The kind of standards Hoffmann and Liechtenstein-tier investors require.',
    duration: 12000,
    actions: [
      { type: 'click-tab', target: 'Governance Review', delay: 800 },
    ],
  },
  {
    route: '/landbanking',
    act: 'Act 3',
    title: 'Reviewer Flags',
    notes:
      '"Landler Biodiversity Index is proprietary — needs independent validation." "Multi-dimensional composite has no precedent on Regen." These are the flags a real reviewer would raise. We surface them now so you can prepare evidence before formal submission.',
    duration: 10000,
    actions: [
      { type: 'click-button', target: 'View Governance Evidence', delay: 1000 },
    ],
  },
  {
    route: '/landbanking',
    act: 'Act 4',
    title: 'Verification Plan',
    notes:
      'Landler does the measuring. Regen does the governing and verifying. Each dimension gets a specialist verifier — carbon auditors, ecologists, soil labs. Data flows from Landler through content hashing to on-chain attestation. That\'s the partnership.',
    duration: 10000,
    actions: [
      { type: 'click-tab', target: 'Verification Plan', delay: 800 },
    ],
  },
  {
    route: '/',
    act: 'Close',
    title: 'The Pitch',
    notes:
      'The analysis you saw was prepared for this meeting. The infrastructure behind it — knowledge graph, ledger queries, entity resolution — that\'s what we deploy for clients. Landler measures, Regen governs and verifies. For Landbanking: carbon registration immediate, a 2-week discovery sprint to map the full pathway, then phased registration of each dimension.',
    duration: 14000,
    actions: [{ type: 'scroll-top', delay: 200 }],
  },
];
