import { check } from "express-validator";
import reporter from "./reporter.js";
import { isEmailTaken } from "../../services/userService.js";

export const store = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email must not be empty!")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Input maximum 255 characters!")
    .isEmail()
    .withMessage("Invalid email address!")
    .custom(async (value) => {
      const isExist = await isEmailTaken(value);
      if (isExist) {
        throw new Error("Email already in use!");
      }

      return true;
    }),

  check("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("firstName must not be empty!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Input between 3 to 20 characters!"),

  check("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("lastName must not be empty!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Input between 3 to 20 characters!"),

  check("birthDate")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("birthDate must not be empty!")
    .isISO8601()
    .toDate()
    .withMessage("birthDate format not valid, should 'yyyy-mm-dd'"),

  check("cityId")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("cityId must not be empty!"),
  reporter,
];

export const update = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email must not be empty!")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Input maximum 255 characters!")
    .isEmail()
    .withMessage("Invalid email address!")
    .custom(async (value, { req }) => {
      const user = await isEmailTaken(value);

      if (user && user.id !== parseInt(req.params.id)) {
        throw new Error("Email already in use!");
      }

      return true;
    }),

  check("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("firstName must not be empty!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Input between 3 to 20 characters!"),

  check("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("lastName must not be empty!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Input between 3 to 20 characters!"),

  check("birthDate")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("birthDate must not be empty!")
    .isISO8601()
    .toDate()
    .withMessage("birthDate format not valid, should 'yyyy-mm-dd'"),

  check("cityId")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("cityId must not be empty!"),
  reporter,
];
