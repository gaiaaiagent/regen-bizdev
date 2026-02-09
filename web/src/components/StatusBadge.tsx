import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import type { MappingStatus, ReviewStatus } from '../data/types';

interface StatusBadgeProps {
  status: MappingStatus | ReviewStatus;
  className?: string;
}

const config = {
  maps: { icon: CheckCircle2, label: 'Maps', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  pass: { icon: CheckCircle2, label: 'Pass', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  partial: { icon: AlertTriangle, label: 'Partial', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  flag: { icon: AlertTriangle, label: 'Flag', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  gap: { icon: XCircle, label: 'Gap', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  fail: { icon: XCircle, label: 'Fail', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const c = config[status];
  const Icon = c.icon;
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold', c.bg, c.text, c.border, className)}>
      <Icon className="h-3.5 w-3.5" />
      {c.label}
    </span>
  );
}
