
import express from "express";
import auth from "../middleware/authorization.js";
import { register,login,verifyOtp} from "../controllers/authController.js";
const router = express.Router();


// const prisma = new PrismaClient();

router.get("/prof", (req, res) => {
  console.log(req.user);
  return res.json("working");
});

router.route("/register").post(register);
router.route("/loginOtp").post(login);
router.route("/verifyOtp").post(verifyOtp)



export default  router;
