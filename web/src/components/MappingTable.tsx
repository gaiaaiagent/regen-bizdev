import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { OnChainBadge } from './OnChainBadge';
import { getCachedBatches, getCachedProjects } from '../lib/koi';
import type { CreditBatch, LedgerProject } from '../lib/koi';
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
  const [batches, setBatches] = useState<CreditBatch[]>([]);
  const [projects, setProjects] = useState<LedgerProject[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!expanded || loaded || !mapping.creditClass) return;
    Promise.all([getCachedBatches(), getCachedProjects()])
      .then(([b, p]) => {
        // Match batches whose class_id starts with the credit class prefix
        const classPrefix = mapping.creditClass!;
        const matchedBatches = b.filter(batch => {
          // For C01-C09, match any C-class; for specific classes like BT01, match exactly
          if (classPrefix.includes('-')) {
            // Range like C01-C09
            const [start] = classPrefix.split('-');
            const prefix = start.replace(/\d+$/, '');
            return batch.denom?.startsWith(prefix);
          }
          return batch.denom?.startsWith(classPrefix);
        });
        const matchedProjects = p.filter(proj => {
          if (classPrefix.includes('-')) {
            const [start] = classPrefix.split('-');
            const prefix = start.replace(/\d+$/, '');
            return proj.class_id?.startsWith(prefix);
          }
          return proj.class_id?.startsWith(classPrefix);
        });
        setBatches(matchedBatches.slice(0, 5));
        setProjects(matchedProjects.slice(0, 5));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [expanded, loaded, mapping.creditClass]);

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
            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold uppercase text-muted-foreground">Match Description</span>
                <p className="mt-0.5 text-sm">{mapping.matchDescription}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-muted-foreground">Gap / Action Required</span>
                <p className="mt-0.5 text-sm">{mapping.gapDescription}</p>
              </div>
              {mapping.creditClass && batches.length > 0 && (
                <div>
                  <span className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1.5">
                    Live Ledger Evidence
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-medium text-green-700 normal-case">
                      <span className="h-1 w-1 rounded-full bg-green-500" />
                      LIVE
                    </span>
                  </span>
                  <div className="mt-1.5 space-y-1.5">
                    {batches.map((b, i) => (
                      <div key={i} className="flex items-center gap-3 rounded border border-border/60 bg-background px-3 py-2 text-xs">
                        <span className="font-mono font-semibold text-primary">{b.denom}</span>
                        {projects.find(p => p.id === b.project_id)?.jurisdiction && (
                          <span className="text-muted-foreground">
                            {projects.find(p => p.id === b.project_id)?.jurisdiction}
                          </span>
                        )}
                        {b.issuance_date && (
                          <span className="text-muted-foreground">
                            Issued {new Date(b.issuance_date).toLocaleDateString()}
                          </span>
                        )}
                        <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${b.open ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {b.open ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
