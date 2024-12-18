import "dotenv/config";
import "./db";
import "./models/Card";
import app from "./server";

const PORT = 3000;

app.listen(
  PORT,
  console.log(`Server listening on port http://localhost:${PORT}`)
);
