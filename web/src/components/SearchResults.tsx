import { ExternalLink, FileText } from 'lucide-react';
import type { KoiResult } from '../lib/koi';
import { displayTitle, sourceColor } from '../lib/koi';

interface SearchResultsProps {
  results: KoiResult[];
  confidence?: number;
  query?: string;
}

export function SearchResults({ results, confidence, query }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          <span>
            <span className="font-semibold text-foreground">{results.length}</span> documents
            {query && <> for &ldquo;{query}&rdquo;</>}
          </span>
        </div>
        {confidence != null && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            {(confidence * 100).toFixed(0)}% confidence
          </span>
        )}
      </div>

      {/* Result cards */}
      <div className="space-y-2">
        {results.map((r, i) => (
          <div
            key={r.rid || i}
            className="rounded-lg border border-border bg-white p-3 transition-shadow hover:shadow-sm"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-medium leading-snug">{displayTitle(r, i)}</h4>
              {r.metadata?.url && (
                <a
                  href={r.metadata.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 flex-shrink-0 text-muted-foreground hover:text-primary"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            {r.content && (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {r.content.slice(0, 250)}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2">
              {r.metadata?.source && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${sourceColor(r.metadata.source)}`}>
                  {r.metadata.source}
                </span>
              )}
              {r.score != null && (
                <span className="text-[10px] text-muted-foreground">
                  {(r.score * 100).toFixed(0)}% relevance
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
