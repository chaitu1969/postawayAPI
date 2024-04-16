import mongoose from "mongoose";

const OtpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

export const otpModel = mongoose.model("Otp", OtpSchema);
