import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Link2, AlertCircle } from 'lucide-react';
import { fetchLedger } from '../lib/api';

interface CreditClass {
  id?: string;
  admin?: string;
  metadata?: string;
  credit_type_abbrev?: string;
}

interface LedgerLivePanelProps {
  highlightClasses?: string[];
}

export function LedgerLivePanel({ highlightClasses = [] }: LedgerLivePanelProps) {
  const [classes, setClasses] = useState<CreditClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queriedAt, setQueriedAt] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLedger<{ classes?: CreditClass[] }>(
          '/regen/ecocredit/v1/classes'
        );
        if (!cancelled && data.classes) {
          setClasses(data.classes);
          setQueriedAt(new Date());
        }
      } catch {
        if (!cancelled) setError('Ledger API unavailable');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex items-center gap-3 py-4">
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Live ledger data unavailable — credit class references above are from static analysis
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Link2 className="h-4 w-4 text-primary" />
          Live On-Chain Credit Classes
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            LIVE
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Querying Regen Ledger...
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <span className="text-sm">
                <span className="font-bold text-primary">{classes.length}</span>
                <span className="ml-1 text-muted-foreground">credit classes registered on Regen Ledger</span>
              </span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Class ID</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Credit Type</th>
                    <th className="px-3 py-2 text-center font-medium text-muted-foreground">Relevant</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((c, i) => {
                    const isHighlighted = highlightClasses.some(
                      h => c.id?.startsWith(h) || c.credit_type_abbrev === h
                    );
                    return (
                      <tr
                        key={i}
                        className={`border-b last:border-b-0 ${isHighlighted ? 'bg-green-50' : ''}`}
                      >
                        <td className="px-3 py-1.5 font-mono text-xs">{c.id}</td>
                        <td className="px-3 py-1.5 font-mono text-xs text-muted-foreground">
                          {c.credit_type_abbrev || '—'}
                        </td>
                        <td className="px-3 py-1.5 text-center">
                          {isHighlighted && (
                            <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                              Match
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {queriedAt && (
              <p className="text-[10px] text-muted-foreground">
                Last queried: {queriedAt.toLocaleTimeString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
