import express from "express";
import { imgUpload, protectorMiddleware, removeFile } from "../middlewares.js";

import {
  watch,
  getEdit,
  postEdit,
  card_home,
  getUpload,
  postUpload,
  user_card_home,
  userCardWatch,
  delteUserCard,
} from "../controllers/cardController";

const cardRouter = express.Router();

//official card route
cardRouter.get("/", card_home);
cardRouter.get("/:id([0-9a-f]{24})", watch);

//user card route
cardRouter.route("/usercards").get(user_card_home);
cardRouter.get("/usercards/:id([0-9a-f]{24})", userCardWatch);

//card crud
cardRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(imgUpload.single("img"), postUpload);
cardRouter
  .route("/usercards/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
cardRouter
  .route("/usercards/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(removeFile, delteUserCard);
export default cardRouter;
