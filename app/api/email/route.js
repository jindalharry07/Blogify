import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  await ConnectDB();

  try {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, msg: "Email is required" },
        { status: 400 }
      );
    }

    const exists = await EmailModel.findOne({ email });

    if (exists) {
      return NextResponse.json(
        { success: false, msg: "Already subscribed" },
        { status: 400 }
      );
    }


    await EmailModel.create({ email });

    return NextResponse.json({
      success: true,
      msg: "Email Subscribed",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await ConnectDB();
  const emails = await EmailModel.find({}) ;
  return NextResponse.json({emails});
}

export async function DELETE(request) {
  await ConnectDB();
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({success : true, msg : "Email Deleted."})

}