import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function authenticate(_req: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");

  if (!sessionCookie?.value) {
    return false;
  }

  return sessionCookie.value === process.env.SESSION_SECRET;
}

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export function setAuthCookie(res: NextResponse) {
  res.cookies.set("admin_session", process.env.SESSION_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 1 week
  });
}

export function clearAuthCookie(res: NextResponse) {
  res.cookies.delete("admin_session");
}
