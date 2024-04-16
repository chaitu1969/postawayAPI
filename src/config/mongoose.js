import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to the DB");
    })
    .catch((error) => {
      console.log(error);
      console.log("Unable to connect to DB");
    });
};
