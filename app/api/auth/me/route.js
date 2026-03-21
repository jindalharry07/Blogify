import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, msg: "Not authenticated" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'my_super_secret_blogify_key');
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({ 
        success: true, 
        user: { 
            id: payload.id, 
            role: payload.role 
        } 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Invalid token" }, { status: 401 });
  }
}
