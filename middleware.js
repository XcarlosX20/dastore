import { NextResponse } from "next/server";

export default async function handler(req) {
  const backendApi = new URL(
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_MYAPP_BACKEND
      : process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL
  );
  const { cookies } = req;
  const token = cookies.get("token");
  try {
    const getCompany = await fetch(`${backendApi.origin}/api/auth/company`, {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    });
    const response = await getCompany.json();
    if (response.msg === "invalid token" || !token) {
      return NextResponse.rewrite(new URL("/login", req.url));
    }
  } catch (error) {
    console.log(error);
  }
}
export const config = {
  matcher: [
    "/products",
    "/customization/:path*",
    "/orders",
    "/newproduct",
    "/editproduct",
  ],
};
