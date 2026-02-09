import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { ReviewCriterion } from '../data/types';

interface ReviewChecklistProps {
  criteria: ReviewCriterion[];
}

export function ReviewChecklist({ criteria }: ReviewChecklistProps) {
  const counts = {
    pass: criteria.filter(c => c.status === 'pass').length,
    flag: criteria.filter(c => c.status === 'flag').length,
    fail: criteria.filter(c => c.status === 'fail').length,
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-4 text-sm">
        <span className="text-green-700 font-medium">{counts.pass} Pass</span>
        <span className="text-amber-700 font-medium">{counts.flag} Flags</span>
        <span className="text-red-700 font-medium">{counts.fail} Fails</span>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        {criteria.map((c, i) => (
          <CriterionRow key={i} criterion={c} isLast={i === criteria.length - 1} />
        ))}
      </div>
    </div>
  );
}

function CriterionRow({ criterion, isLast }: { criterion: ReviewCriterion; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={isLast ? '' : 'border-b border-border'}>
      <button
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/30"
        onClick={() => setExpanded(!expanded)}
      >
        <StatusBadge status={criterion.status} />
        <span className="flex-1 text-sm font-medium">{criterion.name}</span>
        {expanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      {expanded && (
        <div className="space-y-2 border-t bg-muted/10 px-4 pb-4 pt-3">
          <div>
            <span className="text-xs font-semibold uppercase text-muted-foreground">Finding</span>
            <p className="mt-0.5 text-sm">{criterion.finding}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-muted-foreground">Evidence Needed</span>
            <p className="mt-0.5 text-sm text-muted-foreground">{criterion.evidenceNeeded}</p>
          </div>
        </div>
      )}
    </div>
  );
}
