import express from "express";
import { postController } from "./postController.js";
import { uploadFile } from "../../middlewares/FileUpdateMiddleware.js";

const postRouter = express.Router();

const PostController = new postController();

postRouter.post("/", uploadFile.single("imageUrl"), (req, res) => {
  PostController.postUpload(req, res);
});

postRouter.get("/all", (req, res) => {
  PostController.getAllPosts(req, res);
});

postRouter.get("/:postId", (req, res) => {
  PostController.getPostById(req, res);
});

postRouter.get("/", (req, res) => {
  PostController.getPostForUserId(req, res);
});

postRouter.put("/:postId", uploadFile.single("imageUrl"), (req, res) => {
  PostController.updatePostById(req, res);
});

postRouter.delete("/:postId", (req, res) => {
  PostController.deletePostById(req, res);
});

export default postRouter;
