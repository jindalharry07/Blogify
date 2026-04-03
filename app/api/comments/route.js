import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    await ConnectDB();
    const { blogId, userId, name, comment } = await request.json();

    try {
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return NextResponse.json({ success: false, msg: "Blog not found" });
        }

        blog.comments.push({ userId, name, comment });
        await blog.save();

        return NextResponse.json({ success: true, msg: "Comment added successfully" });
    } catch (error) {
        console.error("Error adding comment:", error);
        return NextResponse.json({ success: false, msg: "Server error" });
    }
}

// DELETE is for Admin moderation
export async function DELETE(request) {
    await ConnectDB();
    const { blogId, commentId } = await request.json();

    try {
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return NextResponse.json({ success: false, msg: "Blog not found" });
        }

        blog.comments.pull({ _id: commentId });
        await blog.save();

        return NextResponse.json({ success: true, msg: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return NextResponse.json({ success: false, msg: "Server error" });
    }
}
