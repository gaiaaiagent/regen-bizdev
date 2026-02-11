import { useEffect, useRef } from 'react';
import ForceGraph3DConstructor from '3d-force-graph';
import type { ForceGraph3DInstance } from '3d-force-graph';
import type { GraphNode, GraphLink, GraphData } from '../lib/graph-types';
import { getTypeColor } from '../lib/graph-types';

interface ForceGraph3DProps {
  data: GraphData;
  onNodeClick?: (node: GraphNode) => void;
  onNodeDblClick?: (node: GraphNode) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export function ForceGraph3D({ data, onNodeClick, onNodeDblClick }: ForceGraph3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<ForceGraph3DInstance | null>(null);
  const onNodeClickRef = useRef(onNodeClick);
  const onNodeDblClickRef = useRef(onNodeDblClick);
  onNodeClickRef.current = onNodeClick;
  onNodeDblClickRef.current = onNodeDblClick;

  // Init graph once
  useEffect(() => {
    if (!containerRef.current) return;

    const graph = new ForceGraph3DConstructor(containerRef.current)
      .backgroundColor('#f9fafb')
      .showNavInfo(false)
      .nodeLabel((node: any) => {
        return `<div style="background:rgba(0,0,0,0.85);color:white;padding:6px 10px;border-radius:6px;font-size:12px;">
          <div style="font-weight:600;">${node.label || 'Unknown'}</div>
          <div style="opacity:0.7;font-size:10px;">${node.type || ''} · ${node.relationshipCount || 0} relationships</div>
        </div>`;
      })
      .nodeColor((node: any) => getTypeColor(node.type).stroke)
      .nodeVal((node: any) => node.isCenter ? 12 : 2 + (node.importance || 0) * 8)
      .nodeOpacity(0.9)
      .linkColor(() => '#c0c0c0')
      .linkOpacity(0.3)
      .linkWidth(0.5)
      .linkDirectionalArrowLength(3)
      .linkDirectionalArrowRelPos(1)
      .onNodeClick((node: any) => {
        onNodeClickRef.current?.(node as GraphNode);
      })
      .onNodeRightClick((node: any) => {
        onNodeDblClickRef.current?.(node as GraphNode);
      });

    graphRef.current = graph;

    // Handle resize
    const observer = new ResizeObserver(() => {
      if (containerRef.current && graphRef.current) {
        graphRef.current.width(containerRef.current.clientWidth);
        graphRef.current.height(containerRef.current.clientHeight);
      }
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      graphRef.current?._destructor();
      graphRef.current = null;
    };
  }, []);

  // Update data when it changes
  useEffect(() => {
    if (!graphRef.current || data.nodes.length === 0) return;

    // Deep copy for 3D graph mutation
    const nodes = data.nodes.map(n => ({ ...n }));
    const links: GraphLink[] = data.links.map(l => ({
      ...l,
      source: typeof l.source === 'string' ? l.source : l.source.id,
      target: typeof l.target === 'string' ? l.target : l.target.id,
    }));

    graphRef.current.graphData({ nodes, links } as any);
  }, [data]);

  return (
    <div ref={containerRef} className="h-full w-full" style={{ position: 'relative' }}>
      {data.nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
          <p className="text-sm">Search to populate the 3D graph</p>
        </div>
      )}
    </div>
  );
}
