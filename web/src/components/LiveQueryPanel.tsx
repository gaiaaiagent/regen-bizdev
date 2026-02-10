import { useState } from 'react';
import { Search, ExternalLink, Loader2 } from 'lucide-react';
import { queryKoi, displayTitle, sourceColor } from '../lib/koi';
import type { KoiResult } from '../lib/koi';

interface LiveQueryPanelProps {
  suggestion?: string;
}

export function LiveQueryPanel({ suggestion = 'ecological credit methodology' }: LiveQueryPanelProps) {
  const [input, setInput] = useState(suggestion);
  const [results, setResults] = useState<KoiResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    const q = input.trim();
    if (!q || loading) return;
    setLoading(true);
    setSearched(true);
    try {
      const resp = await queryKoi(q, 5);
      setResults(resp.results);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-semibold">Try a Live Query</h4>
        <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-medium text-green-700">
          <span className="h-1 w-1 rounded-full bg-green-500" />
          LIVE
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Search 69,000+ registry documents in real time. Try any ecological credit topic.
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="e.g. biodiversity scoring methodology"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !input.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Searching knowledge graph...
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <p className="py-2 text-xs text-muted-foreground">
          No matching documents found. Try different terms.
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] text-muted-foreground">
            {results.length} results from KOI knowledge graph
          </p>
          {results.map((r, i) => (
            <div key={i} className="rounded-md border border-border/60 bg-background p-2.5">
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
  );
}
