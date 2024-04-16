import mongoose from "mongoose";
import { commentModel } from "../comments/commentsSchema.js";
import { postModel } from "../posts/postsSchema.js";
import { likeModel } from "./likeSchema.js";

export class likeRespository {
  async getPost(postId) {
    try {
      return await postModel.findById(postId);
    } catch (error) {
      throw error;
    }
  }

  async getComment(id) {
    try {
      return await commentModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async likePostDoc(data) {
    try {
      const likeDoc = await likeModel.findOne({ userId: data.userId });

      if (!likeDoc) {
        const newDoc = new likeModel({
          postId: data.id,
          userId: data.userId,
          likeStatus: "liked",
        });
        return await likeDoc.save();
      } else {
        likeDoc.likeStatus("unliked");
        return await likeDoc.save();
      }
    } catch (error) {
      throw error;
    }
  }

  async likeComment(data) {
    try {
      const commentDoc = await likeModel.findOne({ userId: data.userId });

      if (!commentDoc) {
        const newDoc = new likeModel({});
      }
    } catch (error) {}
  }

  async getLike(id) {
    try {
      return await likeModel.findById(id).populate("postId");
    } catch (error) {
      throw error;
    }
  }

  async getLikeByUserAndItem(userID, itemId, field) {
    try {
      return await likeModel.findOne({ userId: userID, [field]: itemId });
    } catch (error) {
      throw error;
    }
  }

  async createLikeDoc(userId, id, field) {
    try {
      let likeDoc = new likeModel({
        userId,
        likeStatus: "liked",
        [field]: id,
      });

      return await likeDoc.save();
    } catch (error) {
      throw error;
    }
  }
}
