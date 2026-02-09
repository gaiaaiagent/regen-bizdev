export const API = {
  koi: import.meta.env.VITE_KOI_API_URL || '/api/koi',
  ledger: import.meta.env.VITE_LEDGER_API_URL || 'https://lcd-regen.keplr.app',
};

export async function fetchKoi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API.koi}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`KOI API error: ${res.status}`);
  return res.json();
}

export async function fetchLedger<T>(path: string): Promise<T> {
  const res = await fetch(`${API.ledger}${path}`);
  if (!res.ok) throw new Error(`Ledger API error: ${res.status}`);
  return res.json();
}
