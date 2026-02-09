import { ExternalLink, BookOpen } from 'lucide-react';
import type { Precedent } from '../data/types';

interface PrecedentCardProps {
  precedent: Precedent;
}

export function PrecedentCard({ precedent }: PrecedentCardProps) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-start gap-3">
        <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{precedent.title}</span>
            <a
              href={precedent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{precedent.source}</p>
          <p className="mt-1.5 text-sm text-muted-foreground">{precedent.description}</p>
        </div>
      </div>
    </div>
  );
}
