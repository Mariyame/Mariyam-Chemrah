import type { SVGProps } from "react";

/* One stroke-icon set (24×24, currentColor). Decorative by default. */
const PATHS = {
  monitor: <><rect x="3" y="4" width="18" height="14" rx="3" /><path d="M3 9h18M8 22h8M12 18v4" /></>,
  nodes: <><circle cx="5" cy="12" r="2.5" /><circle cx="19" cy="5" r="2.5" /><circle cx="19" cy="19" r="2.5" /><path d="M7.3 11 16.7 6M7.3 13l9.4 5" /></>,
  leaf: <><path d="M4 20c8 0 16-6 16-16C10 4 4 10 4 20Z" /><path d="M4 20 14 10" /></>,
  cart: <><path d="M3 4h2l2.4 11h11L21 7H6.2" /><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  heart: <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />,
  seed: <><ellipse cx="12" cy="14.5" rx="4.2" ry="5.4" /><path d="M12 9c0-2.4 1.2-4.2 3-4.8" /></>,
  roots: <path d="M12 2v10M12 12l-5 5M12 12l5 5M7 17l-2.4 5M17 17l2.4 5M12 12v10" />,
  sprout: <><path d="M12 22V9" /><path d="M12 15c-3.6 0-6-2.4-6-6 3.6 0 6 2.4 6 6ZM12 11c0-3.6 2.4-6 6-6 0 3.6-2.4 6-6 6Z" /></>,
  bloom: <><circle cx="12" cy="9.5" r="2.4" /><path d="M12 7c0-3 2.4-4.2 0-4.8C9.6 2.8 12 4 12 7ZM14.5 9.5c3 0 4.2 2.4 4.8 0-.6-2.4-1.8 0-4.8 0ZM12 12c0 3-2.4 4.2 0 4.8 2.4-.6 0-1.8 0-4.8ZM9.5 9.5c-3 0-4.2-2.4-4.8 0 .6 2.4 1.8 0 4.8 0ZM12 16.8V22" /></>,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  download: <path d="M12 3v12M6 11l6 6 6-6M4 21h16" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  check: <path d="M5 12l5 5L20 7" />,
  menu: <path d="M4 8h16M4 16h10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  github: <path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>,
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.8,
  label,
  className,
  ...rest
}: { name: IconName; size?: number; label?: string } & Omit<SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className ?? ""}`}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
