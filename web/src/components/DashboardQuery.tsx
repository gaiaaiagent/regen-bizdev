import { useState, useEffect, useRef } from 'react';
import { queryKoi, displayTitle, sourceColor } from '../lib/koi';
import type { KoiResult } from '../lib/koi';
import { Search, Loader2, AlertCircle } from 'lucide-react';

interface DemoChip {
  label: string;
  query: string;
}

const CHIPS: Record<string, DemoChip[]> = {
  landbanking: [
    { label: 'Credit class mapping', query: 'How does a multi-dimensional nature asset map to Regen credit classes?' },
    { label: 'Governance steps', query: 'What governance steps are needed for carbon credit registration on Regen?' },
    { label: 'Similar projects', query: 'Show me biodiversity and carbon projects on the Regen Registry' },
  ],
  renew: [
    { label: 'Biodiversity credits', query: 'How do biodiversity credits work on the Regen Registry?' },
    { label: 'BT01 requirements', query: 'What are the requirements for BioTerra BT01 credit class?' },
    { label: 'Carbon stacking', query: 'Can biodiversity credits be stacked with carbon credits on Regen?' },
  ],
};

interface CachedResult {
  results: KoiResult[];
  confidence?: number;
}

interface DashboardQueryProps {
  client: 'landbanking' | 'renew';
}

export function DashboardQuery({ client }: DashboardQueryProps) {
  const chips = CHIPS[client];
  const [customQuery, setCustomQuery] = useState('');
  const [activeChip, setActiveChip] = useState<number | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  const [results, setResults] = useState<KoiResult[]>([]);
  const [confidence, setConfidence] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chipCache, setChipCache] = useState<Map<number, CachedResult>>(new Map());
  const abortRef = useRef<AbortController | null>(null);

  // Pre-fetch chip results on mount
  useEffect(() => {
    const cache = new Map<number, CachedResult>();
    chips.forEach((chip, idx) => {
      queryKoi(chip.query, 5)
        .then(res => {
          cache.set(idx, res);
          setChipCache(new Map(cache));
        })
        .catch(() => {}); // Silent fail — chips will fetch on click if cache miss
    });
  }, [client]);

  function handleChipClick(idx: number) {
    setActiveChip(idx);
    setIsCustom(false);
    setError(null);

    const cached = chipCache.get(idx);
    if (cached) {
      setResults(cached.results);
      setConfidence(cached.confidence);
      return;
    }

    // Fallback: fetch live
    setLoading(true);
    queryKoi(chips[idx].query, 5)
      .then(res => {
        setResults(res.results);
        setConfidence(res.confidence);
        setChipCache(prev => new Map(prev).set(idx, res));
      })
      .catch(() => setError('Query failed — check connection'))
      .finally(() => setLoading(false));
  }

  function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = customQuery.trim();
    if (!q) return;

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setActiveChip(null);
    setIsCustom(true);
    setLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      controller.abort();
      setLoading(false);
      setError('Live query timed out — try an example query above');
    }, 5000);

    queryKoi(q, 5)
      .then(res => {
        if (!controller.signal.aborted) {
          clearTimeout(timeout);
          setResults(res.results);
          setConfidence(res.confidence);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          clearTimeout(timeout);
          setError('Live query timed out — try an example query above');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
  }

  const hasResults = results.length > 0;

  return (
    <div className="space-y-3" data-demo-target="Q&A Panel">
      {/* Search input */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={customQuery}
            onChange={e => setCustomQuery(e.target.value)}
            placeholder="Ask anything about this client's registry pathway..."
            className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !customQuery.trim()}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Search
        </button>
      </form>

      {/* Demo chips */}
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(idx)}
            data-demo-target={chip.label}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeChip === idx
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center gap-2 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching knowledge graph...
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Results */}
      {!loading && !error && hasResults && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {isCustom ? 'Live results' : 'Example results (cached)'}
              {confidence != null && ` \u00b7 ${Math.round(confidence * 100)}% confidence`}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {results.slice(0, 6).map((r, i) => (
              <ResultCard key={r.rid || i} result={r} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultCard({ result, index }: { result: KoiResult; index: number }) {
  const title = displayTitle(result, index);
  const score = result.score != null ? Math.round(result.score * 100) : null;
  const source = result.source || result.metadata?.source || '';
  const snippet = result.content
    ? result.content.slice(0, 140) + (result.content.length > 140 ? '...' : '')
    : '';
  const url = result.metadata?.url;

  return (
    <div className="rounded-lg border bg-card p-3 text-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium leading-snug line-clamp-2">
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              {title}
            </a>
          ) : (
            title
          )}
        </h4>
        {score != null && (
          <span className="flex-shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
            {score}%
          </span>
        )}
      </div>
      {snippet && <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">{snippet}</p>}
      {source && (
        <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${sourceColor(source)}`}>
          {source}
        </span>
      )}
    </div>
  );
}
