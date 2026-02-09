import { AlertTriangle } from 'lucide-react';
import type { ReviewerFlag as ReviewerFlagType } from '../data/types';

interface ReviewerFlagProps {
  flag: ReviewerFlagType;
  index: number;
}

export function ReviewerFlag({ flag, index }: ReviewerFlagProps) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
        </div>
        <div>
          <p className="text-sm font-medium text-amber-900">
            Flag {index + 1}: {flag.title}
          </p>
          <p className="mt-1 text-sm text-amber-800/80">{flag.description}</p>
        </div>
      </div>
    </div>
  );
}
