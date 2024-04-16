import express from "express";
import userController from "./userController.js";
import jwtToken from "../../middlewares/JwtMiddleware.js";

const AuthenticationRoutes = express.Router();
const UserProfileRoutes = express.Router();

const UserController = new userController();

// Authentication routes

AuthenticationRoutes.post("/signup", (req, res) => {
  UserController.signup(req, res);
});

AuthenticationRoutes.post("/signin", (req, res) => {
  UserController.signin(req, res);
});

AuthenticationRoutes.get("/logout", (req, res) => {
  UserController.logout(req, res);
});

AuthenticationRoutes.get("/logout-all-devices", (req, res) => {
  UserController.logoutAll(req, res);
});

// User profile routes

UserProfileRoutes.get("/get-details/:userId", jwtToken, (req, res) => {
  UserController.getSingleUser(req, res);
});

UserProfileRoutes.get("/get-all-details", jwtToken, (req, res) => {
  UserController.getAllDetails(req, res);
});

UserProfileRoutes.put("/update-details/:userId", jwtToken, (req, res) => {
  UserController.updateDetails(req, res);
});

export { UserProfileRoutes };
export default AuthenticationRoutes;
