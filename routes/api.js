import { Router } from "express";

import * as userController from "../controllers/userController.js";
import * as userValidator from "../middlewares/validators/userValidator.js";
import * as cityController from "../controllers/cityController.js";
import routeCache from "../middlewares/routeCache.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ data: "Welcome" });
});

router.get("/cities", routeCache(86400), cityController.list);

router.post("/user", userValidator.store, userController.store);
router.put("/user/:id", userValidator.update, userController.update);
router.delete("/user/:id", userController.destroy);

export default router;
