import { useCallback } from 'react';
import type { ResolvedEntity, EntityNeighbor } from '../lib/koi';

interface EntityGraphProps {
  center: ResolvedEntity | null;
  neighbors: EntityNeighbor[];
  onNodeClick?: (label: string) => void;
  loading?: boolean;
}

const TYPE_COLORS: Record<string, { fill: string; stroke: string; text: string }> = {
  CreditClass: { fill: '#dcfce7', stroke: '#16a34a', text: '#15803d' },
  Person: { fill: '#dbeafe', stroke: '#2563eb', text: '#1d4ed8' },
  Organization: { fill: '#f3e8ff', stroke: '#9333ea', text: '#7e22ce' },
  Project: { fill: '#ffedd5', stroke: '#ea580c', text: '#c2410c' },
  Concept: { fill: '#f3f4f6', stroke: '#6b7280', text: '#374151' },
  Document: { fill: '#fef3c7', stroke: '#d97706', text: '#b45309' },
  Location: { fill: '#e0f2fe', stroke: '#0284c7', text: '#0369a1' },
};

function getColor(type?: string) {
  if (!type) return TYPE_COLORS.Concept;
  for (const [key, val] of Object.entries(TYPE_COLORS)) {
    if (type.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return TYPE_COLORS.Concept;
}

function truncate(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 1) + '\u2026' : s;
}

const W = 600;
const H = 420;
const CX = W / 2;
const CY = H / 2;
const CENTER_R = 36;
const ORBIT_R = 150;
const NODE_R = 26;

export function EntityGraph({ center, neighbors, onNodeClick, loading }: EntityGraphProps) {
  const handleClick = useCallback(
    (label?: string) => {
      if (label && onNodeClick) onNodeClick(label);
    },
    [onNodeClick],
  );

  if (loading) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-xl border border-border bg-muted/30">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-xs">Resolving entities...</span>
        </div>
      </div>
    );
  }

  if (!center) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/20">
        <p className="text-xs text-muted-foreground">Entity graph will appear after search</p>
      </div>
    );
  }

  const nodes = neighbors.slice(0, 12);
  const angleStep = (2 * Math.PI) / Math.max(nodes.length, 1);

  const centerColor = getColor(center.type);

  return (
    <div className="rounded-xl border border-border bg-white p-2">
      {/* Legend */}
      <div className="mb-1 flex flex-wrap gap-2 px-2">
        {Object.entries(TYPE_COLORS).map(([type, c]) => (
          <div key={type} className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.stroke }} />
            <span className="text-[10px] text-muted-foreground">{type}</span>
          </div>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 420 }}>
        {/* Edges */}
        {nodes.map((n, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const nx = CX + ORBIT_R * Math.cos(angle);
          const ny = CY + ORBIT_R * Math.sin(angle);
          return (
            <line
              key={`edge-${i}`}
              x1={CX}
              y1={CY}
              x2={nx}
              y2={ny}
              stroke="#e5e7eb"
              strokeWidth={1.5}
              strokeDasharray={n.direction === 'incoming' ? '4 3' : undefined}
            />
          );
        })}

        {/* Neighbor nodes */}
        {nodes.map((n, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const nx = CX + ORBIT_R * Math.cos(angle);
          const ny = CY + ORBIT_R * Math.sin(angle);
          const c = getColor(n.type);
          const label = n.label || 'Unknown';

          return (
            <g
              key={`node-${i}`}
              onClick={() => handleClick(n.label)}
              className="cursor-pointer"
              style={{ transition: 'transform 0.3s ease' }}
            >
              <circle cx={nx} cy={ny} r={NODE_R} fill={c.fill} stroke={c.stroke} strokeWidth={1.5} />
              <text
                x={nx}
                y={ny - 4}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={c.text}
                fontSize={9}
                fontWeight={600}
              >
                {truncate(label, 14)}
              </text>
              {n.relationship && (
                <text
                  x={nx}
                  y={ny + 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#9ca3af"
                  fontSize={7}
                >
                  {truncate(n.relationship, 16)}
                </text>
              )}
              {n.type && (
                <text
                  x={nx}
                  y={ny + NODE_R + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#9ca3af"
                  fontSize={7}
                >
                  {n.type}
                </text>
              )}
            </g>
          );
        })}

        {/* Center node */}
        <g>
          <circle cx={CX} cy={CY} r={CENTER_R} fill={centerColor.fill} stroke={centerColor.stroke} strokeWidth={2.5} />
          <text
            x={CX}
            y={CY - 5}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={centerColor.text}
            fontSize={11}
            fontWeight={700}
          >
            {truncate(center.label || 'Entity', 16)}
          </text>
          {center.type && (
            <text
              x={CX}
              y={CY + 10}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#6b7280"
              fontSize={8}
            >
              {center.type}
            </text>
          )}
        </g>

        {/* Empty state for no neighbors */}
        {nodes.length === 0 && (
          <text x={CX} y={CY + CENTER_R + 24} textAnchor="middle" fill="#9ca3af" fontSize={11}>
            No connected entities found
          </text>
        )}
      </svg>
    </div>
  );
}
