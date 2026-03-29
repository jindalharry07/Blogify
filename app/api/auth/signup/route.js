import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await ConnectDB();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, msg: "All fields are required" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, msg: "Invalid email format" }, { status: 400 });
    }

    // Password validation: min 8 chars, 1 upper, 1 lower, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({ 
        success: false, 
        msg: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a special character" 
      }, { status: 400 });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, msg: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if it's the first user -> make them admin automatically
    const count = await UserModel.countDocuments();
    const isFirstUser = count === 0;

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: isFirstUser ? 'admin' : 'user'
    });
    
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || 'my_super_secret_blogify_key',
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ 
        success: true, 
        msg: "User created successfully",
        role: newUser.role
    }, { status: 201 });
    
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
