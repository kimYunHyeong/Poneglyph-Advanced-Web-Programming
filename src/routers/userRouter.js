import express from "express";
import {
  edit,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get(":id", see);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/edit", edit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

export default userRouter;
