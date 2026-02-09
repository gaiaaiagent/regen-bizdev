import { useEffect, useState } from 'react';
import { Database, Link2, Search, AlertCircle } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { getKoiStats, getLedgerClasses, queryKoi } from '../lib/koi';
import type { KoiStats, KoiResult } from '../lib/koi';
import { displayTitle, sourceColor } from '../lib/koi';

export function InfrastructurePulse() {
  const [stats, setStats] = useState<KoiStats | null>(null);
  const [koiError, setKoiError] = useState(false);
  const [classCount, setClassCount] = useState<number | null>(null);
  const [ledgerError, setLedgerError] = useState(false);
  const [sampleResults, setSampleResults] = useState<KoiResult[]>([]);

  useEffect(() => {
    let cancelled = false;

    // All fetches run independently (parallel) so one failure doesn't block others
    getKoiStats()
      .then(data => { if (!cancelled) setStats(data); })
      .catch(() => { if (!cancelled) setKoiError(true); });

    getLedgerClasses()
      .then(classes => { if (!cancelled) setClassCount(classes.length); })
      .catch(() => { if (!cancelled) setLedgerError(true); });

    // Sample query — slight delay for visual stagger
    const timer = setTimeout(() => {
      queryKoi('ecological credit methodology governance', 3)
        .then(resp => { if (!cancelled) setSampleResults(resp.results); })
        .catch(() => { /* graceful */ });
    }, 400);

    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  return (
    <div className="space-y-4">
      {/* Two side-by-side stat cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Knowledge Graph Stats */}
        <div className="rounded-xl border border-border bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Knowledge Graph</span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              LIVE
            </span>
          </div>
          {stats ? (
            <div className="grid grid-cols-2 gap-3">
              <AnimatedCounter target={stats.total_documents} label="documents indexed" delay={0} />
              <AnimatedCounter target={stats.by_source ? Object.keys(stats.by_source).length : 0} label="data sources" delay={150} />
            </div>
          ) : koiError ? (
            <div className="flex items-center gap-2 py-3 text-xs text-muted-foreground">
              <AlertCircle className="h-3.5 w-3.5" />
              KOI API unavailable — connect to production for live stats
            </div>
          ) : (
            <div className="flex items-center justify-center py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </div>

        {/* On-Chain Registry Stats */}
        <div className="rounded-xl border border-border bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">On-Chain Registry</span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              LIVE
            </span>
          </div>
          {classCount != null ? (
            <div className="flex justify-center">
              <AnimatedCounter target={classCount} label="credit classes on Regen Ledger" delay={200} />
            </div>
          ) : ledgerError ? (
            <div className="flex items-center gap-2 py-3 text-xs text-muted-foreground">
              <AlertCircle className="h-3.5 w-3.5" />
              Ledger API unavailable
            </div>
          ) : (
            <div className="flex items-center justify-center py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </div>
      </div>

      {/* Sample results */}
      {sampleResults.length > 0 && (
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            Sample query: &ldquo;ecological credit methodology governance&rdquo;
          </div>
          <div className="space-y-2">
            {sampleResults.map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border/60 p-2.5 opacity-0 animate-[fadeIn_0.4s_ease_forwards]"
                style={{ animationDelay: `${400 + i * 150}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{displayTitle(r, i)}</p>
                  {r.content && (
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{r.content.slice(0, 150)}</p>
                  )}
                </div>
                {r.metadata?.source && (
                  <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${sourceColor(r.metadata.source)}`}>
                    {r.metadata.source}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
