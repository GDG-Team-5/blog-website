import mongoose from "mongoose";
import { title } from "process";
//post model

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
  },
  img: {
    type: String,
    required: [true, "Image is required"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
