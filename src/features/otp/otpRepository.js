import { otpModel } from "./otpSchema.js";

export class otpRepository {
  async createOtp(email, otp) {
    try {
      const newOtp = new otpModel({ email, otp });
      return await newOtp.save();
    } catch (error) {
      throw error;
    }
  }

  async verifyOtp(otp, email) {
    try {
      const otpObject = await otpModel
        .findOne({ email: email })
        .sort({ createdAt: -1 })
        .limit(1);
      if (otpObject.otp === otp) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async checkOtpExist(email) {
    try {
      const deltedAllotp = await otpModel.delteMany({ email });
      if (deltedAllotp.deletedCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
