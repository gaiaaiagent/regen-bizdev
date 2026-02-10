import { useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import type { GraphNode, GraphLink, GraphData } from '../lib/graph-types';
import { getTypeColor } from '../lib/graph-types';

interface ForceGraphProps {
  data: GraphData;
  loading?: boolean;
  onNodeClick?: (label: string) => void;
  onNodeHover?: (node: GraphNode | null, x: number, y: number) => void;
  width?: number;
  height?: number;
}

function nodeRadius(node: GraphNode): number {
  if (node.isCenter) return 28;
  return 6 + node.importance * 16;
}

function truncateLabel(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 1) + '\u2026' : s;
}

export function ForceGraph({
  data,
  loading,
  onNodeClick,
  onNodeHover,
  width = 600,
  height = 500,
}: ForceGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);
  const prevDataRef = useRef<GraphData>({ nodes: [], links: [] });

  const handleNodeClick = useCallback(
    (_event: MouseEvent, d: GraphNode) => {
      if (!d.isCenter && onNodeClick) onNodeClick(d.label);
    },
    [onNodeClick],
  );

  const handleNodeHover = useCallback(
    (event: MouseEvent, d: GraphNode | null) => {
      if (onNodeHover) onNodeHover(d, event.clientX, event.clientY);
    },
    [onNodeHover],
  );

  useEffect(() => {
    if (!svgRef.current || data.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    const isFirstRender = prevDataRef.current.nodes.length === 0;
    prevDataRef.current = data;

    // Deep-copy nodes/links so D3 can mutate x/y/source/target
    const nodes: GraphNode[] = data.nodes.map(n => ({ ...n }));
    const links: GraphLink[] = data.links.map(l => ({
      ...l,
      source: typeof l.source === 'string' ? l.source : l.source.id,
      target: typeof l.target === 'string' ? l.target : l.target.id,
    }));

    // --- Setup or update simulation ---
    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    const simulation = d3
      .forceSimulation<GraphNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(links)
          .id(d => d.id)
          .distance(l => {
            const src = l.source as GraphNode;
            const tgt = l.target as GraphNode;
            return src.isCenter || tgt.isCenter ? 120 : 80;
          }),
      )
      .force(
        'charge',
        d3.forceManyBody<GraphNode>().strength(d => (d.isCenter ? -400 : -200)),
      )
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.1))
      .force(
        'collide',
        d3.forceCollide<GraphNode>().radius(d => nodeRadius(d) + 8),
      )
      .alphaDecay(0.02);

    simulationRef.current = simulation;

    // --- Clear and redraw ---
    svg.selectAll('*').remove();

    // Zoom container
    const g = svg.append('g');
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 5])
      .on('zoom', event => {
        g.attr('transform', event.transform);
      });
    svg.call(zoom);

    // If first render, fit to center
    if (isFirstRender) {
      svg.call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1));
    }

    // Defs for arrow markers
    const defs = svg.append('defs');
    defs
      .append('marker')
      .attr('id', 'arrow-out')
      .attr('viewBox', '0 -3 6 6')
      .attr('refX', 6)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-3L6,0L0,3')
      .attr('fill', '#d1d5db');

    // Links
    const linkG = g.append('g').attr('class', 'links');
    linkG
      .selectAll<SVGLineElement, GraphLink>('line')
      .data(links)
      .join('line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', d => (d.direction === 'incoming' ? '4 3' : 'none'))
      .attr('marker-end', d => (d.direction === 'outgoing' ? 'url(#arrow-out)' : ''))
      .attr('opacity', 0)
      .transition()
      .duration(300)
      .attr('opacity', 1);

    // Node groups
    const nodeG = g.append('g').attr('class', 'nodes');
    const nodeSel = nodeG
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes, d => d.id)
      .join(enter => {
        const group = enter.append('g').attr('cursor', d => (d.isCenter ? 'default' : 'pointer'));

        // Circle
        group
          .append('circle')
          .attr('r', d => nodeRadius(d))
          .attr('fill', d => getTypeColor(d.type).fill)
          .attr('stroke', d => getTypeColor(d.type).stroke)
          .attr('stroke-width', d => (d.isCenter ? 2.5 : 1.5));

        // Label — always show for center, show for important neighbors
        group
          .filter(d => d.isCenter || d.importance > 0.3)
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', d => (d.isCenter ? -2 : -2))
          .attr('font-size', d => (d.isCenter ? 11 : 9))
          .attr('font-weight', d => (d.isCenter ? 700 : 600))
          .attr('fill', d => getTypeColor(d.type).text)
          .attr('pointer-events', 'none')
          .text(d => truncateLabel(d.label, d.isCenter ? 18 : 14));

        // Type label under center
        group
          .filter(d => d.isCenter)
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', 12)
          .attr('font-size', 8)
          .attr('fill', '#6b7280')
          .attr('pointer-events', 'none')
          .text(d => d.type);

        // Fade in
        group.attr('opacity', 0).transition().duration(300).attr('opacity', 1);

        return group;
      });

    // Drag behavior
    const drag = d3
      .drag<SVGGElement, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeSel.call(drag);

    // Click and hover
    nodeSel.on('click', (event, d) => {
      event.stopPropagation();
      handleNodeClick(event, d);
    });

    nodeSel.on('mouseenter', (event, d) => handleNodeHover(event, d));
    nodeSel.on('mouseleave', (event) => handleNodeHover(event, null));

    // Highlight on hover
    nodeSel
      .on('mouseenter.highlight', (_event, d) => {
        const connectedIds = new Set<string>();
        connectedIds.add(d.id);
        for (const l of links) {
          const sid = typeof l.source === 'object' ? l.source.id : l.source;
          const tid = typeof l.target === 'object' ? l.target.id : l.target;
          if (sid === d.id) connectedIds.add(tid as string);
          if (tid === d.id) connectedIds.add(sid as string);
        }
        nodeSel.attr('opacity', n => (connectedIds.has(n.id) ? 1 : 0.15));
        linkG
          .selectAll<SVGLineElement, GraphLink>('line')
          .attr('opacity', l => {
            const sid = typeof l.source === 'object' ? l.source.id : l.source;
            const tid = typeof l.target === 'object' ? l.target.id : l.target;
            return sid === d.id || tid === d.id ? 1 : 0.05;
          });
      })
      .on('mouseleave.highlight', () => {
        nodeSel.attr('opacity', 1);
        linkG.selectAll<SVGLineElement, GraphLink>('line').attr('opacity', 1);
      });

    // Tick
    simulation.on('tick', () => {
      linkG
        .selectAll<SVGLineElement, GraphLink>('line')
        .attr('x1', d => (d.source as GraphNode).x!)
        .attr('y1', d => (d.source as GraphNode).y!)
        .attr('x2', d => {
          const src = d.source as GraphNode;
          const tgt = d.target as GraphNode;
          const dx = tgt.x! - src.x!;
          const dy = tgt.y! - src.y!;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return tgt.x! - (dx / dist) * nodeRadius(tgt);
        })
        .attr('y2', d => {
          const src = d.source as GraphNode;
          const tgt = d.target as GraphNode;
          const dx = tgt.x! - src.x!;
          const dy = tgt.y! - src.y!;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return tgt.y! - (dy / dist) * nodeRadius(tgt);
        });

      nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data, width, height, handleNodeClick, handleNodeHover]);

  if (data.nodes.length === 0 && !loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/20" style={{ height }}>
        <p className="text-xs text-muted-foreground">Entity graph will appear after search</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl border border-border bg-white" style={{ height }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/60">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-xs">Expanding graph...</span>
          </div>
        </div>
      )}
    </div>
  );
}
