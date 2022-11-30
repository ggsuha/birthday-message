import { Router } from "express";

import * as userController from "../controllers/userController.js";
import * as userValidator from "../middlewares/validators/userValidator.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ data: "Welcome" });
});

router.post("/user", userValidator.store, userController.store);
router.put("/user/:id", userValidator.update, userController.update);
router.delete("/user/:id", userController.destroy);

export default router;
