import { postModel } from "../posts/postsSchema.js";
import { commentModel } from "./commentsSchema.js";

export class commentRepository {
  async findPost(postId) {
    try {
      return await postModel.findById(postId);
    } catch (error) {
      throw error;
    }
  }

  async addComment(commentData) {
    try {
      const newComment = new commentModel({
        userId: commentData.userId,
        postId: commentData.postId,
        content: commentData.content,
      });

      return await newComment.save();
    } catch (error) {
      throw error;
    }
  }

  async findCommentByPostId(postId) {
    try {
      return await commentModel.find({ postId });
    } catch (error) {
      throw error;
    }
  }

  async deleteCommentById(commentId) {
    try {
      return await commentModel.deleteOne({ _id: commentId });
    } catch (error) {
      throw error;
    }
  }

  async findCommentById(_id) {
    try {
      return await commentModel.findById(_id);
    } catch (error) {
      throw error;
    }
  }
}
