/**
 * The résumé viewer is open whenever the URL ends in #resume. Driving it from the hash means any
 * plain link can open it (no JavaScript needed on the trigger), a recruiter can share
 * …/#resume with a hiring manager, and the phone's back button closes it instead of leaving the site.
 */
export const RESUME_HASH = "#resume";
/** The résumé's heading, which names the dialog for screen readers. */
export const RESUME_TITLE_ID = "resume-title";

const listeners = new Set<() => void>();
/** True when the viewer was opened by navigating within the page, so there's an entry to go back to. */
let openedInPage = false;

function notify() {
  for (const listener of listeners) listener();
}

function onHashChange() {
  // hashchange never fires for the initial load, so an open viewer seen here was reached in-page.
  openedInPage = isResumeOpen();
  notify();
}

export function subscribeToResume(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("hashchange", onHashChange);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("hashchange", onHashChange);
  };
}

export function isResumeOpen() {
  return window.location.hash === RESUME_HASH;
}

export function openResume() {
  window.location.hash = RESUME_HASH;
}

export function closeResume() {
  if (openedInPage) {
    openedInPage = false;
    window.history.back();
    return;
  }
  // Landed straight on …/#resume: there is no page behind it, so drop the hash in place.
  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, "", pathname + search);
  notify();
}
