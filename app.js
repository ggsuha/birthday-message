import express, { json, urlencoded } from "express";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./middlewares/errorHandler.js";
import apiRouter from "./routes/api.js";

const app = express();

app.use(json({ limit: "10kb" }));
app.use(urlencoded({ extended: true, limit: "10kb" }));

app.use(apiRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
