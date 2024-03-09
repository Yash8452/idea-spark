import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findById({ _id: userId }).select("-password");
    return NextResponse.json(
      { message: "User fetched", success: true, user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while fetching user:", error);
    return NextResponse.json(
      { error: "Error while fetching user" },
      { status: 500 }
    );
  }
}
