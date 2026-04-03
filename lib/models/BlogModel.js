import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    authorImg: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comments: [
      {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { minimize: false },
);

const BlogModel = mongoose.models.blog || mongoose.model("blog", Schema);
export default BlogModel;
