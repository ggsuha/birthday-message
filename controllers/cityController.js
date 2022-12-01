import * as cityService from "../services/cityService.js";
import catchAsync from "../utils/catchAsync.js";

export const list = catchAsync(async (req, res, next) => {
  const cities = await cityService.getAll();

  return res.status(201).json({
    data: cities,
  });
});
