import express from "express";
import { likeController } from "./likeController.js";

const LikeController = new likeController();

const likeRouter = express.Router();

likeRouter.get("/:id", (req, res) => {
  LikeController.getLikes(req, res);
});

likeRouter.post("/toggle/:id", (req, res) => {
  LikeController.ToggleLike(req, res);
});

export default likeRouter;
