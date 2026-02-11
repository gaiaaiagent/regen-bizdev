import { useRef, useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { DealDossier } from './DealDossier';
import { CreditClassMapping } from './CreditClassMapping';
import { GovernanceReview } from './GovernanceReview';
import { VerificationPlan } from './VerificationPlan';
import { StatCard } from '../../components/StatCard';
import { ExportButton } from '../../components/ExportButton';
import { PreparedAnalysisBanner } from '../../components/PreparedAnalysisBanner';
import { BeyondTheSprint } from '../../components/BeyondTheSprint';
import { DashboardQuery } from '../../components/DashboardQuery';
import { ReadinessBreakdown } from '../../components/ReadinessBreakdown';
import { getLedgerBatches } from '../../lib/koi';
import { act2 } from '../../data/landbanking';
import { Gauge, Layers, CheckCircle, TrendingUp, ChevronDown } from 'lucide-react';

export function LandbankingDashboard() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [batchCount, setBatchCount] = useState<number | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    getLedgerBatches().then(b => setBatchCount(b.length)).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      {/* Print-only header */}
      <div className="print-header print-only" style={{ display: 'none' }}>
        <h1>Regen Network — Registry Readiness Report</h1>
        <span className="print-date">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      {/* Dashboard Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Landbanking Group</h1>
            <p className="mt-2 text-base font-medium text-foreground">
              Cut registry overhead. Increase speed. Maintain fidelity.
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
                Landbanking's Nature Equity Assets gain institutional credibility through independent registry
                governance. Carbon registration is immediate. Biodiversity, soil, water, and social dimensions
                follow a phased pathway — each adding verified value to the composite score.
              </p>
            )}
          </div>
          <ExportButton contentRef={contentRef} title="Landbanking Registry Readiness" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-left"
            data-demo-target="Readiness Score"
          >
            <StatCard icon={Gauge} value={`${act2.readiness.overall}/10`} label="Readiness Score" color="text-amber-600" />
          </button>
          <StatCard icon={Layers} value="5" label="Dimensions Analyzed" />
          <StatCard icon={CheckCircle} value="1" label="Credit Classes Matched" color="text-status-maps" />
          <StatCard icon={TrendingUp} value={batchCount != null ? `${batchCount}+` : '...'} label="Batches Issued" color="text-primary" />
        </div>

        {showBreakdown && <ReadinessBreakdown client="landbanking" />}
      </div>

      <PreparedAnalysisBanner />

      <DashboardQuery client="landbanking" />

      <div ref={contentRef}>
        <Tabs defaultValue="mapping">
          <TabsList className="no-print w-full justify-start">
            <TabsTrigger value="dossier" data-demo-target="Deal Dossier">Deal Dossier</TabsTrigger>
            <TabsTrigger value="mapping" data-demo-target="Credit Mapping">Credit Mapping</TabsTrigger>
            <TabsTrigger value="governance" data-demo-target="Governance Review">Governance Review</TabsTrigger>
            <TabsTrigger value="verification" data-demo-target="Verification Plan">Verification Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="dossier">
            <DealDossier />
          </TabsContent>
          <TabsContent value="mapping">
            <CreditClassMapping />
          </TabsContent>
          <TabsContent value="governance">
            <GovernanceReview />
          </TabsContent>
          <TabsContent value="verification">
            <VerificationPlan />
          </TabsContent>
        </Tabs>
      </div>

      <BeyondTheSprint
        platformDescription="Dedicated knowledge infrastructure for Landbanking — ecological assessment data, Landler methodology docs, and verification evidence in a semantic knowledge graph with AI tools tuned to natural capital finance."
        commonsDescription="With your consent, select methodology insights and governance learnings can join a shared intelligence base — reducing friction for future credit classes. Default is private; you choose what to share."
      />
    </div>
  );
}
