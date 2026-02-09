import { CheckCircle, Circle } from 'lucide-react';

interface Stage {
  label: string;
  duration: string;
  active?: boolean;
}

const stages: Stage[] = [
  { label: 'Discovery Sprint', duration: '2 weeks', active: true },
  { label: 'Registry Sprint', duration: '8 weeks' },
  { label: 'Governance Review', duration: '~16-24 weeks' },
  { label: 'First Credit Issuance', duration: '' },
];

export function JourneyTimeline() {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">Full Journey to Credit Issuance</h4>
      <div className="flex items-start gap-0 overflow-x-auto">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-start">
            <div className="flex flex-col items-center text-center min-w-[120px]">
              {stage.active ? (
                <CheckCircle className="h-6 w-6 text-primary" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground/40" />
              )}
              <span className={`mt-1.5 text-xs font-medium ${stage.active ? 'text-primary' : 'text-foreground'}`}>
                {stage.label}
              </span>
              {stage.duration && (
                <span className="mt-0.5 text-[10px] text-muted-foreground">{stage.duration}</span>
              )}
            </div>
            {i < stages.length - 1 && (
              <div className="mt-3 h-px w-8 flex-shrink-0 bg-muted-foreground/20 sm:w-12" />
            )}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground">
        Later stages show estimated ranges. Governance review timelines vary by methodology complexity.
      </p>
    </div>
  );
}
