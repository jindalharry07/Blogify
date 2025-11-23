import mongoose from "mongoose";
export const ConnectDB = async() => {
    await mongoose.connect('mongodb+srv://blogify_DB:harshi@cluster0.mwqdgom.mongodb.net/blogify');
    console.log("Database Connected");
}