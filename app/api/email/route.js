import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
}
LoadDB();

export async function POST(request) {
  const formData = await request.formData();

  const emailData = {
    email: `${formData.get('email')}`,
  }

  await EmailModel.create(emailData);

  return NextResponse.json({success : true, msg: "Email Subscribed"});
}

export async function GET() {
  try {
    await ConnectDB();

    const emails = await EmailModel.find({});

    return NextResponse.json(
      { emails },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/email error:", error);
    return NextResponse.json(
      { msg: "Server error" },
      { status: 500 }
    );
  }
}