import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface VerraComparisonProps {
  framing: 'complementary' | 'institutional';
}

const rows = [
  {
    dimension: 'Market Recognition',
    verra: 'Industry standard, widely recognized by buyers',
    regen: 'Emerging, growing project base (78+ batches, 58 projects)',
  },
  {
    dimension: 'Biodiversity',
    verra: 'Nature Framework launched (biodiversity-adjacent)',
    regen: 'BT01 (BioTerra) — on-chain biodiversity credits with 2 active projects',
  },
  {
    dimension: 'Data Verification',
    verra: 'Third-party audits (established auditor ecosystem)',
    regen: 'On-chain data anchoring + multi-party attestation chain',
  },
  {
    dimension: 'Multi-dimensional',
    verra: 'Primarily carbon; Nature Framework expanding',
    regen: 'Carbon + Biodiversity + proposable new credit types',
  },
  {
    dimension: 'Transparency',
    verra: 'Centralized registry with public project database',
    regen: 'On-chain governance, public review process, verifiable data',
  },
  {
    dimension: 'Time to Carbon Credit',
    verra: 'Well-defined but often 12-18+ months',
    regen: 'Designed for faster iteration on existing classes',
  },
  {
    dimension: 'Complementary Use',
    verra: '—',
    regen: 'Can stack with Verra carbon credits (bridge mechanism designed, not yet proven in production)',
  },
];

const framingText = {
  complementary: {
    title: 'Complementary, Not Competing',
    subtitle: 'Verra is the industry standard for carbon. Regen adds capabilities Verra doesn\'t offer — and they work together.',
  },
  institutional: {
    title: 'Why On-Chain Verification Matters for Institutional Investors',
    subtitle: 'Verra is the industry standard for carbon. Regen adds on-chain governance, multi-dimensional credits, and transparent data verification.',
  },
};

export function VerraComparison({ framing }: VerraComparisonProps) {
  const [expanded, setExpanded] = useState(false);
  const text = framingText[framing];

  return (
    <div className="rounded-lg border border-border">
      <button
        className="flex w-full items-center gap-3 p-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="flex-1">
          <span className="text-sm font-semibold">{text.title}</span>
          <span className="ml-2 text-xs text-muted-foreground">How does Regen compare?</span>
        </span>
        {expanded ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="border-t px-4 pb-4 pt-3 space-y-3">
          <p className="text-xs text-muted-foreground italic">{text.subtitle}</p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Dimension</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Verra (VCS)</th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Regen Network</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium whitespace-nowrap">{row.dimension}</td>
                    <td className="px-4 py-2 text-muted-foreground">{row.verra}</td>
                    <td className="px-4 py-2">{row.regen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Note: Where Regen capabilities are designed but not yet proven at scale, this is indicated. Verra strengths (market recognition, established auditor ecosystem) are acknowledged.
          </p>
        </div>
      )}
    </div>
  );
}
