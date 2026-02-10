import { TYPE_COLORS } from '../lib/graph-types';
import type { GraphStats } from '../hooks/useGraphData';
import { Maximize2, Minimize2, RotateCcw } from 'lucide-react';

interface GraphControlsProps {
  availableTypes: Set<string>;
  activeTypes: Set<string>;
  onToggleType: (type: string) => void;
  minImportance: number;
  onMinImportanceChange: (val: number) => void;
  stats: GraphStats;
  onReset: () => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function GraphControls({
  availableTypes,
  activeTypes,
  onToggleType,
  minImportance,
  onMinImportanceChange,
  stats,
  onReset,
  fullscreen,
  onToggleFullscreen,
}: GraphControlsProps) {
  const types = Array.from(availableTypes).sort();
  const showSlider = stats.totalNodes > 15;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-white px-3 py-2">
      {/* Type filter pills */}
      <div className="flex flex-wrap gap-1">
        {types.map(type => {
          const color = TYPE_COLORS[type] || TYPE_COLORS.Concept;
          const active = activeTypes.size === 0 || activeTypes.has(type);
          return (
            <button
              key={type}
              onClick={() => onToggleType(type)}
              className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium transition-opacity ${
                active ? 'opacity-100' : 'opacity-30'
              }`}
              style={{
                borderColor: color.stroke,
                color: color.text,
                backgroundColor: active ? color.fill : 'transparent',
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color.stroke }} />
              {type}
            </button>
          );
        })}
      </div>

      {/* Importance slider */}
      {showSlider && (
        <div className="flex items-center gap-1.5 border-l border-border pl-2">
          <span className="text-[10px] text-muted-foreground">Min:</span>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(minImportance * 100)}
            onChange={e => onMinImportanceChange(Number(e.target.value) / 100)}
            className="h-1 w-16 accent-primary"
          />
          <span className="w-6 text-[10px] text-muted-foreground">{Math.round(minImportance * 100)}%</span>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Stats */}
      <span className="text-[10px] text-muted-foreground">
        {stats.visibleNodes === stats.totalNodes
          ? `${stats.totalNodes} nodes`
          : `${stats.visibleNodes} of ${stats.totalNodes} nodes`}
      </span>

      {/* Reset */}
      {stats.totalNodes > 0 && (
        <button
          onClick={onReset}
          className="rounded p-1 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          title="Reset graph"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Fullscreen toggle */}
      <button
        onClick={onToggleFullscreen}
        className="rounded p-1 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
