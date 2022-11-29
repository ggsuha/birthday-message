import app from "./app.js";
import * as dotenv from "dotenv";
dotenv.config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
