import { scoreBreakdown as landbankingBreakdown, act2 as landbankingAct2 } from '../data/landbanking';
import { scoreBreakdown as renewBreakdown, act2 as renewAct2 } from '../data/renew';
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react';

interface ReadinessBreakdownProps {
  client: 'landbanking' | 'renew';
}

const DATA = {
  landbanking: { breakdown: landbankingBreakdown, readiness: landbankingAct2.readiness },
  renew: { breakdown: renewBreakdown, readiness: renewAct2.readiness },
};

function scoreColor(current: number, max: number): string {
  const ratio = current / max;
  if (ratio >= 0.8) return 'bg-green-500';
  if (ratio >= 0.4) return 'bg-amber-500';
  return 'bg-red-400';
}

export function ReadinessBreakdown({ client }: ReadinessBreakdownProps) {
  const { breakdown, readiness } = DATA[client];
  const currentTotal = readiness.overall;

  return (
    <div className="rounded-lg border bg-card p-5 space-y-5" data-demo-target="Readiness Breakdown">
      {/* Current score components */}
      <div>
        <h3 className="text-sm font-semibold mb-3">
          Current Score: {currentTotal}/10
        </h3>
        <div className="space-y-3">
          {breakdown.components.map((comp) => (
            <div key={comp.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{comp.label}</span>
                <span className="text-muted-foreground">{comp.current}/{comp.max}</span>
              </div>
              <div className="mt-1 flex gap-1">
                {Array.from({ length: comp.max }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < comp.current ? scoreColor(comp.current, comp.max) : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{comp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Path forward */}
      <div>
        <h3 className="text-sm font-semibold mb-3">
          Path to {breakdown.targetScore}/10
        </h3>
        <div className="space-y-2">
          {breakdown.pathForward.map((step, idx) => {
            const fromScore = idx === 0 ? currentTotal : breakdown.pathForward[idx - 1].target;
            return (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <div className="mt-0.5 flex-shrink-0">
                  {step.target <= currentTotal ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-medium">{step.action}</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 text-xs text-muted-foreground">
                  <span>{fromScore}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span className="font-semibold text-foreground">{step.target}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
