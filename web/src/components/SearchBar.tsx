import { useState, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: string[];
  loading?: boolean;
  placeholder?: string;
}

export function SearchBar({ onSearch, suggestions, loading, placeholder }: SearchBarProps) {
  const [value, setValue] = useState('');

  const submit = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      setValue(trimmed);
      onSearch(trimmed);
    },
    [onSearch],
  );

  return (
    <div className="space-y-3">
      {/* Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <Search className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit(value)}
          placeholder={placeholder || 'Ask anything about ecological credits...'}
          className="w-full rounded-xl border border-border bg-white py-3.5 pl-12 pr-4 text-sm shadow-sm transition-shadow focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Suggestion chips */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Try:</span>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => submit(s)}
              className="rounded-full border border-border bg-white px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
