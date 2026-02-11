import { useState, useRef } from 'react';
import { chatKoi } from '../lib/koi';
import type { ChatResponse } from '../lib/koi';

interface ChatState {
  query: string;
  response: ChatResponse | null;
  loading: boolean;
  error: string | null;
}

export function useChat(client?: string) {
  const [state, setState] = useState<ChatState>({
    query: '',
    response: null,
    loading: false,
    error: null,
  });
  const abortRef = useRef<AbortController | null>(null);

  async function sendMessage(query: string) {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ query, response: null, loading: true, error: null });

    const timeout = setTimeout(() => {
      controller.abort();
      setState(s => ({ ...s, loading: false, error: 'Request timed out — try a simpler question' }));
    }, 15000);

    try {
      const resp = await chatKoi(query, client);
      if (!controller.signal.aborted) {
        clearTimeout(timeout);
        setState({ query, response: resp, loading: false, error: null });
      }
    } catch {
      if (!controller.signal.aborted) {
        clearTimeout(timeout);
        setState(s => ({ ...s, loading: false, error: 'Chat failed — check connection' }));
      }
    }
  }

  function reset() {
    if (abortRef.current) abortRef.current.abort();
    setState({ query: '', response: null, loading: false, error: null });
  }

  return { ...state, sendMessage, reset };
}
