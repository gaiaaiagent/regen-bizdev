import type { ReadinessScore as ReadinessScoreType } from '../data/types';

function getScoreColor(score: number): string {
  if (score <= 3) return '#3b82f6'; // blue — Foundation
  if (score <= 6) return '#d97706'; // amber — Building
  if (score <= 9) return '#16a34a'; // green — Advancing
  return '#16a34a';
}

function getScoreLabel(score: number): string {
  if (score <= 3) return 'Foundation';
  if (score <= 6) return 'Building';
  if (score <= 9) return 'Advancing';
  return 'Registry-Ready';
}

interface ReadinessScoreProps {
  readiness: ReadinessScoreType;
  contextLine?: string;
}

export function ReadinessScore({ readiness, contextLine }: ReadinessScoreProps) {
  const color = getScoreColor(readiness.overall);
  const label = getScoreLabel(readiness.overall);
  const pct = (readiness.overall / 10) * 100;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
      {/* Circular gauge */}
      <div className="relative flex-shrink-0">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#e5e5e5" strokeWidth="10" />
          <circle
            cx="70" cy="70" r={radius} fill="none"
            stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            transform="rotate(-90 70 70)"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>{readiness.overall}</span>
          <span className="text-xs text-muted-foreground">/10</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="flex-1 space-y-3">
        <div>
          <span className="text-lg font-semibold" style={{ color }}>{label}</span>
        </div>
        {contextLine && (
          <p className="text-sm text-muted-foreground">{contextLine}</p>
        )}
        <div className="space-y-2">
          <SubScore
            label="Methodology Coverage"
            score={readiness.methodologyCoverage.score}
            max={readiness.methodologyCoverage.max}
            description={readiness.methodologyCoverage.description}
          />
          <SubScore
            label="Data/Evidence Completeness"
            score={readiness.dataCompleteness.score}
            max={readiness.dataCompleteness.max}
            description={readiness.dataCompleteness.description}
          />
        </div>
      </div>
    </div>
  );
}

function SubScore({ label, score, max, description }: { label: string; score: number; max: number; description: string }) {
  const pct = (score / max) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{score}/{max}</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: getScoreColor(score * 2) }}
        />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
