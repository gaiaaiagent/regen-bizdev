import { act3 } from '../../data/renew';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { DataFlowDiagram } from '../../components/DataFlowDiagram';
import { Database, ArrowRight } from 'lucide-react';

export function DataAnchoring() {
  return (
    <div className="space-y-6 pt-4">
      {/* Tab Intro */}
      <p className="text-sm text-muted-foreground">
        How your biodiversity survey data gets anchored on-chain for tamper-proof verification. Each step shows the trust chain from raw field data to tradeable credits.
      </p>

      {/* Input Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="h-4 w-4 text-primary" />
            Input Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {Object.entries(act3.inputData).map(([key, value]) => (
              <div key={key} className="flex gap-2 text-sm">
                <span className="font-medium text-muted-foreground">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Data Anchoring Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <DataFlowDiagram steps={act3.steps} />
        </CardContent>
      </Card>

      {/* Flow Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">End-to-End Data Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            {act3.dataFlowSummary.split(' → ').map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <span className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium">{step}</span>
                {i < arr.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Properties */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Trust Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: 'No trust required in data collector', desc: 'Third parties verify independently — the chain is the source of truth for data integrity' },
              { title: 'No trust required in registry', desc: 'Content hash verification is cryptographic — anyone can run it' },
              { title: 'Composable verification', desc: 'Multiple attestors build cumulative trust. Investors can see who verified what and when.' },
              { title: 'Temporal proof', desc: 'On-chain timestamps prove data was collected and anchored at specific times, preventing backdating' },
            ].map((prop, i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium">{prop.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{prop.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
