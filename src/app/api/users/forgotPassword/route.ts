import jwt from "jsonwebtoken"; // Import JWT for token generation and validation
import { connect } from "@/dbConfig/dbConfig";
import { EmailData, EmailType, sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

// Secret key for JWT (should be stored securely in environment variables)
// const JWT_SECRET = process.env.JWT_TOKEN_SECRET_KEY;

// Submit Email Controller
export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { email } = requestBody;
  try {
    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Generate reset token using JWT
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_TOKEN_SECRET_KEY!,
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRY,
      }
    );

    // Save reset token in the user document
    user.forgotPasswordToken = token;
    user.forgotPasswordTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send reset password email with reset token

    const emailData: EmailData = await sendEmail({
      email,
      emailType: EmailType.RESET,
      userId: user._id,
    });

    return NextResponse.json(
      { message: "Reset password email sent successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}

// Reset Password Controller (Using PATCH method)
// export const resetPasswordPatch = async (req, res) =>

export async function PATCH(request: NextRequest) {
  const requestBody = await request.json();
  const { email, newPassword } = requestBody;

  try {
    // Check if user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Update user's password
    user.password = newPassword;
    user.forgotPasswordToken = null;
    user.forgotPasswordTokenExpiry = null;
    await user.save();
    return NextResponse.json(
      { message: "Password reset successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
