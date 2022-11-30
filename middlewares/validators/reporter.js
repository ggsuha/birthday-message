import { validationResult } from "express-validator";

export default (req, res, next) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return {
      param: param,
      message: msg,
    };
  };

  const errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "fail",
      errors: errors.array({ onlyFirstError: true }),
    });
  }

  next();
};
