import { cn } from '../lib/utils';

interface TimelineStep {
  label: string;
  description?: string;
  status: 'complete' | 'current' | 'upcoming';
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="flex items-start gap-0 overflow-x-auto py-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold',
                step.status === 'complete' && 'border-primary bg-primary text-white',
                step.status === 'current' && 'border-primary bg-white text-primary',
                step.status === 'upcoming' && 'border-border bg-muted text-muted-foreground',
              )}
            >
              {i + 1}
            </div>
            <div className="mt-2 w-28 text-center">
              <p className={cn(
                'text-xs font-medium',
                step.status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground',
              )}>
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-[10px] text-muted-foreground">{step.description}</p>
              )}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              'mt-4 h-0.5 w-8 flex-shrink-0',
              step.status === 'complete' ? 'bg-primary' : 'bg-border',
            )} />
          )}
        </div>
      ))}
    </div>
  );
}
