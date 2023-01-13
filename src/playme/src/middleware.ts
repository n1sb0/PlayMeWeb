import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const { cookies, nextUrl } = req;

  const isAuthenticated = cookies.get("next-auth.session-token");

  const pathname = nextUrl.pathname;

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    if (!pathname.startsWith("/login")) {
      return NextResponse.redirect(loginUrl);
    } else {
      return NextResponse.next();
    }
  }

  if (isAuthenticated) {
    const homeUrl = new URL("/", req.url);
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      return NextResponse.redirect(homeUrl);
    } else {
      return NextResponse.next();
    }
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|register).*)"],
};
