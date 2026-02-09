import { cn } from '../lib/utils';
import type { NeedAssessment } from '../data/types';

interface NeedsTableProps {
  needs: NeedAssessment[];
}

const priorityStyles = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-green-50 text-green-700 border-green-200',
};

export function NeedsTable({ needs }: NeedsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Need</th>
            <th className="px-4 py-3 text-center font-medium text-muted-foreground">Priority</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Evidence</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Regen Capability</th>
          </tr>
        </thead>
        <tbody>
          {needs.map((n, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="px-4 py-3 font-medium">{n.need}</td>
              <td className="px-4 py-3 text-center">
                <span className={cn(
                  'inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold capitalize',
                  priorityStyles[n.priority],
                )}>
                  {n.priority}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{n.evidence}</td>
              <td className="px-4 py-3 text-muted-foreground">{n.capability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
