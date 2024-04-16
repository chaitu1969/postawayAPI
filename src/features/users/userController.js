import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepository from "./userRepository.js";

export default class userController {
  constructor() {
    this.UserRepository = new userRepository();
  }

  // signup
  async signup(req, res) {
    try {
      const { name, email, password, gender } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.UserRepository.signup({
        name,
        email,
        password: hashedPassword,
        gender,
      });
      return res.status(200).json({ success: true, message: user });
    } catch (error) {
      if (error.message.includes("User already exist")) {
        return res.status(409).json({
          success: false,
          errorMessage: "User already exist with the email",
        });
      }
      return res.status(500).json({
        success: false,
        errorMessage:
          "An error occurred during signup. Please try again later.",
      });
    }
  }

  // Signin
  async signin(req, res) {
    try {
      const user = await this.UserRepository.findByEmail(req.body.email);

      if (!user) {
        return res
          .status(404)
          .json({ success: true, message: "User not exist" });
      } else {
        // Compare password
        const isPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (isPassword) {
          // Token generator
          const token = Jwt.sign(
            { userId: user.id, email: user.email },
            process.env.SECRET,
            { expiresIn: "2hr" }
          );

          await this.UserRepository.setTokenToDB(user._id, token);

          return res.cookie("access_token", token).status(200).json({
            message:
              "Logged in successfully, token is implicitly set in cookie",
            Token: token,
          });
        } else {
          return res
            .status(401)
            .json({ sucess: true, Message: "incorrect Credentials" });
        }
      }
    } catch (error) {
      console.log("Sigin in token  Error :: ", error);
      return res.status(500).send("Something went wrong");
    }
  }

  // Logout in single device
  async logout(req, res) {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided." });
    }

    try {
      const payload = Jwt.verify(token, process.env.SECRET);
      const user = await this.UserRepository.findByEmail(payload.email);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }

      await this.UserRepository.deleteTokenFromDb(user._id, token);
      return res
        .clearCookie("access_token")
        .status(200)
        .json({ Sucess: true, messasge: "Logout Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrong");
    }
  }

  // logout from all devices
  async logoutAll(req, res) {
    const token = req.cookies.access_token;

    try {
      const payload = Jwt.verify(token, process.env.SECRET);
      const user = await this.UserRepository.findByEmail(payload.email);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }
      await this.UserRepository.deleteAllTokenFromDb(user._id);

      return res.status(201).send("Logged out from all devices");
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrong");
    }
  }

  // Get single user data
  async getSingleUser(req, res) {
    try {
      const userId = req.params.userId;
      const user = await this.UserRepository.findById(userId);
      if (!user) {
        return res.status(200).send(`User not found with id ${userId}`);
      }
      return res
        .status(200)
        .json({ name: user.name, email: user.email, Gender: user.gender });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, errorMessage: error });
    }
  }

  // get all user data
  async getAllDetails(req, res) {
    try {
      const users = await this.UserRepository.sendAllUsers();
      console.log(users);
      const simplifiedUsers = users.map(({ name, email, gender }) => ({
        name,
        email,
        gender,
      }));
      return res.status(200).send(simplifiedUsers);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, errorMessage: error });
    }
  }

  // update the single user only if authorrized
  async updateDetails(req, res) {
    const userId = req.params.userId;

    try {
      if (req.userId !== userId) {
        return res.status(401).json({ Message: "Unauthorized user" });
      }

      const user = await this.UserRepository.findById(userId);

      if (!user) {
        return res.status(404).send(`User not found with id ${userId}`);
      }

      user.name = req.body.name || user.name;
      user.gender = req.body.gender || user.gender;

      await user.save();

      return res
        .status(200)
        .json({ name: user.name, email: user.email, gender: user.gender });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, errorMessage: error });
    }
  }
}
