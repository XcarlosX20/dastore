import { NextResponse } from "next/server";

export default function middleware(req) {
  const { cookies } = req;
  const token = cookies.get("token");
  if (!token) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
}
export const config = {
  matcher: ["/products", "/customization/:path*", "/orders"],
};
