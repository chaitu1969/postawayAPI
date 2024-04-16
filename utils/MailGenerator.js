import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sentOtpMail = async (email, otp) => {
  try {
    let transport = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: { user: process.env.USER, pass: process.env.APP_PASSWORD },
    });

    const info = await transport.sendMail({
      from: process.env.USER,
      to: email,
      subject: "PostAway app verification Email",
      text: "This is a verification email from PostAway App",
      html: `<h1>please find below OTP</h1>
      <p>OTP : ${otp}</p>`,
    });

    return { success: true, Info: info };
  } catch (error) {
    console.log("Error in seding email : ", error);
  }
};

export default sentOtpMail;
