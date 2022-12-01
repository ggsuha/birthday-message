import app from "./app.js";
import * as dotenv from "dotenv";
import schedule from "node-schedule";
import * as messageService from "./services/messageService.js";
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

const everyHour = "0 * * * *";
schedule.scheduleJob(everyHour, function () {
  messageService.sendBirthdayMessage();
});

const everyMinute = "* * * * *";
schedule.scheduleJob(everyMinute, function () {
  messageService.resendMessage();
});
