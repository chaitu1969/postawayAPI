import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likeStatus: {
    type: String,
    default: "unliked",
    enum: ["liked", "unliked"],
  },
});

export const likeModel = mongoose.model("Like", likeSchema);
