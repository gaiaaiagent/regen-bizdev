import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { EntityGraph } from '../components/EntityGraph';
import { queryKoi, resolveEntity, getNeighborhood } from '../lib/koi';
import type { KoiResult, ResolvedEntity, EntityNeighbor } from '../lib/koi';
import { Database } from 'lucide-react';

const CLIENT_SUGGESTIONS: Record<string, string[]> = {
  renew: [
    'biodiversity credit methodology BT01 five-taxa',
    'data anchoring attestation biodiversity survey',
    'umbrella species stewardship USS01 credit class',
    'carbon biodiversity credit stacking registry',
  ],
  landbanking: [
    'multi-dimensional ecological asset natural capital credit',
    'cocoa agroforestry carbon sequestration credit class',
    'methodology governance review process registry standards',
    'BioTerra biodiversity composite scoring index',
  ],
};

const DEFAULT_SUGGESTIONS = [
  'ecological credit methodology governance',
  'biodiversity monitoring verification data anchoring',
  'carbon credit class Regen registry',
  'credit class proposal review process',
];

export function Explorer() {
  const [searchParams] = useSearchParams();
  const client = searchParams.get('client') || '';
  const suggestions = CLIENT_SUGGESTIONS[client] || DEFAULT_SUGGESTIONS;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<KoiResult[]>([]);
  const [confidence, setConfidence] = useState<number | undefined>();
  const [searchLoading, setSearchLoading] = useState(false);

  const [center, setCenter] = useState<ResolvedEntity | null>(null);
  const [neighbors, setNeighbors] = useState<EntityNeighbor[]>([]);
  const [graphLoading, setGraphLoading] = useState(false);

  const hasFired = useRef(false);

  // Auto-fire first suggestion 1s after mount
  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    const timer = setTimeout(() => {
      handleSearch(suggestions[0]);
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(async (q: string) => {
    setQuery(q);
    setSearchLoading(true);
    setResults([]);
    setCenter(null);
    setNeighbors([]);

    try {
      // Step 1: KOI search
      const searchResp = await queryKoi(q, 8);
      setResults(searchResp.results);
      setConfidence(searchResp.confidence);
      setSearchLoading(false);

      // Step 2: Extract top entity from first result title, then resolve + get neighborhood
      const topTitle = searchResp.results[0]?.title;
      if (topTitle) {
        setGraphLoading(true);
        // Extract a meaningful entity label from the title
        const entityLabel = extractEntityLabel(topTitle, q);

        try {
          const resolved = await resolveEntity(entityLabel);
          const bestMatch = resolved.best_match || resolved.matches?.[0];

          if (bestMatch) {
            setCenter(bestMatch);
            const hood = await getNeighborhood(bestMatch.label || entityLabel);
            setNeighbors(hood.neighbors || []);
          } else {
            // Fallback: use the query term itself as center
            setCenter({ label: entityLabel, type: 'Concept' });
          }
        } catch {
          // Entity resolution failed — show query as center node
          setCenter({ label: entityLabel, type: 'Concept' });
        }
        setGraphLoading(false);
      }
    } catch {
      setSearchLoading(false);
      setGraphLoading(false);
    }
  }, []);

  const handleNodeClick = useCallback(
    (label: string) => {
      handleSearch(label);
    },
    [handleSearch],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Database className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Knowledge Explorer</h1>
          <p className="text-xs text-muted-foreground">
            Search 69K+ documents, resolve entities, explore the knowledge graph
          </p>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        onSearch={handleSearch}
        suggestions={suggestions}
        loading={searchLoading}
        placeholder="Ask anything about ecological credits, methodologies, governance..."
      />

      {/* Results + Graph layout */}
      {(results.length > 0 || searchLoading || graphLoading || center) && (
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Search results — left 60% */}
          <div className="lg:col-span-3">
            {searchLoading ? (
              <div className="flex items-center gap-2 rounded-lg border border-border bg-white p-6 text-sm text-muted-foreground">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Searching knowledge graph...
              </div>
            ) : (
              <SearchResults results={results} confidence={confidence} query={query} />
            )}
          </div>

          {/* Entity graph — right 40% */}
          <div className="lg:col-span-2">
            <EntityGraph
              center={center}
              neighbors={neighbors}
              onNodeClick={handleNodeClick}
              loading={graphLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/** Extract a meaningful entity label for resolution from a result title */
function extractEntityLabel(title: string, query: string): string {
  // Check BOTH query and title for credit class IDs (e.g., BT01, C01, USS01)
  const queryClassMatch = query.match(/\b([A-Z]{1,4}\d{2})\b/);
  if (queryClassMatch) return queryClassMatch[1];

  const titleClassMatch = title.match(/\b([A-Z]{1,4}\d{2})\b/);
  if (titleClassMatch) return titleClassMatch[1];

  // Use the first 2-3 meaningful words from the title (skip common words)
  const stopWords = new Set(['the', 'a', 'an', 'of', 'in', 'for', 'and', 'to', 'with', 'on', 'at', 'by', 'from', 'document']);
  const words = title
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w.toLowerCase()));

  if (words.length >= 2) return words.slice(0, 3).join(' ');

  // Fallback: use first few words of search query
  return query.split(/\s+/).slice(0, 3).join(' ');
}
