import { act3 } from '../../data/landbanking';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { ReviewChecklist } from '../../components/ReviewChecklist';
import { ReviewerFlag } from '../../components/ReviewerFlag';
import { ProcessTimeline } from '../../components/ProcessTimeline';
import { EvidenceDrawer } from '../../components/EvidenceDrawer';
import { Shield, Clock, FileText } from 'lucide-react';

export function GovernanceReview() {
  return (
    <div className="space-y-6 pt-4">
      {/* Tab Intro */}
      <p className="text-sm text-muted-foreground">
        Pre-review simulation of Regen's 4-stage methodology review process. Identifies where the Nature Equity Asset methodology would receive flags and what evidence is needed before formal submission.
      </p>

      {/* Review Process */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4 text-primary" />
            Regen Registry Review Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProcessTimeline
            steps={act3.reviewStages.map((s, i) => ({
              label: s.stage,
              description: s.description,
              status: i === 0 ? 'current' : 'upcoming' as const,
            }))}
          />
        </CardContent>
      </Card>

      {/* Review Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Review Criteria Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewChecklist criteria={act3.checklist} />
          <EvidenceDrawer
            query="methodology review governance registry criteria scientific basis credit class"
            label="View Governance Evidence"
          />
        </CardContent>
      </Card>

      {/* Reviewer Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Key Reviewer Flags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {act3.flags.map((f, i) => (
              <ReviewerFlag key={i} flag={f} index={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evidence Package */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" />
            Required Evidence Package
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Evidence Type</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Description</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Format</th>
                </tr>
              </thead>
              <tbody>
                {act3.evidencePackage.map((e, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium">{e.type}</td>
                    <td className="px-4 py-2 text-muted-foreground">{e.description}</td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">{e.format}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Estimated Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-primary" />
            Estimated Review Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Stage</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Duration</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {act3.reviewTimeline.map((r, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium">{r.stage}</td>
                    <td className="px-4 py-2 font-mono text-xs">{r.duration}</td>
                    <td className="px-4 py-2 text-muted-foreground">{r.notes}</td>
                  </tr>
                ))}
                <tr className="bg-muted/30">
                  <td className="px-4 py-2 font-bold">Total</td>
                  <td className="px-4 py-2 font-mono text-xs font-bold">~24-38 weeks</td>
                  <td className="px-4 py-2 text-muted-foreground">Longer than typical due to multi-dimensional scope</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
