/* Shared constants for the "choose your path" flow (client + middleware). */

export type Path = "work" | "hire";

export const CHOICE_COOKIE = "mc_path";
export const CHOICE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/** Remember the visitor's choice so "/" sends them straight there next time. */
export function rememberChoice(path: Path) {
  document.cookie = `${CHOICE_COOKIE}=${path}; path=/; max-age=${CHOICE_MAX_AGE}; samesite=lax`;
}

/** Forget it (e.g. from a "switch" link pointing to "/?choose"). */
export function forgetChoice() {
  document.cookie = `${CHOICE_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
