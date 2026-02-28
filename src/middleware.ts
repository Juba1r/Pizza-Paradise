import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as any)?.role;

  // Protect admin routes
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // Protect checkout/orders for guests (if desired, or allow guests)
  // For now, let's allow guests to checkout as implemented in the checkout page

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
