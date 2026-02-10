import { useState } from 'react';
import { ChevronDown, ChevronRight, GitCompare } from 'lucide-react';

export interface ComparisonRow {
  requirement: string;
  registryExpects: string;
  clientProvides: string;
  status: 'aligned' | 'partial' | 'gap';
}

interface MethodologyComparisonProps {
  creditClass: string;
  clientMethodology: string;
  rows: ComparisonRow[];
}

const statusStyles = {
  aligned: 'bg-green-50 text-green-700',
  partial: 'bg-amber-50 text-amber-700',
  gap: 'bg-gray-100 text-gray-600',
};

export function MethodologyComparison({ creditClass, clientMethodology, rows }: MethodologyComparisonProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-dashed border-border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <GitCompare className="h-3.5 w-3.5" />
        {creditClass} Requirements vs. {clientMethodology}
        {expanded ? <ChevronDown className="ml-auto h-3.5 w-3.5" /> : <ChevronRight className="ml-auto h-3.5 w-3.5" />}
      </button>

      {expanded && (
        <div className="border-t border-dashed border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Requirement</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">{creditClass} Expects</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">{clientMethodology} Provides</th>
                  <th className="px-3 py-2 text-center font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-3 py-2 font-medium">{row.requirement}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.registryExpects}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.clientProvides}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-semibold capitalize ${statusStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
