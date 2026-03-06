import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;
  let isAuthenticated = false;

  if (path.startsWith("/admin")) {
    if (token) {
      isAuthenticated = true;
    }

    if (path === "/admin/sign-in" && isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/admin-user", req.url));
    }

    if (path !== "/admin/sign-in" && !isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/sign-in", req.url));
    }

    if (path === "/admin") {
      return NextResponse.redirect(new URL("/admin/admin-user", req.url));
    }
  }

  if (path === "/business-loan") {
    return NextResponse.redirect(new URL("/business-loan/overview", req.url), { status: 308 });
  }

  if (path === "/machinery-loan") {
    return NextResponse.redirect(new URL("/machinery-loan/overview", req.url), { status: 308 });
  }

  return NextResponse.next();
}
// export const config = { matcher: ["/admin/:path*"] };

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/admin/:path*"],
};
