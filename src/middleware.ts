import { NextResponse, type NextRequest } from "next/server";
import { CHOICE_COOKIE } from "@/lib/choice";

/* "/" shows the fork the first time. Returning visitors (cookie) and visitors
   coming from LinkedIn go straight to their side. "/?choose" always shows it. */
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  if (pathname !== "/" || searchParams.has("choose")) return NextResponse.next();

  const saved = req.cookies.get(CHOICE_COOKIE)?.value;
  const fromLinkedIn = req.headers.get("referer")?.includes("linkedin.com");
  const target = saved === "work" || saved === "hire" ? saved : fromLinkedIn ? "hire" : null;

  return target
    ? NextResponse.redirect(new URL(`/${target}`, req.url))
    : NextResponse.next();
}

export const config = { matcher: ["/"] };
