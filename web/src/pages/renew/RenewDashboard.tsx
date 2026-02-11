import { useRef, useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { DealDossier } from './DealDossier';
import { CreditClassMapping } from './CreditClassMapping';
import { DataAnchoring } from './DataAnchoring';
import { IntegrationBlueprint } from './IntegrationBlueprint';
import { StatCard } from '../../components/StatCard';
import { ExportButton } from '../../components/ExportButton';
import { PreparedAnalysisBanner } from '../../components/PreparedAnalysisBanner';
import { BeyondTheSprint } from '../../components/BeyondTheSprint';
import { DashboardQuery } from '../../components/DashboardQuery';
import { ChatPanel } from '../../components/ChatPanel';
import { ReadinessBreakdown } from '../../components/ReadinessBreakdown';
import { getLedgerBatches } from '../../lib/koi';
import { act2 } from '../../data/renew';
import { Gauge, Layers, CheckCircle, TrendingUp, ChevronDown } from 'lucide-react';

export function RenewDashboard() {
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
            <h1 className="text-2xl font-bold">Renew / RePlanet</h1>
            <p className="mt-2 text-base font-medium text-foreground">
              Stack biodiversity on carbon. Prove it with field data. Scale with registry credibility.
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
                Renew's five-taxa biodiversity data maps to a registry that has issued 78+ credit batches across
                carbon and biodiversity, including 2 active BioTerra projects. Carbon stacking with existing Verra
                credits is ready now — biodiversity registration follows a clear 8-week pathway.
              </p>
            )}
          </div>
          <ExportButton contentRef={contentRef} title="Renew Registry Readiness" />
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
          <StatCard icon={CheckCircle} value="2" label="Credit Classes Matched" color="text-status-maps" />
          <StatCard icon={TrendingUp} value={batchCount != null ? `${batchCount}+` : '...'} label="Batches Issued" color="text-primary" />
        </div>

        {showBreakdown && <ReadinessBreakdown client="renew" />}
      </div>

      <PreparedAnalysisBanner />

      <DashboardQuery client="renew" />

      <ChatPanel client="renew" />

      <div ref={contentRef}>
        <Tabs defaultValue="mapping">
          <TabsList className="no-print w-full justify-start">
            <TabsTrigger value="dossier" data-demo-target="Deal Dossier">Deal Dossier</TabsTrigger>
            <TabsTrigger value="mapping" data-demo-target="Credit Mapping">Credit Mapping</TabsTrigger>
            <TabsTrigger value="anchoring" data-demo-target="Data Anchoring">Data Anchoring</TabsTrigger>
            <TabsTrigger value="integration" data-demo-target="Integration">Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="dossier">
            <DealDossier />
          </TabsContent>
          <TabsContent value="mapping">
            <CreditClassMapping />
          </TabsContent>
          <TabsContent value="anchoring">
            <DataAnchoring />
          </TabsContent>
          <TabsContent value="integration">
            <IntegrationBlueprint />
          </TabsContent>
        </Tabs>
      </div>

      <BeyondTheSprint
        platformDescription="Dedicated knowledge infrastructure for Renew — your own semantic knowledge graph, custom AI tools, and web interface. Same infrastructure Regen built for itself."
        commonsDescription="With your consent, select methodology learnings and governance precedents can join a shared ecological intelligence base. Default is private; you choose what to share."
      />
    </div>
  );
}
