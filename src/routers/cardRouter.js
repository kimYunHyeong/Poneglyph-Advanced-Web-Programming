import express from "express";
import {
  watch,
  edit,
  upload,
  deleteVideo,
} from "../controllers/cardController";

const cardRouter = express.Router();
cardRouter.get("/upload", upload);
cardRouter.get("/:id(\\d+)", watch);
cardRouter.get("/:id(\\d+)/edit", edit);
cardRouter.get("/:id(\\d+)/delete", deleteVideo);

export default cardRouter;
