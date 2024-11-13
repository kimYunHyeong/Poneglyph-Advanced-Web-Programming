import express from "express";
import {
  watchCharacter,
  character_home,
} from "../controllers/characterController";
import { login } from "../controllers/userController";

const characterRouter = express.Router();

characterRouter.get("/", character_home);
characterRouter.get("/:id(\\d+)", watchCharacter);

export default characterRouter;
