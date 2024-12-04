import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  card_home,
  getUpload,
  postUpload,
  delteCard,
  user_card_home,
  userCardWatch,
} from "../controllers/cardController";

const cardRouter = express.Router();

cardRouter.get("/", card_home);
cardRouter.get("/:id([0-9a-f]{24})", watch);
cardRouter.route("/upload").get(getUpload).post(postUpload);
cardRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
cardRouter.route("/:id([0-9a-f]{24})/delete").get(delteCard);
cardRouter.route("/usercards").get(user_card_home);
cardRouter.get("/usercards/:id([0-9a-f]{24})", userCardWatch);
export default cardRouter;
