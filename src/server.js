import express from "express";
import morgan from "morgan";

//routers
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import cardRouter from "./routers/cardRouter";
import storyRouter from "./routers/storyRouter";
import characterRouter from "./routers/characterRouter";
import fruitRouter from "./routers/fruitRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

//important router
app.use("/", globalRouter);
app.use("/user", userRouter);

//informartion router
app.use("/cards", cardRouter);
app.use("/stories", storyRouter);
app.use("/characters", characterRouter);
app.use("/fruits", fruitRouter);

app.listen(
  PORT,
  console.log(`Server is running on port http://localhost:${PORT}`)
);
