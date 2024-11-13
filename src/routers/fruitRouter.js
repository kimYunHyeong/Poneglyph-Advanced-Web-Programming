import express from "express";
import { fruit_home, watchFruit } from "../controllers/fruitController";
import { login } from "../controllers/userController";

const fruitRouter = express.Router();

fruitRouter.get("/", fruit_home);
fruitRouter.get("/:id(\\d+)", watchFruit);

export default fruitRouter;
