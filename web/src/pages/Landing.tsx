import { Link } from 'react-router';
import { ClientSelector } from '../components/ClientSelector';
import { InfrastructurePulse } from '../components/InfrastructurePulse';
import { RegistryTrackRecord } from '../components/RegistryTrackRecord';
import { startDemo } from '../components/DemoRunner';
import { Database, Play } from 'lucide-react';

export function Landing() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative -mx-4 -mt-6 overflow-hidden rounded-b-2xl bg-gradient-to-br from-regen-dark via-regen-dark to-regen-green px-6 py-12 text-white sm:px-10">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Registry Readiness
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            See your ecological assets on a pathway to verified, tradeable credits.
            Each dashboard shows what's ready to register now, what comes next,
            and the real ledger data backing every step.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-white/50">
            <span className="rounded-full border border-white/20 px-3 py-1">Powered by KOI</span>
            <span className="rounded-full border border-white/20 px-3 py-1">Regen Ledger</span>
          </div>
          <p className="mt-3 text-xs text-white/40">
            Open knowledge infrastructure — 69,000+ documents, queryable by anyone. Ecological data is a commons.
          </p>
        </div>
        {/* Subtle background decoration */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5" />
      </div>

      {/* Live Infrastructure Pulse */}
      <div>
        <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Live Infrastructure
        </h2>
        <InfrastructurePulse />
        <div className="mt-3 flex justify-center">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            <Database className="h-3.5 w-3.5" />
            Explore the Knowledge Graph
          </Link>
        </div>
      </div>

      {/* Guided Demo */}
      <div>
        <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Guided Demo
        </h2>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => startDemo('renew')}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-muted/50 transition-colors"
          >
            <Play className="h-3.5 w-3.5 text-primary" />
            Watch Renew Demo
          </button>
          <button
            onClick={() => startDemo('landbanking')}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-muted/50 transition-colors"
          >
            <Play className="h-3.5 w-3.5 text-primary" />
            Watch Landbanking Demo
          </button>
        </div>
      </div>

      {/* Production Track Record */}
      <div>
        <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Production Track Record
        </h2>
        <RegistryTrackRecord />
      </div>

      {/* Client Cards */}
      <div>
        <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Client Dashboards
        </h2>
        <ClientSelector />
      </div>
    </div>
  );
}
