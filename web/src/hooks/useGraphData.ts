import { useState, useMemo, useCallback, useRef } from 'react';
import type { GraphData, GraphFilters } from '../lib/graph-types';
import { getNeighborhoodForGraph } from '../lib/koi';

export interface GraphStats {
  visibleNodes: number;
  visibleLinks: number;
  totalNodes: number;
  totalLinks: number;
}

export function useGraphData() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [filters, setFilters] = useState<GraphFilters>({
    entityTypes: new Set<string>(),
    minImportance: 0,
    searchQuery: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track positions so expanded nodes keep their place
  const positionCache = useRef<Map<string, { x: number; y: number }>>(new Map());

  const expandNode = useCallback(async (label: string) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await getNeighborhoodForGraph(label);

      setGraphData(prev => {
        // Save current positions
        for (const n of prev.nodes) {
          if (n.x !== undefined && n.y !== undefined) {
            positionCache.current.set(n.id, { x: n.x, y: n.y });
          }
        }

        const existingNodes = new Map(prev.nodes.map(n => [n.id, n]));
        const existingLinks = new Set(
          prev.links.map(l => {
            const sid = typeof l.source === 'string' ? l.source : l.source.id;
            const tid = typeof l.target === 'string' ? l.target : l.target.id;
            return `${sid}->${tid}:${l.predicate}`;
          }),
        );

        // Merge new nodes (dedup by id)
        const mergedNodes = [...prev.nodes];
        for (const node of resp.nodes) {
          if (!existingNodes.has(node.id)) {
            // Restore cached position if available
            const cached = positionCache.current.get(node.id);
            if (cached) {
              node.x = cached.x;
              node.y = cached.y;
            }
            mergedNodes.push(node);
            existingNodes.set(node.id, node);
          } else {
            // Update existing node if it was a non-center that's now a center
            const existing = existingNodes.get(node.id)!;
            if (node.isCenter && !existing.isCenter) {
              existing.isCenter = true;
              existing.depth = 0;
            }
          }
        }

        // Merge new links (dedup by source->target:predicate)
        const mergedLinks = [...prev.links];
        for (const link of resp.links) {
          const sid = typeof link.source === 'string' ? link.source : link.source.id;
          const tid = typeof link.target === 'string' ? link.target : link.target.id;
          const key = `${sid}->${tid}:${link.predicate}`;
          if (!existingLinks.has(key)) {
            mergedLinks.push(link);
            existingLinks.add(key);
          }
        }

        return { nodes: mergedNodes, links: mergedLinks };
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load neighborhood');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setGraphData({ nodes: [], links: [] });
    positionCache.current.clear();
    setFilters({ entityTypes: new Set(), minImportance: 0, searchQuery: '' });
    setError(null);
  }, []);

  // Compute available entity types from all accumulated nodes
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    for (const n of graphData.nodes) types.add(n.type);
    return types;
  }, [graphData.nodes]);

  // Filter data based on current filters
  const filteredData = useMemo<GraphData>(() => {
    const hasTypeFilter = filters.entityTypes.size > 0;
    const hasSearch = filters.searchQuery.trim().length > 0;
    const searchLower = filters.searchQuery.toLowerCase();

    const visibleNodes = graphData.nodes.filter(n => {
      // Centers always visible
      if (n.isCenter) return true;
      if (hasTypeFilter && !filters.entityTypes.has(n.type)) return false;
      if (n.importance < filters.minImportance) return false;
      if (hasSearch && !n.label.toLowerCase().includes(searchLower)) return false;
      return true;
    });

    const visibleIds = new Set(visibleNodes.map(n => n.id));

    const visibleLinks = graphData.links.filter(l => {
      const sid = typeof l.source === 'string' ? l.source : l.source.id;
      const tid = typeof l.target === 'string' ? l.target : l.target.id;
      return visibleIds.has(sid) && visibleIds.has(tid);
    });

    return { nodes: visibleNodes, links: visibleLinks };
  }, [graphData, filters]);

  const stats = useMemo<GraphStats>(() => ({
    visibleNodes: filteredData.nodes.length,
    visibleLinks: filteredData.links.length,
    totalNodes: graphData.nodes.length,
    totalLinks: graphData.links.length,
  }), [filteredData, graphData]);

  const toggleType = useCallback((type: string) => {
    setFilters(prev => {
      const next = new Set(prev.entityTypes);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return { ...prev, entityTypes: next };
    });
  }, []);

  const setMinImportance = useCallback((val: number) => {
    setFilters(prev => ({ ...prev, minImportance: val }));
  }, []);

  return {
    graphData: filteredData,
    rawData: graphData,
    loading,
    error,
    expandNode,
    reset,
    filters,
    availableTypes,
    stats,
    toggleType,
    setMinImportance,
  };
}
