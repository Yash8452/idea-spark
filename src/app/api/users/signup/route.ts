import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Establish database connection
connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, password, email } = requestBody;

    // Validate input data
    if (!username || !password || !email) {
      return NextResponse.json(
        {
          message: "Username, password, and email are required fields",
          success: false,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10; // Number of salt rounds for hashing
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    // Create new user document
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    return NextResponse.json(
      { message: "User created", success: true, user: savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error while signing Up:", error);
    return NextResponse.json(
      { error: "Error while signing Up", success: false },
      { status: 500 }
    );
  }
}
