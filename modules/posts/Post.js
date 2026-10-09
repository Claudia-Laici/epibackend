import mongoose from "mongoose";

const categoriesEnum = ["horror", "scifi", "romance"];
const readTimeUnitEnum = ["minutes", "hours", "days"];


const postSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: categoriesEnum,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false,
      default: "https://picsum.photos/200/300",
    },
    readTime: {
      value: {
        type: Number,
        required: false,
        default: 0,
      },
      unit: {
        type: String,
        enum: readTimeUnitEnum,
        required: false,
        default: "minutes",
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    content: {
      type: String,
      required: true,
    },
  },

  { timestamps: true, strict: true },
);

export default mongoose.model("Post", postSchema, "posts");
