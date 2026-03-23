import mongoose from "mongoose";

export const ConnectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is not defined in the environment variables");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("DB Connection Error:", error);
    }
};