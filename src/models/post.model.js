<<<<<<< HEAD
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

//add plugins
postSchema.plugin(format, "toJSON");
postSchema.plugin(format, "toObject");
const Post = mongoose.model("Post", postSchema);
export default Post;
=======
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

//add plugins
postSchema.plugin(format, "toJSON");
postSchema.plugin(format, "toObject");
const Post = mongoose.model("Post", postSchema);
export default Post;
>>>>>>> d7ecc22599000fdc65845647780015dc7cb8f7b8
