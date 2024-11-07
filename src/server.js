import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import cardRouter from "./routers/cardRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/card", cardRouter);

app.listen(
  PORT,
  console.log(`Server l istening on port http://localhost:${PORT}`)
);
