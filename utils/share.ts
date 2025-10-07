// utils/share.ts
export type ShareOutcome = 'shared' | 'copied' | 'dismissed' | 'error';

export const getAppShareUrl = (): string => {
  // Prefer an explicit base for static exports; fallback to current origin
  const envBase = import.meta.env.VITE_PUBLIC_BASE_URL as string | undefined;
  return envBase ?? (typeof window !== 'undefined' ? window.location.origin : '');
};

export async function attemptShare(params: {
  title: string;
  text: string;
  url: string;
}): Promise<ShareOutcome> {
  try {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      await (navigator as any).share(params);
      return 'shared';
    }
  } catch (e: any) {
    if (e?.name === 'AbortError') return 'dismissed';
    // fall through to copy
  }

  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(params.url);
      return 'copied';
    }
  } catch {
    /* ignore */
  }
  return 'error';
}
