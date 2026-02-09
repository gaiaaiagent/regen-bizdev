import { useEffect, useState } from 'react';
import { TrendingUp, Globe, Leaf, AlertCircle } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { getLedgerBatches, getLedgerProjects, getLedgerCreditTypes } from '../lib/koi';

interface TrackRecordData {
  batchCount: number;
  projectCount: number;
  creditTypeCount: number;
  vintageRange: string;
  countries: string[];
  socialProof: { id: string; description: string }[];
}

export function RegistryTrackRecord() {
  const [data, setData] = useState<TrackRecordData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getLedgerBatches(), getLedgerProjects(), getLedgerCreditTypes()])
      .then(([batches, projects, creditTypes]) => {
        if (cancelled) return;

        // Compute vintage range from batch start_date fields
        const years = batches
          .map(b => b.start_date ? new Date(b.start_date).getFullYear() : null)
          .filter((y): y is number => y != null && !isNaN(y));
        const minYear = years.length ? Math.min(...years) : null;
        const maxYear = years.length ? Math.max(...years) : null;
        const vintageRange = minYear && maxYear ? `${minYear}-${maxYear}` : 'N/A';

        // Extract unique countries from project jurisdiction
        const countrySet = new Set<string>();
        for (const p of projects) {
          if (p.jurisdiction) {
            // jurisdiction format is often "CC-ST" or just "CC"
            const cc = p.jurisdiction.split('-')[0];
            const name = countryCodeToName(cc);
            if (name) countrySet.add(name);
          }
        }

        // Find BT01 biodiversity projects
        const btProjects = projects.filter(p => p.class_id?.startsWith('BT01'));
        const carbonProjects = projects.filter(p => p.class_id?.startsWith('C02'));
        const conservationProjects = projects.filter(p => p.class_id?.startsWith('C03'));

        const socialProof: { id: string; description: string }[] = [];
        if (btProjects.length > 0) {
          socialProof.push({
            id: btProjects.map(p => p.id).join(' & '),
            description: `${btProjects.length} biodiversity credit project${btProjects.length > 1 ? 's' : ''} (BioTerra)`,
          });
        }
        if (carbonProjects.length > 0) {
          socialProof.push({
            id: 'C02',
            description: `${carbonProjects.length}+ soil carbon projects across the US`,
          });
        }
        if (conservationProjects.length > 0) {
          socialProof.push({
            id: 'C03',
            description: `Habitat conservation across multiple countries`,
          });
        }

        setData({
          batchCount: batches.length,
          projectCount: projects.length,
          creditTypeCount: creditTypes.length,
          vintageRange,
          countries: Array.from(countrySet).slice(0, 12),
          socialProof,
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-white p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <AlertCircle className="h-3.5 w-3.5" />
          Ledger data unavailable — connect to production for live track record
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border border-border bg-white p-6">
        <div className="flex items-center justify-center py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white p-6 space-y-5">
      {/* Counters Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AnimatedCounter target={data.batchCount} label="credit batches issued" delay={0} />
        <AnimatedCounter target={data.projectCount} label="registered projects" delay={100} />
        <AnimatedCounter target={data.creditTypeCount} label="credit types" delay={200} />
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{data.vintageRange}</div>
          <div className="text-xs text-muted-foreground">vintage date range</div>
        </div>
      </div>

      {/* Countries */}
      {data.countries.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Projects across</span>
          {data.countries.map(c => (
            <span key={c} className="rounded-full bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
              {c}
            </span>
          ))}
        </div>
      )}

      {/* Social Proof */}
      {data.socialProof.length > 0 && (
        <div className="space-y-2">
          {data.socialProof.map((sp, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
              <Leaf className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-600" />
              <div>
                <span className="text-xs font-semibold text-green-800">{sp.id}:</span>{' '}
                <span className="text-xs text-green-700">{sp.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Callout */}
      <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <p className="text-xs font-medium text-primary/80">
          Production infrastructure with a multi-year track record — not a prototype.
        </p>
      </div>
    </div>
  );
}

function countryCodeToName(code: string): string | null {
  const map: Record<string, string> = {
    CO: 'Colombia', KE: 'Kenya', PE: 'Peru', ID: 'Indonesia',
    KH: 'Cambodia', US: 'United States', BR: 'Brazil', CD: 'DRC',
    CN: 'China', CG: 'Congo', GH: 'Ghana', CI: "Cote d'Ivoire",
    IN: 'India', MX: 'Mexico', TZ: 'Tanzania', UG: 'Uganda',
    NG: 'Nigeria', ET: 'Ethiopia', RW: 'Rwanda', ZA: 'South Africa',
  };
  return map[code.toUpperCase()] || null;
}
