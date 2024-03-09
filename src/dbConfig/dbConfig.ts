import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1); // Exit the Node.js process with a failure code
  }
}
