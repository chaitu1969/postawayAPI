import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Friendship" }],
  tokens: [String],
});

export const userModel = mongoose.model("User", userSchema);
