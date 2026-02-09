import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  color?: string;
}

export function StatCard({ icon: Icon, value, label, color = 'text-primary' }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-white p-3">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div>
        <div className={`text-lg font-bold leading-tight ${color}`}>{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
