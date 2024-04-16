import mongoose from "mongoose";
import { userModel } from "./userSchema.js";

export default class userRepository {
  // Signup user
  async signup(user) {
    try {
      const isExistUser = await userModel.findOne({ email: user.email });
      if (isExistUser) {
        throw new Error("User already exist");
      }
      const newUser = new userModel(user);
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  async findById(userId) {
    try {
      return await userModel.findById({ _id: userId });
    } catch (error) {
      throw error;
    }
  }

  async sendAllUsers() {
    try {
      return await userModel.find();
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(newPassword, userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return { success: false };
      }
      user.password = newPassword;
      const updatedUser = await user.save();
      return {
        success: true,
        message: "Password reset is done successfully",
        user: updatedUser,
      };
    } catch (error) {
      throw error;
    }
  }

  async setTokenToDB(userId, token) {
    try {
      const user = await userModel.findById(userId);
      console.log(user);
      user.tokens.push(token);
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  async deleteTokenFromDb(userId, token) {
    try {
      const user = await userModel.findById(userId);
      const tokenIndex = user.tokens.findIndex((t) => t === token);
      user.tokens.splice(tokenIndex, 1);
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  async deleteAllTokenFromDb(userId) {
    try {
      const user = await userModel.findById(userId);
      user.tokens = [];
      await user.save();
    } catch (error) {
      throw error;
    }
  }
}
