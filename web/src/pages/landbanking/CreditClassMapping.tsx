import { act2 } from '../../data/landbanking';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { ReadinessScore } from '../../components/ReadinessScore';
import { MappingTable } from '../../components/MappingTable';
import { OpportunityCard } from '../../components/OpportunityCard';
import { PrecedentCard } from '../../components/PrecedentCard';
import { SprintProposal } from '../../components/SprintProposal';
import { EvidenceDrawer } from '../../components/EvidenceDrawer';
import { VerraComparison } from '../../components/VerraComparison';
import { KoiLivePanel } from '../../components/KoiLivePanel';
import { LedgerLivePanel } from '../../components/LedgerLivePanel';
import { cn } from '../../lib/utils';

const confidenceStyles = {
  high: 'bg-green-50 text-green-700 border-green-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-red-50 text-red-700 border-red-200',
};

export function CreditClassMapping() {
  return (
    <div className="space-y-6 pt-4">
      {/* Tab Intro */}
      <p className="text-sm text-muted-foreground">
        Five ecological dimensions mapped to an operational registry with 78+ batches issued across 58 projects. Carbon maps directly and is ready for immediate registration. Biodiversity partially aligns. Soil, water, and social present partnership opportunities for new credit class proposals.
      </p>

      {/* Asset Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Asset Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {Object.entries(act2.assetSummary).map(([key, value]) => (
              <div key={key} className="flex gap-2 text-sm">
                <span className="font-medium text-muted-foreground">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Registration Pathway */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Registration Pathway</CardTitle>
        </CardHeader>
        <CardContent>
          <ReadinessScore
            readiness={act2.readiness}
            contextLine="Carbon dimension ready for immediate registration. 4 additional dimensions require methodology development."
          />
        </CardContent>
      </Card>

      {/* Asset Dimensions with baseline → current */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Parsed Asset Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">#</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Dimension</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Metric</th>
                  <th className="px-4 py-2 text-center font-medium text-muted-foreground">Baseline</th>
                  <th className="px-4 py-2 text-center font-medium text-muted-foreground">Current</th>
                  <th className="px-4 py-2 text-center font-medium text-muted-foreground">Change</th>
                  <th className="px-4 py-2 text-center font-medium text-muted-foreground">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {act2.dimensions.map((d, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-mono text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">{d.name}</td>
                    <td className="px-4 py-2 text-muted-foreground">{d.metrics}</td>
                    <td className="px-4 py-2 text-center">{d.baseline || '—'}</td>
                    <td className="px-4 py-2 text-center font-medium">{d.current || '—'}</td>
                    <td className="px-4 py-2 text-center text-green-600 font-medium">{d.change || '—'}</td>
                    <td className="px-4 py-2 text-center">
                      {d.confidence && (
                        <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold capitalize', confidenceStyles[d.confidence])}>
                          {d.confidence}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Credit Class Mapping Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Credit Class Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <MappingTable mappings={act2.mappings} />
          <EvidenceDrawer
            query="nature equity cocoa agroforestry carbon biodiversity credit class Regen registry"
            label="View Source Evidence"
          />
        </CardContent>
      </Card>

      {/* Verra Comparison */}
      <VerraComparison framing="institutional" />

      {/* Partnership Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Partnership Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {act2.gaps.map((g, i) => (
              <OpportunityCard key={i} gap={g} index={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Pathway */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recommended Pathway</CardTitle>
        </CardHeader>
        <CardContent>
          <SprintProposal weeks={act2.pathway} title="Phased Approach" />
        </CardContent>
      </Card>

      {/* Precedents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Relevant Precedents (KOI)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {act2.precedents.map((p, i) => (
              <PrecedentCard key={i} precedent={p} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Data */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Live Infrastructure Data
        </h3>
        <KoiLivePanel
          clientName="Landbanking Group"
          searchQuery="nature equity cocoa agroforestry carbon biodiversity credit class"
        />
        <LedgerLivePanel highlightClasses={['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08', 'C09', 'BT']} />
      </div>
    </div>
  );
}
