import express from "express";
import { otpController } from "./otpController.js";

const otpRouter = express.Router();

const OtpController = new otpController();

otpRouter.post("/send", (req, res) => {
  OtpController.sendOtp(req, res);
});

otpRouter.post("/verify", (req, res) => {
  OtpController.verifyOtp(req, res);
});

otpRouter.put("/reset-password", (req, res) => {
  OtpController.resetPassword(req, res);
});

export default otpRouter;
