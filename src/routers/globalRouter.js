import express from "express";
import { showHomepage } from "../controllers/cardController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router();
globalRouter.get("/", showHomepage);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
