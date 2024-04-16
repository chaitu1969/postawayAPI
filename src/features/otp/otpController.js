import otpGenerator from "otp-generator";
import { userModel } from "../users/userSchema.js";
import sentOtpMail from "../../../utils/MailGenerator.js";
import { otpRepository } from "./otpRepository.js";
import bcrypt from "bcrypt";
import userRepository from "../users/userRepository.js";

export class otpController {
  constructor() {
    this.OtpRepository = new otpRepository();
    this.UserRepository = new userRepository();
  }

  async sendOtp(req, res) {
    try {
      const { email } = req.body;

      const isUserExist = await userModel.findByEmail({ email });

      if (!isUserExist) {
        return res.status(400).send("Email is not registered!!!");
      }

      const otp = otpGenerator.generate(5, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const isCreate = await this.OtpRepository.createOtp(email, otp);

      const mailResponse = await sentOtpMail(email, otp);

      if (mailResponse.success && isCreate) {
        return res
          .status(200)
          .json({ success: true, message: "please check your mail" });
      } else {
        return res.status(400).send("email is not valid or not registered");
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong in server" });
    }
  }

  async verifyOtp(req, res) {
    try {
      const { otp } = req.body;
      const userEmail = req.emailId;
      const result = await this.OtpRepository.verifyOtp(otp, userEmail);

      if (result) {
        return res.status(200).send("Otp has been verified successfully");
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong in server" });
    }
  }
  async resetPassword(req, res) {
    const { newPassword } = req.body;
    try {
      const isExistedOtpDeleted = await this.OtpRepository.checkOtpExist(
        req.emailId
      );

      if (!isExistedOtpDeleted) {
        return res
          .status(400)
          .send("To reset password. please verify your email");
      } else {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const resultObject = await this.UserRepository.resetPassword(
          hashedPassword,
          req.userId
        );
        if (resultObject.success) {
          return res.status(200).send(resultObject.message);
        } else {
          return res.status(401).send("Password reset failed !!");
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error in server . please check the log");
    }
  }
}
