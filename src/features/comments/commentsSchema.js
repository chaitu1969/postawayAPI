import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  content: {
    type: String,
    required: true,
  },
});

export const commentModel = mongoose.model("Comment", commentSchema);
