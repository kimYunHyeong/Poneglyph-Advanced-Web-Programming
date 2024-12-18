import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
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
});

const Card = mongoose.model("Card", cardSchema);
export default Card;
