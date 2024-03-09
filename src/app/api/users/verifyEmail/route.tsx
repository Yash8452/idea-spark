import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { token } = requestBody;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid token",
          success: false,
        },
        { status: 404 }
      );
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = null;
    user.verifyTokenExpiry = null;

    await user.save();
    return NextResponse.json(
      { message: "Email Verified Successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
