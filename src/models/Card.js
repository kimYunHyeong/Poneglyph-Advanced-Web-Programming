import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now() },
  hashTags: [{ type: String, tirm: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

cardSchema.static("formatHashTags", function (hashTags) {
  return hashTags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

cardSchema.static("formatHashTags2", function (hashTags) {
  return hashTags;
});

const Card = mongoose.model("Card", cardSchema);
export default Card;
