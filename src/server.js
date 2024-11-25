import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";

//routers
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import cardRouter from "./routers/cardRouter";
import storyRouter from "./routers/storyRouter";
import characterRouter from "./routers/characterRouter";
import fruitRouter from "./routers/fruitRouter";

const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000000000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localMiddleware);

app.use("/assets", express.static("assets"));

//important router
app.use("/", rootRouter);
app.use("/user", userRouter);

//informartion router
app.use("/cards", cardRouter);
app.use("/stories", storyRouter);
app.use("/characters", characterRouter);
app.use("/fruits", fruitRouter);

export default app;
