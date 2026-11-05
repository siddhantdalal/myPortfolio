/** One line of the terminal-style toast: the request that was "sent", or the response. */
export type ToastLine = { text: string; tone?: "command" | "success" | "muted" };
export type Toast = { id: number; lines: ToastLine[] };

type Listener = (toast: Toast | null) => void;

// A single toast at a time: a new one replaces the last, which suits short action confirmations.
let current: Toast | null = null;
let nextId = 1;
let hideTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener(current));
}

export function showToast(lines: ToastLine[], durationMs = 3200) {
  current = { id: nextId++, lines };
  emit();
  clearTimeout(hideTimer);
  hideTimer = setTimeout(dismissToast, durationMs);
}

export function dismissToast() {
  current = null;
  emit();
}

export function subscribeToast(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getToast(): Toast | null {
  return current;
}
