import express from "express";
import { connectUsingMongoose } from "./src/config/mongoose.js";
import AuthenticationRoutes, {
  UserProfileRoutes,
} from "./src/features/users/userRouter.js";
import postRouter from "./src/features/posts/postRouter.js";
import jwtToken from "./src/middlewares/JwtMiddleware.js";
import commentRouter from "./src/features/comments/commentRouter.js";
import likeRouter from "./src/features/likes/likeRouter.js";
import otpRouter from "./src/features/otp/otpRouter.js";
import friendRouter from "./src/features/friends/friendsRouter.js";
import cookieParser from "cookie-parser";

// Create a Server
const server = express();

server.use(express.static("public"));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

//Server Routers
server.use("/api/users", AuthenticationRoutes);
server.use("/api/users", UserProfileRoutes);
server.use("/api/posts", jwtToken, postRouter);
server.use("/api/comments", jwtToken, commentRouter);
server.use("/api/likes", jwtToken, likeRouter);
server.use("/api/friends", jwtToken, friendRouter);
server.use("/api/otp", jwtToken, otpRouter);

// Listen server on port 3000
server.listen(3000, (err) => {
  if (err) {
    console.log("Error in connecting to server");
  }
  console.log("Connected to the server");
  connectUsingMongoose();
});
