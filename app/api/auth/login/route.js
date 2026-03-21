import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await ConnectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, msg: "Email and Password are required" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, msg: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, msg: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'my_super_secret_blogify_key',
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ 
        success: true, 
        msg: "Login successful",
        role: user.role
    }, { status: 200 });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60,
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
