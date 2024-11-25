import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  card_home,
  getUpload,
  postUpload,
} from "../controllers/cardController";

const cardRouter = express.Router();

cardRouter.get("/", card_home);
cardRouter.get("/:id([0-9a-f]{24})", watch);
cardRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
cardRouter.route("/upload").get(getUpload).post(postUpload);

export default cardRouter;
