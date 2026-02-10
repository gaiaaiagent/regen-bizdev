import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronRight, FileSearch, ExternalLink, Loader2 } from 'lucide-react';
import { queryKoi, displayTitle, sourceColor } from '../lib/koi';
import type { KoiResult } from '../lib/koi';

interface EvidenceDrawerProps {
  query: string;
  label?: string;
  limit?: number;
}

export function EvidenceDrawer({ query, label = 'View Source Evidence', limit = 5 }: EvidenceDrawerProps) {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<KoiResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Pre-fetch evidence on mount — data is ready when user clicks
  useEffect(() => {
    let cancelled = false;
    queryKoi(query, limit)
      .then(resp => {
        if (cancelled) return;
        setResults(resp.results);
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [query, limit]);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div className="mt-3 rounded-lg border border-dashed border-border">
      <button
        onClick={toggle}
        data-demo-target={label}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <FileSearch className="h-3.5 w-3.5" />
        {label}
        {open ? <ChevronDown className="ml-auto h-3.5 w-3.5" /> : <ChevronRight className="ml-auto h-3.5 w-3.5" />}
      </button>

      {open && (
        <div className="border-t border-dashed border-border px-4 py-3">
          {loading && (
            <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Searching knowledge graph...
            </div>
          )}

          {error && (
            <p className="py-2 text-xs text-muted-foreground">
              KOI API unavailable — evidence cannot be loaded right now.
            </p>
          )}

          {!loading && !error && results.length === 0 && loaded && (
            <p className="py-2 text-xs text-muted-foreground">No matching documents found.</p>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] text-muted-foreground">
                {results.length} registry documents from KOI knowledge graph
              </p>
              {results.map((r, i) => (
                <div key={i} className="rounded-md border border-border/60 bg-muted/20 p-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium">{displayTitle(r, i)}</p>
                    {r.metadata?.url && (
                      <a
                        href={r.metadata.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  {r.content && (
                    <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                      {r.content.slice(0, 200)}
                    </p>
                  )}
                  <div className="mt-1.5 flex items-center gap-2">
                    {r.metadata?.source && (
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${sourceColor(r.metadata.source)}`}>
                        {r.metadata.source}
                      </span>
                    )}
                    {r.score != null && (
                      <span className="text-[9px] text-muted-foreground">{(r.score * 100).toFixed(0)}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
