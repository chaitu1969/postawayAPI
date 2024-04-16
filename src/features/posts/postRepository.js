import { postModel } from "./postsSchema.js";

export class postRepository {
  async getAll() {
    try {
      return await postModel.find();
    } catch (error) {
      throw error;
    }
  }

  async addPost(post) {
    try {
      const { imageUrl, caption, userId } = post;

      const createPost = new postModel({ userId, imageUrl, caption });

      return await createPost.save();
    } catch (error) {
      throw error;
    }
  }

  async getById(postId) {
    try {
      return await postModel.findById(postId);
    } catch (error) {
      throw error;
    }
  }

  async getAllPostUserId(userId) {
    try {
      const posts = await postModel.find({ userId });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      return await postModel.deleteOne({ _id: postId });
    } catch (error) {
      throw error;
    }
  }
}
