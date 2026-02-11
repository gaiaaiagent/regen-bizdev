import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { Link, useSearchParams } from 'react-router';
import * as d3 from 'd3';
import { useGraphData } from '../hooks/useGraphData';
import { queryKoi, displayTitle, sourceColor } from '../lib/koi';
import type { KoiResult } from '../lib/koi';
import type { GraphNode, GraphLink } from '../lib/graph-types';
import { getTypeColor, TYPE_COLORS } from '../lib/graph-types';
import { Leaf, ArrowLeft, RotateCcw, Search, X, ChevronRight, Box, Square } from 'lucide-react';

const ForceGraph3D = lazy(() => import('../components/ForceGraph3D').then(m => ({ default: m.ForceGraph3D })));

function nodeRadius(node: GraphNode): number {
  if (node.isCenter) return 24;
  return 4 + node.importance * 14;
}

function truncLabel(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 1) + '\u2026' : s;
}

export function GraphExplorer() {
  const [searchParams] = useSearchParams();
  const client = searchParams.get('client') || '';

  const graph = useGraphData();
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);
  const gRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const d3NodesRef = useRef<GraphNode[]>([]);
  const hasFired = useRef(false);

  // UI state
  const [is3D, setIs3D] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<KoiResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [tooltip, setTooltip] = useState<{ node: GraphNode; x: number; y: number } | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [entitySearch, setEntitySearch] = useState('');
  const [entitySearchResults, setEntitySearchResults] = useState<GraphNode[]>([]);
  const selectedNodeRef = useRef<string | null>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  const defaultQuery = client === 'renew'
    ? 'biodiversity credit methodology BT01'
    : client === 'landbanking'
      ? 'ecological asset natural capital credit class'
      : 'ecological credit methodology governance';

  // Auto-fire initial query
  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    const timer = setTimeout(() => handleSearch(defaultQuery, true), 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(async (q: string, autoExpand = false) => {
    setSearchQuery(q);
    setSearchLoading(true);
    setSearchResults([]);
    setSearchDropdownOpen(false);

    if (autoExpand) {
      graph.reset();
      setSelectedNode(null);
      selectedNodeRef.current = null;
      setDetailsOpen(false);
    }

    try {
      const resp = await queryKoi(q, 8);
      setSearchResults(resp.results);
      setSearchLoading(false);
      setSearchDropdownOpen(resp.results.length > 0);

      if (resp.results.length === 0) return;

      if (autoExpand) {
        const candidates = extractCandidates(resp.results, q);
        for (const label of candidates) {
          try {
            await graph.expandNode(label);
            break;
          } catch { /* next */ }
        }
      }
    } catch {
      setSearchLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Expand a search result into the graph
  const expandFromResult = useCallback((result: KoiResult, index: number) => {
    const candidates = extractCandidates([result], searchQuery || displayTitle(result, index));
    if (candidates.length > 0) {
      graph.expandNode(candidates[0]);
    }
    setSearchDropdownOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleNodeClick = useCallback((d: GraphNode) => {
    setSelectedNode(d);
    selectedNodeRef.current = d.id;
    setDetailsOpen(true);
  }, []);

  const handleNodeDblClick = useCallback((d: GraphNode) => {
    if (!d.isCenter) {
      graph.expandNode(d.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- D3 rendering ---
  useEffect(() => {
    const data = graph.graphData;
    if (!svgRef.current || data.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    const rect = svgRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Deep-copy for D3 mutation
    const nodes: GraphNode[] = data.nodes.map(n => ({ ...n }));
    const links: GraphLink[] = data.links.map(l => ({
      ...l,
      source: typeof l.source === 'string' ? l.source : l.source.id,
      target: typeof l.target === 'string' ? l.target : l.target.id,
    }));

    // Store D3 nodes ref for focusOnNode
    d3NodesRef.current = nodes;

    if (simulationRef.current) simulationRef.current.stop();

    const simulation = d3
      .forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(l => {
        const src = l.source as GraphNode;
        const tgt = l.target as GraphNode;
        return src.isCenter || tgt.isCenter ? 140 : 90;
      }))
      .force('charge', d3.forceManyBody<GraphNode>().strength(d => d.isCenter ? -500 : -250))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.08))
      .force('collide', d3.forceCollide<GraphNode>().radius(d => nodeRadius(d) + 12))
      .alphaDecay(0.015);

    simulationRef.current = simulation;

    // Clear & rebuild SVG
    svg.selectAll('*').remove();

    // Defs
    const defs = svg.append('defs');
    defs.append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -4 8 8')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-4L8,0L0,4')
      .attr('fill', '#c0c0c0');

    // Zoom container
    const g = svg.append('g');
    gRef.current = g;

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 6])
      .on('zoom', event => g.attr('transform', event.transform));
    svg.call(zoom);
    zoomRef.current = zoom;

    // Links
    const linkG = g.append('g').attr('class', 'links');
    linkG
      .selectAll<SVGLineElement, GraphLink>('line')
      .data(links)
      .join('line')
      .attr('stroke', '#c0c0c0')
      .attr('stroke-width', 1.2)
      .attr('stroke-opacity', 0.35)
      .attr('stroke-dasharray', d => d.direction === 'incoming' ? '5 3' : 'none')
      .attr('marker-end', d => d.direction === 'outgoing' ? 'url(#arrow)' : '');

    // Node groups
    const nodeG = g.append('g').attr('class', 'nodes');
    const nodeSel = nodeG
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes, d => d.id)
      .join(enter => {
        const group = enter.append('g')
          .attr('cursor', 'pointer')
          .attr('opacity', 0)
          .transition().duration(400).attr('opacity', 1)
          .selection();

        // Circle with white border (yonearth style)
        group.append('circle')
          .attr('r', d => nodeRadius(d))
          .attr('fill', d => getTypeColor(d.type).stroke)
          .attr('fill-opacity', 0.85);

        group.append('circle')
          .attr('r', d => nodeRadius(d))
          .attr('fill', 'none')
          .attr('stroke', 'white')
          .attr('stroke-width', 2);

        // Highlight ring for center nodes
        group.filter(d => d.isCenter)
          .append('circle')
          .attr('r', d => nodeRadius(d) + 4)
          .attr('fill', 'none')
          .attr('stroke', d => getTypeColor(d.type).stroke)
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.4);

        return group;
      });

    // Labels — separate group so they render on top
    const labelG = g.append('g').attr('class', 'labels');
    const labelSel = labelG
      .selectAll<SVGTextElement, GraphNode>('text')
      .data(nodes.filter(d => d.isCenter || d.importance > 0.3))
      .join('text')
      .attr('text-anchor', 'start')
      .attr('dx', d => nodeRadius(d) + 6)
      .attr('dy', 4)
      .attr('font-size', d => d.isCenter ? 13 : 11)
      .attr('font-weight', d => d.isCenter ? 700 : 500)
      .attr('fill', '#333')
      .attr('pointer-events', 'none')
      .text(d => truncLabel(d.label, d.isCenter ? 24 : 18));

    // Drag
    const drag = d3.drag<SVGGElement, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      })
      .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null; d.fy = null;
      });
    nodeSel.call(drag);

    // Helper: apply persistent selection highlight to a node
    const applySelectionHighlight = (nodeId: string | null) => {
      if (!nodeId) return;
      nodeSel.filter(n => n.id === nodeId)
        .select('circle')
        .attr('stroke', '#ffeb3b')
        .attr('stroke-width', 4);
    };

    // Interactions
    nodeSel
      .on('click', (event, d) => {
        event.stopPropagation();
        handleNodeClick(d);
        // Immediately apply persistent selection highlight
        nodeSel.selectAll('circle').attr('stroke', 'white').attr('stroke-width', 2);
        nodeSel.filter(d => d.isCenter).selectAll('circle:nth-child(3)')
          .attr('stroke', n => getTypeColor((n as GraphNode).type).stroke)
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.4);
        applySelectionHighlight(d.id);
      })
      .on('dblclick', (event, d) => {
        event.stopPropagation();
        event.preventDefault();
        handleNodeDblClick(d);
      })
      .on('mouseenter', (event, d) => {
        setTooltip({ node: d, x: event.clientX, y: event.clientY });
        // Highlight connected
        const connected = new Set<string>([d.id]);
        links.forEach(l => {
          const sid = typeof l.source === 'object' ? l.source.id : l.source;
          const tid = typeof l.target === 'object' ? l.target.id : l.target;
          if (sid === d.id) connected.add(tid as string);
          if (tid === d.id) connected.add(sid as string);
        });
        nodeSel.attr('opacity', n => connected.has(n.id) ? 1 : 0.15);
        linkG.selectAll<SVGLineElement, GraphLink>('line')
          .attr('stroke-opacity', l => {
            const sid = typeof l.source === 'object' ? l.source.id : l.source;
            const tid = typeof l.target === 'object' ? l.target.id : l.target;
            return sid === d.id || tid === d.id ? 0.8 : 0.04;
          });
        // Highlight link to connected (yonearth purple style)
        linkG.selectAll<SVGLineElement, GraphLink>('line')
          .filter(l => {
            const sid = typeof l.source === 'object' ? l.source.id : l.source;
            const tid = typeof l.target === 'object' ? l.target.id : l.target;
            return sid === d.id || tid === d.id;
          })
          .attr('stroke', '#667eea')
          .attr('stroke-width', 2);
        // Highlight hovered node
        nodeSel.filter(n => n.id === d.id)
          .select('circle')
          .attr('stroke', '#ffeb3b')
          .attr('stroke-width', 3);
        labelSel.attr('opacity', n => connected.has(n.id) ? 1 : 0.15);
      })
      .on('mouseleave', () => {
        setTooltip(null);
        nodeSel.attr('opacity', 1);
        nodeSel.selectAll('circle').attr('stroke', 'white').attr('stroke-width', 2);
        // Restore center highlight rings
        nodeSel.filter(d => d.isCenter).selectAll('circle:nth-child(3)')
          .attr('stroke', d => getTypeColor((d as GraphNode).type).stroke)
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.4);
        // Re-apply persistent selection highlight
        applySelectionHighlight(selectedNodeRef.current);
        linkG.selectAll<SVGLineElement, GraphLink>('line')
          .attr('stroke', '#c0c0c0')
          .attr('stroke-width', 1.2)
          .attr('stroke-opacity', 0.35);
        labelSel.attr('opacity', 1);
      });

    // Click background to deselect
    svg.on('click', () => {
      setSelectedNode(null);
      selectedNodeRef.current = null;
      setDetailsOpen(false);
      // Clear persistent highlight
      nodeSel.selectAll('circle').attr('stroke', 'white').attr('stroke-width', 2);
      nodeSel.filter(d => d.isCenter).selectAll('circle:nth-child(3)')
        .attr('stroke', d => getTypeColor((d as GraphNode).type).stroke)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.4);
    });

    // Tick
    simulation.on('tick', () => {
      linkG.selectAll<SVGLineElement, GraphLink>('line')
        .attr('x1', d => (d.source as GraphNode).x!)
        .attr('y1', d => (d.source as GraphNode).y!)
        .attr('x2', d => {
          const src = d.source as GraphNode; const tgt = d.target as GraphNode;
          const dx = tgt.x! - src.x!; const dy = tgt.y! - src.y!;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return tgt.x! - (dx / dist) * nodeRadius(tgt);
        })
        .attr('y2', d => {
          const src = d.source as GraphNode; const tgt = d.target as GraphNode;
          const dx = tgt.x! - src.x!; const dy = tgt.y! - src.y!;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return tgt.y! - (dy / dist) * nodeRadius(tgt);
        });

      nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
      labelSel.attr('x', d => d.x!).attr('y', d => d.y!);
    });

    return () => { simulation.stop(); };
  }, [graph.graphData, handleNodeClick, handleNodeDblClick]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) handleSearch(searchQuery.trim(), false);
  };

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target as Node)) {
        setSearchDropdownOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const resetView = () => {
    if (svgRef.current && zoomRef.current) {
      const svg = d3.select(svgRef.current);
      svg.transition().duration(750).call(
        zoomRef.current.transform,
        d3.zoomIdentity,
      );
    }
    if (simulationRef.current) {
      simulationRef.current.alpha(1).restart();
    }
  };

  // Entity search — filter nodes already in the graph
  const handleEntitySearch = useCallback((q: string) => {
    setEntitySearch(q);
    if (!q.trim()) {
      setEntitySearchResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const matches = graph.rawData.nodes
      .filter(n => n.label.toLowerCase().includes(lower))
      .slice(0, 10);
    setEntitySearchResults(matches);
  }, [graph.rawData.nodes]);

  const focusOnNode = useCallback((node: GraphNode) => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = d3.select(svgRef.current);
    const rect = svgRef.current.getBoundingClientRect();

    // Find the D3-mutated node with live x/y positions
    const target = d3NodesRef.current.find(n => n.id === node.id);
    if (!target || target.x == null || target.y == null) return;

    // Zoom to node
    const scale = 2.5;
    const x = -target.x * scale + rect.width / 2;
    const y = -target.y * scale + rect.height / 2;

    svg.transition().duration(750).call(
      zoomRef.current.transform,
      d3.zoomIdentity.translate(x, y).scale(scale),
    );

    // Select node and show details
    setSelectedNode(node);
    setDetailsOpen(true);
    setEntitySearch('');
    setEntitySearchResults([]);
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      {/* Header — compact gradient bar */}
      <header className="flex items-center gap-4 px-5 py-3" style={{ background: 'linear-gradient(135deg, #1a472a 0%, #2d5016 100%)' }}>
        <Link to="/explore" className="flex items-center gap-2 text-white/70 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          <Leaf className="h-5 w-5 text-green-400" />
          <span className="text-lg font-bold text-white">Knowledge Graph</span>
        </Link>
        <span className="text-sm text-white/40">|</span>
        <span className="text-sm text-white/60">Interactive entity exploration across 69K+ documents</span>

        {/* 3D Toggle */}
        <button
          onClick={() => setIs3D(!is3D)}
          className={`ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            is3D
              ? 'bg-green-400/20 text-green-300 border border-green-400/30'
              : 'bg-white/10 text-white/60 border border-white/20 hover:text-white hover:border-white/40'
          }`}
        >
          {is3D ? <Box className="h-3.5 w-3.5" /> : <Square className="h-3.5 w-3.5" />}
          {is3D ? '3D' : '2D'}
        </button>

        {/* Search in header */}
        <div ref={searchDropdownRef} className="relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSearchDropdownOpen(false); }}
                placeholder="Search KOI knowledge base..."
                className="w-80 rounded-full border border-white/20 bg-white/10 py-2 pl-10 pr-10 text-sm text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15"
              />
              {searchLoading && (
                <div className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              {!searchLoading && searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSearchResults([]); setSearchDropdownOpen(false); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
          {/* Search results dropdown */}
          {searchDropdownOpen && searchResults.length > 0 && (
            <div className="absolute right-0 top-full z-50 mt-2 w-96 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
              <div className="border-b border-gray-100 px-3 py-2 text-xs font-medium text-gray-500">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} — click to explore
              </div>
              <div className="max-h-80 overflow-y-auto">
                {searchResults.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => expandFromResult(r, i)}
                    className="flex w-full items-start gap-3 border-b border-gray-50 px-3 py-2.5 text-left hover:bg-green-50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-800 line-clamp-1">{displayTitle(r, i)}</div>
                      {r.content && (
                        <div className="mt-0.5 text-xs text-gray-500 line-clamp-1">{r.content.slice(0, 120)}</div>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {r.source && (
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${sourceColor(r.source)}`}>
                          {r.source}
                        </span>
                      )}
                      {r.score != null && (
                        <span className="text-[10px] text-gray-400">{Math.round(r.score * 100)}%</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar — Controls */}
        <div className="flex w-72 flex-col border-r border-gray-200 bg-white overflow-y-auto">
          {/* Entity search — search within loaded graph */}
          <div className="border-b border-gray-100 p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-green-700">Filter Loaded Entities</h3>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={entitySearch}
                  onChange={e => handleEntitySearch(e.target.value)}
                  placeholder="Filter by name..."
                  className="w-full rounded-lg border border-gray-200 py-2 pl-8 pr-8 text-sm outline-none focus:border-green-500"
                />
                {entitySearch && (
                  <button
                    onClick={() => { setEntitySearch(''); setEntitySearchResults([]); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              {entitySearchResults.length > 0 && (
                <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-100">
                  {entitySearchResults.map(node => (
                    <button
                      key={node.id}
                      onClick={() => focusOnNode(node)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-green-50"
                    >
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: getTypeColor(node.type).stroke }} />
                      <span className="truncate">{node.label}</span>
                      <span className="ml-auto shrink-0 text-[10px] text-gray-400">{node.type}</span>
                    </button>
                  ))}
                </div>
              )}
              {entitySearch && entitySearchResults.length === 0 && (
                <p className="text-xs text-gray-400">No matching entities in graph</p>
              )}
            </div>
          </div>

          {/* KOI Search Results */}
          {searchResults.length > 0 && (
            <div className="border-b border-gray-100 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-green-700">
                Search Results <span className="ml-1 text-gray-400">({searchResults.length})</span>
              </h3>
              <div className="max-h-60 space-y-1.5 overflow-y-auto">
                {searchResults.slice(0, 8).map((r, i) => (
                  <button
                    key={i}
                    onClick={() => expandFromResult(r, i)}
                    className="block w-full rounded-lg px-2.5 py-2 text-left hover:bg-green-50"
                  >
                    <div className="text-sm font-medium text-gray-800 line-clamp-2">{displayTitle(r, i)}</div>
                    <div className="mt-1 flex items-center gap-1.5">
                      {r.source && (
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${sourceColor(r.source)}`}>
                          {r.source}
                        </span>
                      )}
                      {r.score != null && (
                        <span className="text-[10px] text-gray-400">{Math.round(r.score * 100)}%</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Entity type filters */}
          <div className="border-b border-gray-100 p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-green-700">Entity Types</h3>
            <div className="flex flex-col gap-1.5">
              {Array.from(graph.availableTypes).sort().map(type => {
                const color = TYPE_COLORS[type] || TYPE_COLORS.Concept;
                const active = graph.filters.entityTypes.size === 0 || graph.filters.entityTypes.has(type);
                return (
                  <label key={type} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => graph.toggleType(type)}
                      className="h-4 w-4 accent-green-600"
                    />
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color.stroke }} />
                    <span className="text-sm">{type}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Importance slider */}
          <div className="border-b border-gray-100 p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-green-700">Importance</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Min:</span>
              <input
                type="range" min={0} max={100}
                value={Math.round(graph.filters.minImportance * 100)}
                onChange={e => graph.setMinImportance(Number(e.target.value) / 100)}
                className="h-1.5 flex-1 accent-green-600"
              />
              <span className="w-8 text-xs text-gray-500">{Math.round(graph.filters.minImportance * 100)}%</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="border-b border-gray-100 p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-green-700">Statistics</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Visible Nodes:</span>
                <span className="font-semibold text-green-700">{graph.stats.visibleNodes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Visible Links:</span>
                <span className="font-semibold text-green-700">{graph.stats.visibleLinks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Entities:</span>
                <span className="font-semibold text-green-700">{graph.stats.totalNodes}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4">
            <button
              onClick={() => { graph.reset(); setSelectedNode(null); selectedNodeRef.current = null; setDetailsOpen(false); setSearchResults([]); }}
              className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-800"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Graph
            </button>
            <button
              onClick={resetView}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Reset View
            </button>
          </div>

          {/* Legend */}
          <div className="mt-auto border-t border-gray-100 p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-green-700">Legend</h3>
            <div className="space-y-2">
              {Object.entries(TYPE_COLORS).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color.stroke }} />
                  <span className="text-xs text-gray-600">{type}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2">
                <svg width="24" height="10"><circle cx="4" cy="5" r="3" fill="#999" /><circle cx="4" cy="5" r="3" fill="none" stroke="white" strokeWidth="1" /></svg>
                <span className="text-[10px] text-gray-400">Low importance</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="24" height="14"><circle cx="7" cy="7" r="6" fill="#999" /><circle cx="7" cy="7" r="6" fill="none" stroke="white" strokeWidth="1" /></svg>
                <span className="text-[10px] text-gray-400">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="24" height="20"><circle cx="10" cy="10" r="9" fill="#999" /><circle cx="10" cy="10" r="9" fill="none" stroke="white" strokeWidth="1" /></svg>
                <span className="text-[10px] text-gray-400">High importance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center — Graph visualization */}
        <div className="relative flex-1 bg-white">
          {is3D ? (
            <Suspense fallback={
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
                  <span className="text-sm font-medium text-green-700">Loading 3D engine...</span>
                </div>
              </div>
            }>
              <ForceGraph3D
                data={graph.graphData}
                onNodeClick={handleNodeClick}
                onNodeDblClick={handleNodeDblClick}
              />
            </Suspense>
          ) : (
          <svg
            ref={svgRef}
            className="h-full w-full"
            style={{ display: 'block' }}
          />
          )}

          {/* Loading overlay */}
          {graph.loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
                <span className="text-sm font-medium text-green-700">Expanding graph...</span>
              </div>
            </div>
          )}

          {/* Empty state */}
          {graph.stats.totalNodes === 0 && !graph.loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Database className="mx-auto mb-3 h-12 w-12" />
                <p className="text-lg font-medium">Search to explore the knowledge graph</p>
                <p className="mt-1 text-sm">Try: "ecological credit methodology governance"</p>
              </div>
            </div>
          )}

          {/* Tooltip */}
          {tooltip && (
            <div
              className="pointer-events-none fixed z-50 max-w-[250px] rounded-lg px-3 py-2.5 text-sm shadow-lg"
              style={{
                left: Math.min(tooltip.x + 12, window.innerWidth - 260),
                top: Math.min(tooltip.y - 10, window.innerHeight - 120),
                background: 'rgba(0,0,0,0.9)',
                color: 'white',
              }}
            >
              <div className="font-semibold">{tooltip.node.label}</div>
              <div className="mt-0.5 text-xs opacity-80">{tooltip.node.type}</div>
              <div className="mt-1 text-xs opacity-60">
                {tooltip.node.occurrenceCount} occurrences &middot; {tooltip.node.relationshipCount} relationships
              </div>
              <div className="mt-1 text-xs text-green-300">
                {tooltip.node.isCenter ? 'Click to select' : 'Click to select \u00B7 Double-click to expand'}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar — Entity Details */}
        <div className={`flex flex-col border-l border-gray-200 bg-white transition-all duration-300 ${detailsOpen ? 'w-80' : 'w-0'} overflow-hidden`}>
          {selectedNode && (
            <>
              <div className="flex items-center justify-between px-5 py-4" style={{ background: 'linear-gradient(135deg, #1a472a 0%, #2d5016 100%)' }}>
                <h3 className="text-lg font-semibold text-white">Entity Details</h3>
                <button onClick={() => setDetailsOpen(false)} className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <div className="text-xl font-bold text-gray-900">{selectedNode.label}</div>
                <span
                  className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase text-white"
                  style={{ backgroundColor: getTypeColor(selectedNode.type).stroke }}
                >
                  {selectedNode.type}
                </span>
                <div className="mt-4 space-y-3 rounded-lg bg-gray-50 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Importance</span>
                    <span className="font-semibold">{Math.round(selectedNode.importance * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Occurrences</span>
                    <span className="font-semibold">{selectedNode.occurrenceCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Relationships</span>
                    <span className="font-semibold">{selectedNode.relationshipCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Depth</span>
                    <span className="font-semibold">{selectedNode.depth}</span>
                  </div>
                </div>
                {!selectedNode.isCenter && (
                  <button
                    onClick={() => graph.expandNode(selectedNode.label)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-800"
                  >
                    Expand Neighborhood
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}

                {/* Hint for double-click */}
                {!selectedNode.isCenter && (
                  <p className="mt-3 text-center text-xs text-gray-400">
                    Double-click node to expand neighborhood
                  </p>
                )}
              </div>
            </>
          )}
          {!selectedNode && detailsOpen && (
            <div className="flex flex-1 items-center justify-center p-5 text-center text-sm text-gray-400">
              Select an entity to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Import the Database icon for empty state
function Database(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
    </svg>
  );
}

function extractCandidates(results: KoiResult[], query: string): string[] {
  const seen = new Set<string>();
  const candidates: string[] = [];
  const add = (label: string) => {
    const key = label.toLowerCase().trim();
    if (key && !seen.has(key)) { seen.add(key); candidates.push(label.trim()); }
  };
  const queryClassMatch = query.match(/\b([A-Z]{1,4}\d{2})\b/);
  if (queryClassMatch) add(queryClassMatch[1]);
  for (const r of results.slice(0, 3)) {
    const matched = (r.metadata as Record<string, unknown>)?.entities_matched;
    if (Array.isArray(matched)) {
      for (const e of matched) { if (typeof e === 'string' && e.length > 2) add(e); }
    }
  }
  for (const r of results.slice(0, 3)) {
    const match = r.title?.match(/\b([A-Z]{1,4}\d{2})\b/);
    if (match) add(match[1]);
  }
  const qWords = query.split(/\s+/);
  if (qWords.length >= 2) add(qWords.slice(0, 2).join(' '));
  if (qWords.length >= 3) add(qWords.slice(0, 3).join(' '));
  add(query);
  return candidates;
}
