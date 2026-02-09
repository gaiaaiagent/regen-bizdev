import { act1 } from '../../data/landbanking';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { NeedsTable } from '../../components/NeedsTable';
import { RiskMatrix } from '../../components/RiskMatrix';
import { SprintProposal } from '../../components/SprintProposal';
import { EvidenceDrawer } from '../../components/EvidenceDrawer';
import { JourneyTimeline } from '../../components/JourneyTimeline';
import { FileText, MessageSquare, ListChecks, Clock, Zap, Calendar } from 'lucide-react';

export function DealDossier() {
  return (
    <div className="space-y-6 pt-4">
      {/* Tab Intro */}
      <p className="text-sm text-muted-foreground">
        Prospect intelligence synthesized from meeting transcripts, alignment memos, and KOI knowledge graph. Positions Regen as registry credibility infrastructure for Landbanking's Nature Equity Assets.
      </p>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{act1.executiveSummary}</p>
          <EvidenceDrawer
            query="Landbanking natural capital fintech ecological asset registry verification"
            label="View Supporting Evidence"
          />
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-primary" />
            Relationship Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Event</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">People</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {act1.timeline.map((t, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium whitespace-nowrap">{t.date}</td>
                    <td className="px-4 py-2">{t.event}</td>
                    <td className="px-4 py-2 text-muted-foreground">{t.people}</td>
                    <td className="px-4 py-2 text-muted-foreground">{t.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Needs Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ListChecks className="h-4 w-4 text-primary" />
            Client Needs Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NeedsTable needs={act1.needs} />
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <RiskMatrix risks={act1.risks} />
        </CardContent>
      </Card>

      {/* Talking Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4 text-primary" />
            Key Talking Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {act1.talkingPoints.map((tp, i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium">{tp.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{tp.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Discovery Sprint — Quick Start */}
      {act1.discoverySprint && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-4 w-4 text-primary" />
              Quick Start: {act1.discoverySprint.title}
              <span className="ml-auto text-sm font-bold text-primary">{act1.discoverySprint.price}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-1.5">
              {act1.discoverySprint.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="text-xs italic text-muted-foreground">{act1.discoverySprint.cta}</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <a
                href="mailto:gregory@regen.network?subject=Landbanking%20Discovery%20Sprint%20—%20Scoping%20Call"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Schedule Discovery Sprint
              </a>
              <span className="text-xs text-muted-foreground">Next step: 30-minute scoping call to define discovery sprint objectives</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sprint Proposal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Proposed Engagement (8-Week Sprint)</CardTitle>
        </CardHeader>
        <CardContent>
          <SprintProposal weeks={act1.sprintProposal} />
        </CardContent>
      </Card>

      {/* Journey Timeline */}
      <Card>
        <CardContent className="pt-6">
          <JourneyTimeline />
        </CardContent>
      </Card>

      {/* Open Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Open Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {act1.openItems.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border px-4 py-2">
                <span className="text-sm">{item.item}</span>
                <span className="text-xs text-muted-foreground">{item.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
