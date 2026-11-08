import { useId, type SVGProps } from "react";

/* Brand mark. Ring + M use currentColor; the leaf uses `leaf` (defaults to the theme accent). */
export function LogoMark({
  size = 40,
  leaf = "var(--accent)",
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; leaf?: string }) {
  const mask = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" {...props}>
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
          <rect width="120" height="120" fill="#fff" />
          <path d="M85 39 C95 32 103 25 111 21" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
        </mask>
      </defs>
      <path d="M103.3 85 A50 50 0 1 1 83.5 15.9" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M38 86 V40 L60 66 L82 40 V86" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M82 40 C88 26 100 18 116 18 C112 34 100 44 82 40 Z" fill={leaf} mask={`url(#${mask})`} />
      <circle cx="60" cy="81" r="5" fill={leaf} />
    </svg>
  );
}
