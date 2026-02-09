import { useRef, useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { DealDossier } from './DealDossier';
import { CreditClassMapping } from './CreditClassMapping';
import { DataAnchoring } from './DataAnchoring';
import { IntegrationBlueprint } from './IntegrationBlueprint';
import { StatCard } from '../../components/StatCard';
import { ExportButton } from '../../components/ExportButton';
import { getLedgerBatches } from '../../lib/koi';
import { Gauge, Layers, CheckCircle, TrendingUp } from 'lucide-react';

export function RenewDashboard() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [batchCount, setBatchCount] = useState<number | null>(null);

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
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Renew's five-taxa biodiversity data maps to a registry that has issued 78+ credit batches across
              carbon and biodiversity, including 2 active BioTerra projects. Carbon stacking with existing Verra
              credits is ready now — biodiversity registration follows a clear 8-week pathway.
            </p>
          </div>
          <ExportButton contentRef={contentRef} title="Renew Registry Readiness" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard icon={Gauge} value="5/10" label="Readiness Score" color="text-amber-600" />
          <StatCard icon={Layers} value="5" label="Dimensions Analyzed" />
          <StatCard icon={CheckCircle} value="2" label="Credit Classes Matched" color="text-status-maps" />
          <StatCard icon={TrendingUp} value={batchCount != null ? `${batchCount}+` : '...'} label="Batches Issued" color="text-primary" />
        </div>
      </div>

      <div ref={contentRef}>
        <Tabs defaultValue="mapping">
          <TabsList className="no-print w-full justify-start">
            <TabsTrigger value="dossier">Deal Dossier</TabsTrigger>
            <TabsTrigger value="mapping">Credit Mapping</TabsTrigger>
            <TabsTrigger value="anchoring">Data Anchoring</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
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
    </div>
  );
}
