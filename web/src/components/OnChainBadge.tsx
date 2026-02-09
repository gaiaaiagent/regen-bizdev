import { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { getLedgerClasses } from '../lib/koi';
import type { CreditClass } from '../lib/koi';

// Module-level cache so the ledger is only fetched once
let classCache: CreditClass[] | null = null;
let fetchPromise: Promise<CreditClass[]> | null = null;

async function getCachedClasses(): Promise<CreditClass[]> {
  if (classCache) return classCache;
  if (!fetchPromise) {
    fetchPromise = getLedgerClasses().then(classes => {
      classCache = classes;
      return classes;
    });
  }
  return fetchPromise;
}

interface OnChainBadgeProps {
  creditClass: string | null;
}

export function OnChainBadge({ creditClass }: OnChainBadgeProps) {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    if (!creditClass) return;

    let cancelled = false;
    getCachedClasses().then(classes => {
      if (cancelled) return;
      const found = classes.some(
        c => c.id?.startsWith(creditClass) || c.credit_type_abbrev === creditClass,
      );
      setVerified(found);
    }).catch(() => {
      if (!cancelled) setVerified(null);
    });
    return () => { cancelled = true; };
  }, [creditClass]);

  if (!creditClass) return null;

  if (verified === null) {
    return <Loader2 className="inline h-3 w-3 animate-spin text-muted-foreground" />;
  }

  if (!verified) return null;

  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-semibold text-green-700" title="Verified on Regen Ledger">
      <Check className="h-2.5 w-2.5" />
      On-chain
    </span>
  );
}
