import * as userService from "../services/userService.js";
import catchAsync from "../utils/catchAsync.js";

export const store = catchAsync(async (req, res, next) => {
  const user = await userService.create(req.body);

  return res.status(201).json({
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      cityId: user.cityId,
    },
  });
});

export const update = catchAsync(async (req, res, next) => {
  const user = await userService.update(req.params.id, req.body);

  return res.status(200).json({
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      cityId: user.cityId,
    },
  });
});

export const destroy = catchAsync(async (req, res, next) => {
  await userService.destroy(req.params.id);

  return res.status(204).json();
});
