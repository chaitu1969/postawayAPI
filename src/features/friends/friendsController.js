import { friendsRepository } from "./friendsRepository.js";

export class friendsController {
  constructor() {
    this.FriendsRepository = new friendsRepository();
  }

  async createFriendRequest(req, res) {
    try {
      const userId = req.userId;
      const friendId = req.params.friendId;

      if (userId === friendId) {
        return res.status(400).json({
          success: false,
          mesaage: "can't have same id for requester and receipent",
        });
      }

      const isFriend = await this.FriendsRepository.isFriend(userId, friendId);

      if (isFriend) {
        return res.status(400).json({
          success: false,
          mesaage: "Not able to create request they already friends",
        });
      }

      const friendRequest = await this.FriendsRepository.createFriendRequest(
        userId,
        friendId
      );

      return res
        .status(200)
        .json({ success: true, message: "Friendship request is send" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message:
          "Something went wrong while creating friendship request. please check the log",
      });
    }
  }

  async responseForRequest(req, res) {
    try {
      const userId = req.userId;
      const friendId = req.params.friendId;
      const { status } = req.body;

      if (userId !== friendId) {
        return res
          .status(400)
          .json({ success: false, mesaage: "UnAuthorized" });
      }

      const isRequestExist = await this.FriendsRepository.isRequestExist(
        friendId
      );

      if (!isRequestExist) {
        return res
          .status(400)
          .json({ success: false, mesaage: "Friendship request isn't exist" });
      }

      isRequestExist.status = status;

      isRequestExist.save();

      return res.status(200).json({
        success: true,
        mesaage: `request status changed to ${status}`,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, mesaage: "Something went wrong in server" });
    }
  }

  async getFriends(req, res) {
    try {
      const userId = req.params.userId;

      const friends = await this.FriendsRepository.GetFriendsForUserId(userId);

      if (!friends) {
        return res
          .status(400)
          .json({ success: false, mesaage: "Unable to fetch user friends" });
      }

      if (friends.length === 0) {
        return res.status(400).json({
          success: false,
          mesaage: `No Friends found for userID : ${userId}`,
        });
      }

      return res.status(200).json({ success: true, Friends: friends });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, mesaage: "Somwthing went wrong in server" });
    }
  }

  async getPendingRequests(req, res) {
    try {
      const userId = req.userId;

      const requests = await this.FriendsRepository.GetPendingRequestForUser(
        userId
      );

      if (requests.length === 0) {
        return res
          .status(200)
          .json({ success: true, mesaage: "No pending request found" });
      }

      if (!requests) {
        return res
          .status(400)
          .json({ success: false, mesaage: "Something wrong" });
      }

      return res.status(200).json({ success: true, pendingRequests: requests });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, mesaage: "Something went wrong on server" });
    }
  }
}
