import { Server, Users, Globe } from 'lucide-react';

interface BeyondTheSprintProps {
  /** Client-specific framing for the knowledge platform description */
  platformDescription: string;
  /** Client-specific framing for the commons description */
  commonsDescription: string;
}

export function BeyondTheSprint({ platformDescription, commonsDescription }: BeyondTheSprintProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-5">
      <h4 className="text-sm font-semibold text-foreground">Beyond the Sprint</h4>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1.5 rounded-lg border border-border bg-white p-3">
          <div className="flex items-center gap-1.5">
            <Server className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold">Your Own Knowledge Platform</span>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {platformDescription}
          </p>
        </div>
        <div className="space-y-1.5 rounded-lg border border-border bg-white p-3">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-amber-600" />
            <span className="text-xs font-semibold">Knowledge Commons</span>
            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-medium text-amber-700">Planned</span>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {commonsDescription}
          </p>
        </div>
        <div className="space-y-1.5 rounded-lg border border-border bg-white p-3">
          <div className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-semibold">Open Data Philosophy</span>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            69,000+ documents queryable via KOI — no auth required.
            Internal team and client data stays private.
            Ecological data is a commons; expertise is the product.
          </p>
        </div>
      </div>
    </div>
  );
}
