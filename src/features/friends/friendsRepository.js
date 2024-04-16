import friendshipModel from "./friendsSchema.js";

export class friendsRepository {
  async isFriend(requesterId, recipientId) {
    try {
      const isFriend = await friendshipModel.findOne({
        requester: requesterId,
        recipient: recipientId,
        status: "accepted",
      });

      return isFriend;
    } catch (error) {
      throw error;
    }
  }

  async createFriendRequest(requesterId, recipientId) {
    try {
      const friendship = new friendshipModel({
        requester: requesterId,
        recipient: recipientId,
        status: "pending",
      });

      return await friendship.save();
    } catch (error) {
      throw error;
    }
  }

  async isRequestExist(userId) {
    try {
      const isRequestExist = await friendshipModel.findOne({
        recipient: userId,
      });

      return isRequestExist;
    } catch (error) {
      throw error;
    }
  }

  async GetFriendsForUserId(userId) {
    try {
      const Friends = await friendshipModel.find({
        $or: [
          { requester: userId, status: "accepted" },
          { recipient: userId, status: "accepted" },
        ],
      });

      return Friends;
    } catch (error) {
      throw error;
    }
  }

  async GetPendingRequestForUser(userID) {
    try {
      const requests = await friendshipModel.find({
        recipient: userID,
        status: "pending",
      });

      return requests;
    } catch (error) {
      throw error;
    }
  }
}
