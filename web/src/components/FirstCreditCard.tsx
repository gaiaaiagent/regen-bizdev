import { Award } from 'lucide-react';

interface FirstCreditCardProps {
  creditClass: string;
  projectName: string;
  location: string;
  metric: string;
  description: string;
}

export function FirstCreditCard({ creditClass, projectName, location, metric, description }: FirstCreditCardProps) {
  return (
    <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Award className="h-5 w-5 text-primary" />
        <h4 className="text-sm font-bold">Your First Credit</h4>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary font-mono">{creditClass}</span>
          <span className="text-sm font-medium">{projectName}</span>
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>{location}</p>
          <p className="font-medium text-foreground">{metric}</p>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
