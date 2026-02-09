import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { OnChainBadge } from './OnChainBadge';
import type { CreditClassMapping } from '../data/types';

interface MappingTableProps {
  mappings: CreditClassMapping[];
}

export function MappingTable({ mappings }: MappingTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Dimension</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Regen Credit Class</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Credit Type</th>
            <th className="px-4 py-3 text-center font-medium text-muted-foreground">Status</th>
            <th className="w-8 px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {mappings.map((m, i) => (
            <MappingRow key={i} mapping={m} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MappingRow({ mapping }: { mapping: CreditClassMapping }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className="cursor-pointer border-b transition-colors hover:bg-muted/30"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-4 py-3 font-medium">{mapping.dimension}</td>
        <td className="px-4 py-3">
          {mapping.creditClass ? (
            <span className="flex items-center gap-2">
              <span>
                <span className="font-mono text-primary font-semibold">{mapping.creditClass}</span>
                {mapping.creditClassName && <span className="text-muted-foreground"> ({mapping.creditClassName})</span>}
              </span>
              <OnChainBadge creditClass={mapping.creditClass} />
            </span>
          ) : (
            <span className="text-muted-foreground italic">No match</span>
          )}
        </td>
        <td className="px-4 py-3 text-muted-foreground">{mapping.creditType || '—'}</td>
        <td className="px-4 py-3 text-center">
          <StatusBadge status={mapping.status} />
        </td>
        <td className="px-2 py-3 text-muted-foreground">
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </td>
      </tr>
      {expanded && (
        <tr className="border-b bg-muted/20">
          <td colSpan={5} className="px-4 py-3">
            <div className="space-y-2">
              <div>
                <span className="text-xs font-semibold uppercase text-muted-foreground">Match Description</span>
                <p className="mt-0.5 text-sm">{mapping.matchDescription}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-muted-foreground">Gap / Action Required</span>
                <p className="mt-0.5 text-sm">{mapping.gapDescription}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
