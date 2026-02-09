import { act2 } from '../../data/renew';
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

export function CreditClassMapping() {
  return (
    <div className="space-y-6 pt-4">
      {/* Tab Intro */}
      <p className="text-sm text-muted-foreground">
        Your asset dimensions mapped to an operational registry with 78+ batches issued across 58 projects. Shows what's ready to register now and a phased plan for the rest.
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
            contextLine="2 credit classes matched. 3 gaps identified with clear 8-week resolution pathway."
          />
        </CardContent>
      </Card>

      {/* Asset Dimensions */}
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
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Taxon / Dimension</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Metrics</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Measurement Method</th>
                </tr>
              </thead>
              <tbody>
                {act2.dimensions.map((d, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-mono text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">{d.name}</td>
                    <td className="px-4 py-2 text-muted-foreground">{d.metrics}</td>
                    <td className="px-4 py-2 text-muted-foreground">{d.measurementMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Credit Class Mapping Table — THE MONEY SHOT */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Credit Class Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <MappingTable mappings={act2.mappings} />
          <EvidenceDrawer
            query="biodiversity credit class BT01 methodology Regen Wallacea Trust"
            label="View Source Evidence"
          />
        </CardContent>
      </Card>

      {/* Verra Comparison */}
      <VerraComparison framing="complementary" />

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
          clientName="Renew/RePlanet"
          searchQuery="biodiversity credit methodology BT01 Wallacea Trust"
        />
        <LedgerLivePanel highlightClasses={['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08', 'C09', 'BT']} />
      </div>
    </div>
  );
}
