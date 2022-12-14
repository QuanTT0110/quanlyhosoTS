import * as express from "express";
import DrawerController from "../controllers/drawers";
import { auth } from "../Middleware/auth";
import * as validate from "../validate/drawers";
const router = express.Router();
router.use(auth);
router.get("/", validate.queryDrawer, DrawerController.getListDrawer);
router.get("/:id", validate.isUUID, DrawerController.findDrawerById);
router.post("/", validate.createDrawer, DrawerController.createDrawer);
router.put(
  "/:id",
  validate.isUUID,
  validate.createDrawer,
  DrawerController.updateDrawer
);

export default router;