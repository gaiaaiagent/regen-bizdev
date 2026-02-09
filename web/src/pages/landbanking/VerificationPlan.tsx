import { act4 } from '../../data/landbanking';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { ClipboardCheck, DollarSign, Calendar, Database } from 'lucide-react';

export function VerificationPlan() {
  return (
    <div className="space-y-6 pt-4">
      {/* Tab Intro */}
      <p className="text-sm text-muted-foreground">
        Dimension-by-dimension verification bodies, 2-year monitoring schedule, on-chain data flow, and cost estimates for independent MRV across all 5 ecological dimensions.
      </p>

      {/* Verification Bodies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            Verification Bodies by Dimension
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Dimension</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Verifier Type</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Method</th>
                  <th className="px-4 py-2 text-center font-medium text-muted-foreground">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {act4.verificationBodies.map((vb, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium">{vb.dimension}</td>
                    <td className="px-4 py-2 text-muted-foreground">{vb.verifierType}</td>
                    <td className="px-4 py-2 text-muted-foreground">{vb.method}</td>
                    <td className="px-4 py-2 text-center">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{vb.frequency}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4 text-primary" />
            Monitoring Schedule (Year 1-2)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Quarter</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Activity</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Deliverable</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Verifier</th>
                </tr>
              </thead>
              <tbody>
                {act4.monitoringSchedule.map((q, i) => (
                  <tr key={i} className={`border-b last:border-b-0 ${q.quarter.startsWith('Y2') ? 'bg-muted/10' : ''}`}>
                    <td className="px-4 py-2 font-mono text-xs font-semibold">{q.quarter}</td>
                    <td className="px-4 py-2">{q.activity}</td>
                    <td className="px-4 py-2 text-muted-foreground">{q.deliverable}</td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">{q.verifier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* On-Chain Data Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="h-4 w-4 text-primary" />
            On-Chain Data Flow per Verification Cycle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-center font-medium text-muted-foreground">Step</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Action</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Module</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Transaction</th>
                </tr>
              </thead>
              <tbody>
                {act4.dataFlowSteps.map((s, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 text-center font-mono text-muted-foreground">{s.step}</td>
                    <td className="px-4 py-2">{s.action}</td>
                    <td className="px-4 py-2 font-mono text-xs text-primary">{s.module}</td>
                    <td className="px-4 py-2 font-mono text-xs">{s.transaction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cost Estimates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="h-4 w-4 text-primary" />
            Verification Cost Estimates (per cycle)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Item</th>
                  <th className="px-4 py-2 text-right font-medium text-muted-foreground">Cost</th>
                  <th className="px-4 py-2 text-center font-medium text-muted-foreground">Frequency</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {act4.costs.map((c, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium">{c.item}</td>
                    <td className="px-4 py-2 text-right font-mono text-xs">{c.cost}</td>
                    <td className="px-4 py-2 text-center text-xs text-muted-foreground">{c.frequency}</td>
                    <td className="px-4 py-2 text-muted-foreground">{c.notes}</td>
                  </tr>
                ))}
                <tr className="bg-muted/30 font-bold">
                  <td className="px-4 py-2">Total per annual cycle</td>
                  <td className="px-4 py-2 text-right font-mono text-xs">$21,000 - $56,000</td>
                  <td className="px-4 py-2 text-center text-xs text-muted-foreground">Annual</td>
                  <td className="px-4 py-2 text-muted-foreground text-xs font-normal">First year higher (baseline + equipment)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
