import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const { cookies, nextUrl } = req;

  const isAuthenticated = cookies.get("next-auth.session-token") ?? cookies.get("__Secure-next-auth.session-token");

  const pathname = nextUrl.pathname;

  if (!isAuthenticated || isAuthenticated === undefined) {
    const loginUrl = new URL("/login", req.url);
    if (!pathname.includes("/login")) {
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isAuthenticated) {
    const homeUrl = new URL("/", req.url);
    if (pathname.includes("/login") || pathname.includes("/register")) {
      return NextResponse.redirect(homeUrl);
    }
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|register|test).*)"],
};
