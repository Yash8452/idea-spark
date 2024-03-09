import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { error } from "console";
// Establish database connection
connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const { email, password } = requestBody;
    console.log(requestBody);

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exists", success: false },
        { status: 400 }
      );
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          message: "Incorrect username or password. Please try again.",
          success: false,
        },
        { status: 400 }
      );
    }
    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET_KEY!, {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });

    //set to cookies
    const response = NextResponse.json(
      { message: "Login Successfull", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.error("Error while signing In:", error);
    return NextResponse.json(
      { error: "Error while signing In" },
      { status: 500 }
    );
  }
}
