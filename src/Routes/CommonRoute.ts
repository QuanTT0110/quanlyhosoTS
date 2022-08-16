import * as express from "express";
import * as validate from "../Validate/Common";
import {auth} from "../Middleware/auth";
import CommonController from "../Controllers/CommonController";

const router = express.Router();

router.post("/login",validate.login,CommonController.login);
router.get("/me",auth,CommonController.getStaff);

export default router;