import { Calendar } from 'lucide-react';
import type { SprintWeek } from '../data/types';

interface SprintProposalProps {
  weeks: SprintWeek[];
  title?: string;
}

export function SprintProposal({ weeks, title = '8-Week Engagement Timeline' }: SprintProposalProps) {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Calendar className="h-4 w-4 text-primary" />
          {title}
        </h3>
      )}
      {/* Timeline bar */}
      <div className="flex gap-1 overflow-x-auto">
        {weeks.map((w, i) => (
          <div
            key={i}
            className="flex-1 min-w-[140px] rounded-lg border border-border p-3"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold text-primary">{w.weeks}</span>
            </div>
            <p className="mt-1 text-xs font-medium">{w.phase}</p>
            <p className="mt-1 text-xs text-muted-foreground">{w.deliverable}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
