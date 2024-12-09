import express from "express";
import { imgUpload } from "../middlewares.js";

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
  delteUserCard,
} from "../controllers/cardController";

const cardRouter = express.Router();

cardRouter.get("/", card_home);
cardRouter.get("/:id([0-9a-f]{24})", watch);
cardRouter
  .route("/upload")
  .get(getUpload)
  .post(imgUpload.single("img"), postUpload);
cardRouter.route("/:id([0-9a-f]{24})/delete").get(delteCard);
cardRouter.route("/usercards").get(user_card_home);
cardRouter.get("/usercards/:id([0-9a-f]{24})", userCardWatch);
cardRouter
  .route("/usercards/:id([0-9a-f]{24})/edit")
  .get(getEdit)
  .post(postEdit);
cardRouter.route("/usercards/:id([0-9a-f]{24})/delete").get(delteUserCard);
export default cardRouter;
