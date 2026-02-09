import { act4 } from '../../data/renew';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { SprintProposal } from '../../components/SprintProposal';
import { Code, Wrench } from 'lucide-react';

export function IntegrationBlueprint() {
  return (
    <div className="space-y-6 pt-4">
      {/* Tab Intro */}
      <p className="text-sm text-muted-foreground">
        Technical integration plan for connecting Renew's platform to Regen Ledger. Covers SDK setup, data pipeline, credit issuance, and developer support resources.
      </p>

      {/* Integration Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Code className="h-4 w-4 text-primary" />
            Regen Ledger Integration Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Module</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Function</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Description</th>
                </tr>
              </thead>
              <tbody>
                {act4.integrationPoints.map((ip, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-mono text-xs text-primary">{ip.module}</td>
                    <td className="px-4 py-2 font-mono text-xs font-medium">{ip.function}</td>
                    <td className="px-4 py-2 text-muted-foreground">{ip.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Sprint Proposal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Implementation Sprint</CardTitle>
        </CardHeader>
        <CardContent>
          <SprintProposal weeks={act4.sprintProposal} title="8-Week Integration Timeline" />
        </CardContent>
      </Card>

      {/* Developer Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wrench className="h-4 w-4 text-primary" />
            Developer Support Package
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Resource</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Description</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Access</th>
                </tr>
              </thead>
              <tbody>
                {act4.developerSupport.map((ds, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium">{ds.resource}</td>
                    <td className="px-4 py-2 text-muted-foreground">{ds.description}</td>
                    <td className="px-4 py-2 text-muted-foreground">{ds.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
