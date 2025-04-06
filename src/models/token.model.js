import mongoose from "mongoose";
import { tokenTypes } from "../configs/token.types.js";
import { format } from "./plugin.js";

//token schema
const tokenschema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(tokenTypes),
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
//add plugins
tokenschema.plugin(format, "toJSON");
tokenschema.plugin(format, "toObject");

const Token = mongoose.model("Token", tokenschema);

export default Token;
