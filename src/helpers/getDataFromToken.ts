import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(
      encodedToken,
      process.env.JWT_TOKEN_SECRET_KEY!
    );
    const userId: string = decodedToken.id;

    return userId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
