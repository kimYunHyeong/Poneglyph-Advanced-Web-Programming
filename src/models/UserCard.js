import mongoose from "mongoose";

const userCardSchema = new mongoose.Schema({
  cardName: { type: String },
  cost: { type: String },
  attribute: { type: String },
  power: { type: String },
  counter: { type: String },
  color: { type: String },
  feature: { type: String },
  text: { type: String },
  getInfo: { type: String },
  img: { type: String },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const UserCard = mongoose.model("UserCard", userCardSchema);
export default UserCard;
