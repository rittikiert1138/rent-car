import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// Secret key for token verification (e.g., from environment variables)
// const SECRET_KEY: string = process.env.JWT_SECRET as string;
export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If Authorization header is missing or invalid
    return NextResponse.json({ message: "Unauthorized1" }, { status: 401 });
  }

  // Extract the token
  // const token = authHeader.split(" ")[1];

  try {
    // Verify token (use your preferred JWT library)
    // const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));

    // Allow the request to continue
    return NextResponse.next();
  } catch (error: any) {
    return NextResponse.json({ message: "Invalid or expired token", error: error.message }, { status: 403 });
  }
}

// Configure which paths the middleware applies to
export const config = {
  matcher: ["/api2/user/:path*"], // Adjust matcher paths
};
