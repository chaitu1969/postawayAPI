import express from "express";
import { friendsController } from "./friendsController.js";

const friendRouter = express.Router();

const FriendsController = new friendsController();

friendRouter.post("/toggle-friendship/:friendId", (req, res) => {
  FriendsController.createFriendRequest(req, res);
});

friendRouter.post("/response-to-request/:friendId", (req, res) => {
  FriendsController.responseForRequest(req, res);
});

friendRouter.get("/get-friends/:userId", (req, res) => {
  FriendsController.getFriends(req, res);
});

friendRouter.get("/get-pending-requests", (req, res) => {
  FriendsController.getPendingRequests(req, res);
});
export default friendRouter;
