import mongoose from "mongoose";

const friendshipSchema = mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const friendshipModel = mongoose.model("Friendship", friendshipSchema);

export default friendshipModel;
