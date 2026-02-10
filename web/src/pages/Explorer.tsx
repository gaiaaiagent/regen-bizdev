import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { ForceGraph } from '../components/ForceGraph';
import { GraphControls } from '../components/GraphControls';
import { GraphTooltip } from '../components/GraphTooltip';
import { useGraphData } from '../hooks/useGraphData';
import { queryKoi } from '../lib/koi';
import type { KoiResult } from '../lib/koi';
import type { GraphNode } from '../lib/graph-types';
import { Database, RefreshCw } from 'lucide-react';

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
  const [searchSlow, setSearchSlow] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const graph = useGraphData();
  const hasFired = useRef(false);

  // Tooltip state
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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
    setSearchSlow(false);
    setSearchFailed(false);
    setResults([]);
    graph.reset();

    // Show "slow" message after 5s
    const slowTimer = setTimeout(() => setSearchSlow(true), 5000);

    try {
      // Step 1: KOI search with 15s timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const searchResp = await queryKoi(q, 8);
      clearTimeout(timeout);
      clearTimeout(slowTimer);
      setSearchSlow(false);
      setResults(searchResp.results);
      setConfidence(searchResp.confidence);
      setSearchLoading(false);

      if (searchResp.results.length === 0) return;

      // Step 2: Build candidate entity labels to try (in priority order)
      const candidates = extractEntityCandidates(searchResp.results, q);

      // Step 3: Try each candidate — first one that resolves with neighbors wins
      for (const label of candidates) {
        try {
          await graph.expandNode(label);
          // If we got nodes, stop trying candidates
          break;
        } catch {
          // This candidate didn't work, try next
        }
      }
    } catch {
      clearTimeout(slowTimer);
      setSearchLoading(false);
      setSearchSlow(false);
      setSearchFailed(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNodeClick = useCallback((label: string) => {
    // Progressive expansion — don't reset, just expand
    graph.expandNode(label);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNodeHover = useCallback((node: GraphNode | null, x: number, y: number) => {
    setHoveredNode(node);
    setTooltipPos({ x, y });
  }, []);

  const graphVisible = graph.stats.totalNodes > 0 || graph.loading;

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

      {/* Failed state — shown when search fails entirely */}
      {searchFailed && !searchLoading && results.length === 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-medium text-amber-800">Knowledge graph is temporarily unavailable</p>
          <p className="mt-1 text-sm text-amber-700">
            69,560 documents indexed across forum, GitHub, registry, and handbook sources.
            Results will appear when the service reconnects.
          </p>
          <button
            onClick={() => handleSearch(query || suggestions[0])}
            className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-200 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </button>
        </div>
      )}

      {/* Results + Graph layout */}
      {(results.length > 0 || searchLoading || graphVisible) && (
        <div className={fullscreen ? '' : 'grid gap-6 lg:grid-cols-5'}>
          {/* Search results — left 60% (hidden in fullscreen) */}
          {!fullscreen && (
            <div className="lg:col-span-3">
              {searchLoading ? (
                <div className="flex items-center gap-2 rounded-lg border border-border bg-white p-6 text-sm text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  {searchSlow
                    ? 'Knowledge graph is loading — results will appear shortly...'
                    : 'Searching knowledge graph...'}
                </div>
              ) : (
                <SearchResults results={results} confidence={confidence} query={query} />
              )}
            </div>
          )}

          {/* Force-directed graph */}
          <div className={fullscreen ? '' : 'lg:col-span-2'}>
            <div className="space-y-2">
              {graphVisible && (
                <GraphControls
                  availableTypes={graph.availableTypes}
                  activeTypes={graph.filters.entityTypes}
                  onToggleType={graph.toggleType}
                  minImportance={graph.filters.minImportance}
                  onMinImportanceChange={graph.setMinImportance}
                  stats={graph.stats}
                  onReset={() => { graph.reset(); }}
                  fullscreen={fullscreen}
                  onToggleFullscreen={() => setFullscreen(f => !f)}
                />
              )}
              <ForceGraph
                data={graph.graphData}
                loading={graph.loading}
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                height={fullscreen ? 700 : 500}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tooltip */}
      <GraphTooltip node={hoveredNode} x={tooltipPos.x} y={tooltipPos.y} />

      {/* Error display */}
      {graph.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {graph.error}
        </div>
      )}
    </div>
  );
}

/** Build a prioritized list of entity labels to try resolving, from search results + query */
function extractEntityCandidates(results: KoiResult[], query: string): string[] {
  const seen = new Set<string>();
  const candidates: string[] = [];

  const add = (label: string) => {
    const key = label.toLowerCase().trim();
    if (key && !seen.has(key)) {
      seen.add(key);
      candidates.push(label.trim());
    }
  };

  // Priority 1: Credit class IDs from query (e.g., BT01, C01, USS01)
  const queryClassMatch = query.match(/\b([A-Z]{1,4}\d{2})\b/);
  if (queryClassMatch) add(queryClassMatch[1]);

  // Priority 2: entities_matched from search result metadata (these are real KG entities)
  for (const r of results.slice(0, 3)) {
    const matched = (r.metadata as Record<string, unknown>)?.entities_matched;
    if (Array.isArray(matched)) {
      for (const e of matched) {
        if (typeof e === 'string' && e.length > 2) add(e);
      }
    }
  }

  // Priority 3: Credit class IDs from result titles
  for (const r of results.slice(0, 3)) {
    const match = r.title?.match(/\b([A-Z]{1,4}\d{2})\b/);
    if (match) add(match[1]);
  }

  // Priority 4: Progressively shorter subsets of the query (2 words, then 3, then full)
  const qWords = query.split(/\s+/);
  if (qWords.length >= 2) add(qWords.slice(0, 2).join(' '));
  if (qWords.length >= 3) add(qWords.slice(0, 3).join(' '));
  add(query);

  return candidates;
}
