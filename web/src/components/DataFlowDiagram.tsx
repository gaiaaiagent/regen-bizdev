import { ArrowDown, Database, FileCheck, Hash, Link, Shield, ShoppingCart } from 'lucide-react';
import { cn } from '../lib/utils';
import type { DataFlowStep } from '../data/types';

interface DataFlowDiagramProps {
  steps: DataFlowStep[];
}

const stepIcons = [Hash, Database, Shield, Link, FileCheck, ShoppingCart];

export function DataFlowDiagram({ steps }: DataFlowDiagramProps) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const Icon = stepIcons[i] || Database;
        return (
          <div key={i}>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg',
                    step.onChain
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-muted text-muted-foreground border border-border',
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Step {step.step}: {step.title}</span>
                  {step.onChain && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      On-chain
                    </span>
                  )}
                  {!step.onChain && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Off-chain
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center justify-start pl-[18px] py-1">
                <ArrowDown className="h-4 w-4 text-border" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
