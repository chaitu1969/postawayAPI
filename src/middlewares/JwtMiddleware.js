import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(200).send("Token is required");
  }

  try {
    const payload = Jwt.verify(token, process.env.SECRET);
    req.userId = payload.userId;
    req.emailId = payload.emailId;
  } catch (error) {
    return res.status(401).json({ Message: "Unauthorized token Error" });
  }

  next();
};

export default jwtToken;
