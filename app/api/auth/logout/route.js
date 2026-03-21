import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true, msg: "Logged out" }, { status: 200 });
  response.cookies.delete('token');
  return response;
}
