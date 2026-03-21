import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import { jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

export async function GET(request) {
  try {
    await ConnectDB();
    const token = request.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ success: false, msg: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'my_super_secret_blogify_key');
    const { payload } = await jwtVerify(token, secret);

    const user = await UserModel.findById(payload.id).select("-password");
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await ConnectDB();
    const token = request.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ success: false, msg: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'my_super_secret_blogify_key');
    const { payload } = await jwtVerify(token, secret);

    const { name, email, password } = await request.json();
    const updateData = { name, email };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(payload.id, updateData, { new: true });
    return NextResponse.json({ success: true, msg: "Profile updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
