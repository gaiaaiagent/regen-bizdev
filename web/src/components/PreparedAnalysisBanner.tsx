import { useState } from 'react';
import { X, Info } from 'lucide-react';

export function PreparedAnalysisBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
      <Info className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
      <p className="flex-1 text-xs text-muted-foreground">
        Analysis prepared Feb 2026 using KOI knowledge graph and Regen Ledger data.
        Live data panels marked with{' '}
        <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-medium text-green-700">
          <span className="h-1 w-1 rounded-full bg-green-500" />
          LIVE
        </span>{' '}
        are queried in real time.
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="flex-shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
