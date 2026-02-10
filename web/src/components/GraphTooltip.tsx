import type { GraphNode } from '../lib/graph-types';
import { getTypeColor } from '../lib/graph-types';

interface GraphTooltipProps {
  node: GraphNode | null;
  x: number;
  y: number;
}

export function GraphTooltip({ node, x, y }: GraphTooltipProps) {
  if (!node) return null;

  const color = getTypeColor(node.type);

  // Clamp tooltip position to stay within viewport
  const style: React.CSSProperties = {
    position: 'fixed',
    left: Math.min(x + 12, window.innerWidth - 220),
    top: Math.min(y - 10, window.innerHeight - 100),
    pointerEvents: 'none' as const,
    zIndex: 50,
  };

  return (
    <div style={style} className="rounded-lg border border-border bg-white px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color.stroke }} />
        <span className="text-xs font-medium" style={{ color: color.text }}>{node.type}</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-foreground">{node.label}</p>
      <div className="mt-1 flex gap-3 text-[10px] text-muted-foreground">
        <span>{node.occurrenceCount} occurrences</span>
        <span>{node.relationshipCount} relationships</span>
      </div>
      {!node.isCenter && (
        <p className="mt-1 text-[10px] text-primary">Click to expand</p>
      )}
    </div>
  );
}
