import mongoose from "mongoose";
import { format } from "./plugin.js";

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
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  img: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },
});

//add plugins
postSchema.plugin(format, "toJSON");
postSchema.plugin(format, "toObject");
const Post = mongoose.model("Post", postSchema);
export default Post;
