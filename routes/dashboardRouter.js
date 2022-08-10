import express, { Router } from "express";
import multer from "multer";

import {qrGenrator,postDealerDataCoordinates} from '../controllers/dashboardController.js'
import {createReferralData,getReferralData} from '../controllers/dashboardReferralController.js'
import {postDealerDataNewCoordinates} from '../controllers/dashboardControllerNew.js'
import {    createVehicleDetail,getVehicleDetail,createVehicleOwner,
            getVehicleOwner,createGuarantorDetail,getGuarantorDetail ,
     } from '../controllers/dashboardDealerController.js'

const router = express.Router();

router.route("/qrGenrator").post(qrGenrator);
router.route("/postDealerDataCoordinates").post(postDealerDataCoordinates);
router.route("/postDealerDataNewCoordinates").post(postDealerDataNewCoordinates);
router.route("/createReferralData").post(createReferralData);
router.route("/getReferralData").post(getReferralData)

export  default router;
