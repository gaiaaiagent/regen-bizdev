import { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Sparkles } from 'lucide-react';
import type { Gap } from '../data/types';

interface OpportunityCardProps {
  gap: Gap;
  index: number;
}

export function OpportunityCard({ gap, index }: OpportunityCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border transition-colors hover:border-primary/30">
      <button
        className="flex w-full items-center gap-3 p-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {index + 1}
        </span>
        <span className="flex-1 font-medium text-sm">{gap.title}</span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {gap.effort}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-[10px] font-medium text-green-700">
          <Sparkles className="h-2.5 w-2.5" />
          Regen helps
        </span>
        {expanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      {expanded && (
        <div className="border-t px-4 pb-4 pt-3 space-y-2">
          <p className="text-sm text-muted-foreground">{gap.description}</p>
          {gap.outcome && (
            <div className="flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
              <p className="text-xs font-medium text-primary/80">{gap.outcome}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
