import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashTags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Card = mongoose.model("Card", cardSchema);
export default Card;
