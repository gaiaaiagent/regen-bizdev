import { cn } from '../lib/utils';
import type { RiskAssessment } from '../data/types';

interface RiskMatrixProps {
  risks: RiskAssessment[];
}

const levelStyles = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-green-50 text-green-700 border-green-200',
};

export function RiskMatrix({ risks }: RiskMatrixProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Risk</th>
            <th className="px-4 py-3 text-center font-medium text-muted-foreground">Likelihood</th>
            <th className="px-4 py-3 text-center font-medium text-muted-foreground">Impact</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Mitigation</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((r, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="px-4 py-3 font-medium">{r.risk}</td>
              <td className="px-4 py-3 text-center">
                <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold capitalize', levelStyles[r.likelihood])}>
                  {r.likelihood}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold capitalize', levelStyles[r.impact])}>
                  {r.impact}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{r.mitigation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
