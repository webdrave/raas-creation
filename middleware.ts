import { NextResponse, type NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = (await auth()) as any;

  console.log("Middleware triggered for:", pathname);
  console.log("User session:", session ? "Authenticated" : "Not Authenticated");

  if (pathname.startsWith("/backend")) {
    console.log("Rewriting backend request to:", pathname);
    const isProd = process.env.NODE_ENV == "production";
    const cookieName = isProd
      ? "___Secure-authjs.session-tooken"
      : "authjs.session-token";
    const api_url = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!api_url) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined.");
      return NextResponse.next();
    }

    const forwordedPath = pathname.replace("/backend", "");
    const url = new URL(api_url + forwordedPath + req.nextUrl.search);

    console.log("Rewriting backend request to:", url.toString());

    const token = req.cookies.get(cookieName)?.value;
    console.log("Token found:", token ? "Yes" : "No");

    const requestHeaders = new Headers(req.headers);
    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    return NextResponse.rewrite(url, {
      headers: requestHeaders,
    });
  }

}

export const config = {
  matcher: ["/backend/(.*)"],
};
