import express from "express";
import { watch, edit, card_home } from "../controllers/cardController";
import { login } from "../controllers/userController";

const cardRouter = express.Router();

cardRouter.get("/", card_home);
cardRouter.get("/:id(\\d+)", watch);
cardRouter.route("/:id(\\d+)/edit").get(edit).post(edit);

export default cardRouter;
