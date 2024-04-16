import express from "express";
import { commentController } from "./commentController.js";

const CommentController = new commentController();

const commentRouter = express.Router();

commentRouter.post("/:postId", (req, res) => {
  CommentController.addComment(req, res);
});

commentRouter.get("/:postId", (req, res) => {
  CommentController.getComments(req, res);
});

commentRouter.delete("/:commentId", (req, res) => {
  CommentController.deleteComment(req, res);
});

commentRouter.put("/:commentId", (req, res) => {
  CommentController.updateComment(req, res);
});

export default commentRouter;
