import mongoose from "mongoose";
import { likeRespository } from "./likeRespository.js";

export class likeController {
  constructor() {
    this.likeRespository = new likeRespository();
  }

  async ToggleLike(req, res) {
    try {
      const id = req.params.id;
      const userId = req.userId;
      const Type = req.query.type;

      if (!["Post", "Comment"].includes(Type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid type specified. Type must be 'Post' or 'Comment'.",
        });
      }

      const field = Type === "Post" ? "postId" : "commentId";

      let likeDoc = await this.likeRespository.getLikeByUserAndItem(
        userId,
        id,
        field
      );
      if (likeDoc) {
        likeDoc.likeStatus =
          likeDoc.likeStatus === "liked" ? "unliked" : "liked";
        await likeDoc.save();
      } else {
        likeDoc = await this.likeRespository.createLikeDoc(userId, id, field);
      }

      return res.status(200).json({
        success: true,
        message: `Successfully ${
          likeDoc.likeStatus
        } ${Type.toLowerCase()} with ID ${id}`,
      });
    } catch (error) {
      console.error("Error toggling like: ", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while toggling the like.",
      });
    }
  }

  async getLikes(req, res) {
    try {
      const likeDoc = await this.likeRespository.getLike(req.params.id);
      if (!likeDoc) {
        return res
          .status(404)
          .json({ success: false, messsage: "Unable to find the likeDoc" });
      }

      return res.status(200).json({ success: true, likes: likeDoc });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        messsage: "Something went wrong on getting likes ",
      });
    }
  }
}
