import mongoose from "mongoose";
import { commentRepository } from "./commentRepository.js";

export class commentController {
  constructor() {
    this.CommentRepository = new commentRepository();
  }

  async addComment(req, res) {
    try {
      const userId = new mongoose.Types.ObjectId(req.userId);
      const postId = req.params.postId;
      const { content } = req.body;

      if (!content || !postId) {
        return res.status(400).json({
          success: false,
          message:
            "Bad request: Please provide all necessary details (postId and content).",
        });
      }

      const post = await this.CommentRepository.findPost(postId);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: `No post found with id: ${postId}`,
        });
      }

      const createdComment = await this.CommentRepository.addComment({
        userId,
        postId,
        content,
      });

      return res.status(201).json({
        success: true,
        message: `Successfully created comment with id ${createdComment._id}`,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error in adding the comment" });
    }
  }

  async getComments(req, res) {
    try {
      const postId = req.params.postId;

      const post = await this.CommentRepository.findPost(postId);

      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Unable to find the post" });
      }

      const comments = await this.CommentRepository.findCommentByPostId(postId);

      if (!comments) {
        return res.status(200).json({
          success: false,
          message: `No comments found fot postId ${postId}`,
        });
      }

      return res.status(200).json({ success: true, comments: comments });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Error in finding the comments" });
    }
  }

  async deleteComment(req, res) {
    try {
      const commentId = req.params.commentId;

      const isComment = await this.CommentRepository.findCommentById(commentId);

      if (!isComment) {
        return res.status(404).json({
          success: false,
          message: `Unable to find the comment with id ${commentId}`,
        });
      }

      const commentDelted = await this.CommentRepository.deleteCommentById(
        commentId
      );

      if (commentDelted) {
        return res
          .status(200)
          .json({ success: true, message: `Succefully comment is deleted` });
      }
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ success: false, message: "something went wrong" });
    }
  }

  async updateComment(req, res) {
    try {
      const commentId = req.params.commentId;
      const { content } = req.body;

      const comment = await this.CommentRepository.findCommentById(commentId);

      if (comment.userId.toString() !== req.userId.toString()) {
        return res.status(401).json({
          success: false,
          message: "User is not autthorized to updated the comment",
        });
      }

      if (!content) {
        return res.status(400).json({
          success: false,
          message: "Please provide the required details",
        });
      }

      comment.content = content;
      await comment.save();

      return res
        .status(200)
        .json({ success: true, message: `Successfully updated the comment` });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "something went wrong" });
    }
  }
}
