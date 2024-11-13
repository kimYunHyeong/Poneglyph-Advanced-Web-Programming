import express from "express";
import { watchStory, story_home } from "../controllers/storyController";
import { login } from "../controllers/userController";

const storyRouter = express.Router();

storyRouter.get("/", story_home);
storyRouter.get("/:id(\\d+)", watchStory);

export default storyRouter;
