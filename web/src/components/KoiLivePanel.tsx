import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Database, Search, AlertCircle, ExternalLink } from 'lucide-react';
import { fetchKoi } from '../lib/api';
import { displayTitle } from '../lib/koi';

interface KoiStats {
  total_documents?: number;
  total_entities?: number;
  total_relationships?: number;
  [key: string]: unknown;
}

interface KoiResult {
  rid?: string;
  title?: string;
  content?: string;
  score?: number;
  source?: string;
  metadata?: { rid?: string; source?: string; url?: string };
}

interface KoiResponseEnvelope {
  data?: { results?: KoiResult[]; total_results?: number; confidence?: number };
  citations?: Array<{ rid?: string; url?: string; excerpt?: string }>;
  request_id?: string;
  errors?: string[];
  warnings?: string[];
}

interface KoiLivePanelProps {
  clientName: string;
  searchQuery: string;
}

export function KoiLivePanel({ clientName, searchQuery }: KoiLivePanelProps) {
  const [stats, setStats] = useState<KoiStats | null>(null);
  const [results, setResults] = useState<KoiResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queriedAt, setQueriedAt] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [statsData, searchData] = await Promise.allSettled([
          fetchKoi<KoiStats>('/stats'),
          fetchKoi<KoiResponseEnvelope>('/query', {
            method: 'POST',
            body: JSON.stringify({ query: searchQuery, limit: 5 }),
          }),
        ]);

        if (cancelled) return;

        if (statsData.status === 'fulfilled') setStats(statsData.value);
        if (searchData.status === 'fulfilled') {
          const envelope = searchData.value;
          const items = envelope.data?.results || [];
          // Merge citation URLs into results by matching rid
          const citationMap = new Map(
            (envelope.citations || []).map(c => [c.rid, c.url])
          );
          for (const item of items) {
            if (!item.metadata?.url && item.rid) {
              const url = citationMap.get(item.rid);
              if (url) {
                item.metadata = { ...item.metadata, url };
              }
            }
          }
          setResults(items);
        }
        setQueriedAt(new Date());

        if (statsData.status === 'rejected' && searchData.status === 'rejected') {
          setError('KOI API unavailable');
        }
      } catch {
        if (!cancelled) setError('KOI API unavailable');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [searchQuery]);

  if (error) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex items-center gap-3 py-4">
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Live KOI data unavailable — showing pre-analyzed results above
          </span>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Database className="h-4 w-4 text-primary" />
          Live Knowledge Graph
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            LIVE
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Querying KOI knowledge graph...
          </div>
        ) : (
          <>
            {/* Stats row */}
            {stats && (
              <div className="flex gap-4 rounded-lg bg-muted/50 p-3 text-sm">
                {stats.total_documents != null && (
                  <div>
                    <span className="font-bold text-primary">{stats.total_documents.toLocaleString()}</span>
                    <span className="ml-1 text-muted-foreground">documents indexed</span>
                  </div>
                )}
                {stats.total_entities != null && (
                  <div>
                    <span className="font-bold text-primary">{stats.total_entities.toLocaleString()}</span>
                    <span className="ml-1 text-muted-foreground">entities resolved</span>
                  </div>
                )}
                {stats.total_relationships != null && (
                  <div>
                    <span className="font-bold text-primary">{stats.total_relationships.toLocaleString()}</span>
                    <span className="ml-1 text-muted-foreground">relationships</span>
                  </div>
                )}
              </div>
            )}

            {/* Search results */}
            {results.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Search className="h-3 w-3" />
                  Relevant documents for &ldquo;{clientName}&rdquo;
                </div>
                <div className="space-y-2">
                  {results.slice(0, 5).map((r, i) => (
                    <div key={i} className="rounded-lg border border-border p-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">{displayTitle(r, i)}</p>
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
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                          {r.content.slice(0, 200)}
                        </p>
                      )}
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                        {r.metadata?.source && <span>{r.metadata.source}</span>}
                        {r.score != null && <span>Relevance: {(r.score * 100).toFixed(0)}%</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamp */}
            {queriedAt && (
              <p className="text-[10px] text-muted-foreground">
                Last queried: {queriedAt.toLocaleTimeString()}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
