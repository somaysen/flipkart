import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // support multiple env keys to avoid typos between environments
    const uri =
      process.env.MONGO_URL ||
      process.env.MONGODB_URI ||
      process.env.MONOG_URL;

    if (!uri) {
      throw new Error("Mongo connection string not provided");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection error:", error);
    // crash fast in production so the orchestrator can restart
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

export default connectDB;
