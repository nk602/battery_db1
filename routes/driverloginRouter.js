
import express from "express";
import auth from "../middleware/authorization.js";
import { driverRegister, driverlogin, driververifyOtp } from "../controllers/driverloginController.js";

const router = express.Router();




router.route("/register").post(driverRegister);
router.route("/loginOtp").post(driverlogin);
router.route("/verifyOtp").post(driververifyOtp)



export  default router;
