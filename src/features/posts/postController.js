import mongoose from "mongoose";
import { postRepository } from "./postRepository.js";

export class postController {
  constructor() {
    this.PostRepository = new postRepository();
  }

  // Getting all posts

  async getAllPosts(req, res) {
    try {
      const posts = await this.PostRepository.getAll();

      if (!posts) {
        return res.status(204).send("unable to fetch the posts");
      }
      if (posts.length <= 0) {
        return res.status(200).json({ Posts: "No posts avaliable" });
      }
      return res.status(200).json({ posts });
    } catch (error) {
      console.log(error);
      return res.status(400).send("something went wrong");
    }
  }

  // upload a single post

  async postUpload(req, res) {
    try {
      const { caption } = req.body;
      const imageUrl = req.file.path;

      if (!imageUrl) {
        return res.status(400).json({
          success: false,
          message: "No file selected. Please select a file to upload.",
        });
      }

      const userId = new mongoose.Types.ObjectId(req.userId);

      const post = await this.PostRepository.addPost({
        imageUrl,
        caption,
        userId,
      });

      if (!post) {
        return res.status(413).json({
          success: false,
          message: "File too large. Maximum size allowed is 1MB.",
        });
      }

      return res.status(200).json({ post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during file upload. Please try again.",
      });
    }
  }

  // Get a post by post ID
  async getPostById(req, res) {
    try {
      const postId = req.params.postId;

      if (!postId) {
        return res.status(400).send("Requried PostId");
      }

      const post = await this.PostRepository.getById(postId);

      return res.status(200).json({ posts: post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error occured while fetching posts",
      });
    }
  }

  // Get all posts for userID
  async getPostForUserId(req, res) {
    try {
      const userId = req.userId;

      const posts = await this.PostRepository.getAllPostUserId(userId);

      if (!posts) {
        return res.status(204).json({
          success: true,
          message: `No posts found for userId : ${userId}`,
        });
      }
      return res.status(200).json({ success: true, posts: posts });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error occured while fetching posts",
      });
    }
  }

  // update a post By postID
  async updatePostById(req, res) {
    try {
      const postId = req.params.postId;

      const post = await this.PostRepository.getById(postId);

      if (!post) {
        return res.status(404).json({
          success: true,
          message: `post Not found for id : ${postId}`,
        });
      }

      const { caption } = req?.body;
      const imageUrl = req.file?.path;

      if (!caption && !imageUrl) {
        return res.status(400).json({
          success: false,
          message:
            "File upload failed or no file selected and No caption provided.",
        });
      }

      if (post.userId.toString() === req.userId.toString()) {
        post.caption = caption ? caption : post.caption;
        post.imageUrl = imageUrl ? imageUrl : post.imageUrl;

        await post.save();

        return res.status(200).send({ success: true, message: "post updated" });
      }

      return res
        .status(401)
        .json({ success: true, message: "UnAuthorized access to the post" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error occured while fetching posts",
      });
    }
  }

  // Delete a post by postId
  async deletePostById(req, res) {
    try {
      const postId = req.params.postId;

      const post = await this.PostRepository.getById(postId);

      if (post.userId.toString() === req.userId.toString()) {
        const isDelted = await this.PostRepository.deletePost(postId);

        if (isDelted) {
          return res
            .status(200)
            .json({ success: true, message: "Post delted successfully" });
        }
      }

      return res
        .status(401)
        .json({ success: true, message: "Unaauthorzied to delete a post" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error occured while fetching posts",
      });
    }
  }
}
