export type Path = "work" | "hire";

export const CHOICE_COOKIE = "mc_path";
export const CHOICE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function rememberChoice(path: Path) {
  document.cookie = `${CHOICE_COOKIE}=${path}; path=/; max-age=${CHOICE_MAX_AGE}; samesite=lax`;
}

export function forgetChoice() {
  document.cookie = `${CHOICE_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
