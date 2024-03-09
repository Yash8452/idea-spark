import mongoose, { Document, Schema } from "mongoose";

// Define interface for User document
interface UserDoc extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: "admin" | "user";
  isVerified: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
}

// Define user schema
const userSchema = new Schema<UserDoc>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String }, //store the url of cloudinary
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isVerified: { type: Boolean, default: false }, //used for email verification
    verifyToken: { type: String },
    verifyTokenExpiry: { type: Date },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

// Define User model
const User =
  mongoose.models.User || mongoose.model<UserDoc>("User", userSchema);

export default User;
