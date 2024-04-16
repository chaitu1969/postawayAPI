import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  imageUrl: {
    type: String,
    required: [true, "Image url is required"],
  },
  caption: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
});

export const postModel = mongoose.model("Post", postSchema);
