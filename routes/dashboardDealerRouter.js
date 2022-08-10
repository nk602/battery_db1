import express, { Router } from "express";
import multer from "multer";




import {  createVehicleDetail,getVehicleDetail,createVehicleOwner,
    getVehicleOwner,createGuarantorDetail,getGuarantorDetail ,

    imageUploader,imageUpload,
} from '../controllers/dashboardDealerController.js'

const router = express.Router();


router.route("/createVehicleDetail").post(createVehicleDetail)
router.route("/getVehicleDetail").post(getVehicleDetail)
router.post(
    "/createVehicleDetail/uploadImage",
    imageUpload.single("image"),
   imageUploader
   );

   


router.route("/createVehicleOwner").post(createVehicleOwner)
router.route("/getVehicleOwner").post(getVehicleOwner)
router.post(
    "/createVehicleOwner/uploadImage",
     imageUpload.single("image"),
     imageUploader
   );



router.route("/createGuarantorDetail").post(createGuarantorDetail)
router.route("/getGuarantorDetail").post(getGuarantorDetail)

router.post(
   "/createGuarantor/uploadImage",
     imageUpload.single("image"),
    imageUploader
   );





export default router;
