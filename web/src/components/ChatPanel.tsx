import { useState } from 'react';
import { useChat } from '../hooks/useChat';
import { sourceColor } from '../lib/koi';
import { MessageSquare, Send, Loader2, AlertCircle, X, ChevronDown, ChevronUp } from 'lucide-react';

interface ChatPanelProps {
  client?: string;
}

export function ChatPanel({ client }: ChatPanelProps) {
  const chat = useChat(client);
  const [input, setInput] = useState('');
  const [expanded, setExpanded] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q || chat.loading) return;
    chat.sendMessage(q);
  }

  return (
    <div className="rounded-lg border bg-card" data-demo-target="Chat Panel">
      {/* Header — clickable to expand/collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-muted/50 transition-colors"
      >
        <MessageSquare className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">Ask the Knowledge Graph</span>
        <span className="ml-auto text-xs text-muted-foreground">AI-powered answers with citations</span>
        {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>

      {expanded && (
        <div className="border-t px-4 pb-4 pt-3 space-y-3">
          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about registry pathways, credit classes, governance..."
                className="w-full rounded-lg border bg-background py-2.5 pl-4 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={chat.loading}
              />
              {input && !chat.loading && (
                <button
                  type="button"
                  onClick={() => setInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={chat.loading || !input.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              Ask
            </button>
          </form>

          {/* Loading state */}
          {chat.loading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching knowledge graph...
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin opacity-50" />
                <span className="opacity-50">Generating answer...</span>
              </div>
            </div>
          )}

          {/* Error */}
          {chat.error && (
            <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {chat.error}
            </div>
          )}

          {/* Answer */}
          {chat.response && (
            <div className="space-y-3">
              {/* Question echo */}
              <div className="rounded-lg bg-muted/50 px-3 py-2">
                <p className="text-xs font-medium text-muted-foreground">Your question</p>
                <p className="text-sm">{chat.query}</p>
              </div>

              {/* Answer text */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{chat.response.answer}</p>
                <p className="mt-2 text-[10px] text-muted-foreground">
                  Powered by {chat.response.model} with KOI knowledge base
                </p>
              </div>

              {/* Sources */}
              {chat.response.sources.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Sources ({chat.response.sources.length})
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {chat.response.sources.map((s, i) => (
                      <div key={s.rid || i} className="rounded-lg border bg-card p-2.5 text-sm">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-medium text-xs leading-snug line-clamp-2">
                            [{i + 1}]{' '}
                            {s.url ? (
                              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                                {s.title}
                              </a>
                            ) : (
                              s.title
                            )}
                          </span>
                          {s.score != null && (
                            <span className="flex-shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                              {Math.round(s.score * 100)}%
                            </span>
                          )}
                        </div>
                        {s.excerpt && (
                          <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">{s.excerpt}</p>
                        )}
                        {s.source && (
                          <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${sourceColor(s.source)}`}>
                            {s.source}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
