import { Router } from "express";

import * as userController from "../controllers/userController.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ data: "Welcome" });
});

router.post("/user", userController.store);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.destroy);

export default router;
