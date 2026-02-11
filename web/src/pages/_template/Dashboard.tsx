/**
 * TEMPLATE DASHBOARD
 *
 * Copy this directory to `pages/{clientslug}/` and:
 * 1. Replace all "template" imports with your client data file
 * 2. Update the client name, tagline, and metric counts
 * 3. Choose Act 3/4 tab variants (supply-side or institutional)
 * 4. Add route in App.tsx
 */

import { useRef, useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { DealDossier } from './DealDossier';
import { CreditClassMapping } from './CreditClassMapping';
// Choose Act 3: import { DataAnchoring } from './DataAnchoring';    // supply-side
// Choose Act 3: import { GovernanceReview } from './GovernanceReview'; // institutional
// Choose Act 4: import { IntegrationBlueprint } from './IntegrationBlueprint'; // supply-side
// Choose Act 4: import { VerificationPlan } from './VerificationPlan'; // institutional
import { StatCard } from '../../components/StatCard';
import { ExportButton } from '../../components/ExportButton';
import { PreparedAnalysisBanner } from '../../components/PreparedAnalysisBanner';
import { BeyondTheSprint } from '../../components/BeyondTheSprint';
import { DashboardQuery } from '../../components/DashboardQuery';
import { ReadinessBreakdown } from '../../components/ReadinessBreakdown';
import { getLedgerBatches } from '../../lib/koi';
import { act2 } from '../../data/template'; // TODO: Replace with your client data
import { Gauge, Layers, CheckCircle, TrendingUp, ChevronDown } from 'lucide-react';

export function TemplateDashboard() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [batchCount, setBatchCount] = useState<number | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    getLedgerBatches().then(b => setBatchCount(b.length)).catch(() => {});
  }, []);

  // TODO: Update these counts from your client's act2 data
  const dimensionCount = act2.dimensions.length;
  const classesMatched = act2.mappings.filter(m => m.status === 'maps' || m.status === 'partial').length;

  return (
    <div className="space-y-6">
      <div className="print-header print-only" style={{ display: 'none' }}>
        <h1>Regen Network — Registry Readiness Report</h1>
        <span className="print-date">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">TODO: Client Name</h1>
            <p className="mt-2 text-base font-medium text-foreground">
              TODO: One-liner outcome statement.
            </p>
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              About this analysis
              <ChevronDown className={`h-3 w-3 transition-transform ${showAbout ? 'rotate-180' : ''}`} />
            </button>
            {showAbout && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                TODO: 2-3 sentence description of the analysis context.
              </p>
            )}
          </div>
          <ExportButton contentRef={contentRef} title="TODO Client Name Registry Readiness" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-left"
            data-demo-target="Readiness Score"
          >
            <StatCard icon={Gauge} value={`${act2.readiness.overall}/10`} label="Readiness Score" color="text-amber-600" />
          </button>
          <StatCard icon={Layers} value={String(dimensionCount)} label="Dimensions Analyzed" />
          <StatCard icon={CheckCircle} value={String(classesMatched)} label="Credit Classes Matched" color="text-status-maps" />
          <StatCard icon={TrendingUp} value={batchCount != null ? `${batchCount}+` : '...'} label="Batches Issued" color="text-primary" />
        </div>

        {/* TODO: Update ReadinessBreakdown to accept this client slug */}
        {showBreakdown && <ReadinessBreakdown client="landbanking" />}
      </div>

      <PreparedAnalysisBanner />

      {/* TODO: Update DashboardQuery to accept this client slug */}
      <DashboardQuery client="landbanking" />

      <div ref={contentRef}>
        <Tabs defaultValue="mapping">
          <TabsList className="no-print w-full justify-start">
            <TabsTrigger value="dossier" data-demo-target="Deal Dossier">Deal Dossier</TabsTrigger>
            <TabsTrigger value="mapping" data-demo-target="Credit Mapping">Credit Mapping</TabsTrigger>
            {/* TODO: Choose Act 3 tab label: "Data Anchoring" or "Governance Review" */}
            <TabsTrigger value="act3" data-demo-target="Act 3">TODO: Act 3</TabsTrigger>
            {/* TODO: Choose Act 4 tab label: "Integration" or "Verification Plan" */}
            <TabsTrigger value="act4" data-demo-target="Act 4">TODO: Act 4</TabsTrigger>
          </TabsList>

          <TabsContent value="dossier">
            <DealDossier />
          </TabsContent>
          <TabsContent value="mapping">
            <CreditClassMapping />
          </TabsContent>
          <TabsContent value="act3">
            {/* TODO: Render chosen Act 3 component */}
            <div className="p-4 text-sm text-muted-foreground">TODO: Import and render Act 3 component</div>
          </TabsContent>
          <TabsContent value="act4">
            {/* TODO: Render chosen Act 4 component */}
            <div className="p-4 text-sm text-muted-foreground">TODO: Import and render Act 4 component</div>
          </TabsContent>
        </Tabs>
      </div>

      <BeyondTheSprint
        platformDescription="TODO: Describe the dedicated knowledge infrastructure for this client."
        commonsDescription="With your consent, select methodology insights and governance learnings can join a shared intelligence base — reducing friction for future credit classes. Default is private; you choose what to share."
      />
    </div>
  );
}
