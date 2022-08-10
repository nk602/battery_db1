import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {
  NotFoundError,
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import multer from "multer";

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "images",
  filename: async (req, file, cb) => {
    console.log("image storage",file)
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  // limits: {
  //   fileSize: 1000000 // 1000000 Bytes = 1 MB
  // },
  fileFilter(req, file, cb) {
    console.log(file)
    if (!file.originalname.match(/\.(png|jpg|)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload document"));
    }
    cb(undefined, true);
  },
});
//! image Uploader
const imageUploader = async (req, res) => {
 
  
  const fileDetails = req.file;
  await prisma.vehicleDetails.create({
  //  where: {
 ///     ,
  //  id: req.user.userId,
 // },
    data: {
      uploadRCdocument: fileDetails.path,
    },
  });
  console.log(fileDetails);
  res.json({
    "Image_Successfully created": fileDetails,
  });

}


const createVehicleDetail = async(req,res) => {
    const {  vehicleRegNo,       
             regValidity , 
             vehicleType ,         
             chasisNo    ,        
             vehicleMake  ,      
             vehicleModel,
             vehicleFinanced ,  
             purchaseDate   ,   
             financerName  ,       
             insuranceStatus ,  
             insuranceUpto  ,
             driverId,
             uploadRCdocument,
         
             
        } = req.body
      let {financerContactNo} = req.body
        financerContactNo=parseInt(financerContactNo)
   const user = await prisma.driver.findUnique({
     where: {
      driverId: driverId,
       },
    });
    console.log(user)
    if (!user) {
     throw new BadRequestError("user not found");
    }
    
    const dealer = await prisma.vehicleDetails.create({
        data: {
            vehicleType:     vehicleType,
            vehicleRegNo:    vehicleRegNo,       
            regValidity:     regValidity,       
            chasisNo   :     chasisNo  ,        
            vehicleMake :    vehicleMake,      
            vehicleModel:    vehicleModel,
            purchaseDate :   purchaseDate ,
            vehicleFinanced: vehicleFinanced ,  
            financerName:    financerName,
            insuranceStatus: insuranceStatus,
            insuranceUpto :   insuranceUpto,
            financerContactNo: financerContactNo,
            uploadRCdocument:  "upload your document"                ,
            driverId:          user.driverOldId
        }
    });

    res.status(200).send(dealer)
}


const  getVehicleDetail = async(req,res) => {
    const{financerContactNo} = req.body
    const user = await prisma.driver.findUnique({
      where: {
        id: req.user.userId,
      },
    });
    if (!user) {
      throw new BadRequestError("user not found");
    }
    const detail = await prisma.vehicleDetails.findUnique({
       where: {
        financerContactNo:financerContactNo }
      });

     res.status(200).send(detail)
    }


 const createVehicleOwner = async(req,res) => {
  const {                         
    name       ,                
    currentAddress ,
    currentAddressArea  ,  
    currentAddressPin  ,
    currentAddressCity ,
    currentAddressState,
    permanentAddress     ,
    permanentAddressArea ,
    permanentAddressPin  ,
    permanentAddressCity  , 
    AdharId          , 
    uploadDocument   ,
    } = req.body
          
        //  let { mobileNo  } = req.body
       //   mobileNo=parseInt(mobileNo)
 // const user = await prisma.driver.findUnique({
 //  where: {
  ///  id: req.user.userId,
    ///         },
     //   });
 // console.log(user)
 /// if (!user) {
 ///  throw new BadRequestError("user not found");
//  }
  const Owner = await prisma.vehicleOwner.create({
      data: {     
        name  :               name  ,
        mobileNo :            mobileNo ,
        currentAddress :      currentAddress,
        currentAddressArea :  currentAddressArea  ,  
        currentAddressPin  :  currentAddressPin,
        currentAddressCity :  currentAddressCity,
        currentAddressState:  currentAddressState,
        permanentAddress    : permanentAddress  ,
        permanentAddressArea :permanentAddressArea,
        permanentAddressPin   :permanentAddressPin ,
        permanentAddressCity  :permanentAddressCity ,
        AdharId          :     AdharId, 
        uploadDocument   :   "Upload your document",              
        driverId        :     user.driverOldId 
      }
  });

  res.status(200).send(Owner)
}


const getVehicleOwner = async(req,res) => {
  const{mobileNo} = req.body
  const user = await prisma.driver.findUnique({
    where: {
      id: req.user.userId,
    },
  });
  if (!user) {
    throw new BadRequestError("user not found");
  }
  const Owner = await prisma.vehicleOwner.findUnique({
     where: {
      mobileNo:mobileNo }
  });

  res.status(200).send(Owner)
}


const  createGuarantorDetail = async(req,res) => {
  const{
           name      ,                    
           currentAddress ,
           currentAddressArea  ,  
           currentAddressPin  ,
           currentAddressCity ,
           currentAddressState,
           permanentAddress     ,
           permanentAddressArea ,
           permanentAddressPin  ,
           permanentAddressCity  ,    
           AdharId              ,
           uploadDocument ,
                  } = req.body
      let { mobileNo } = req.body
      mobileNo =parseInt( mobileNo )
  const user = await prisma.driver.findUnique({
    where: {
      id: req.user.userId,
    },
  });
  if (!user) {
    throw new BadRequestError("user not found");
  }
  const detail = await prisma.guarantorDetails.create({
      data: {               
        name                 :name  ,          
        mobileNo             :mobileNo ,   
        currentAddress       :currentAddress,
        currentAddressArea   :currentAddressArea  ,  
        currentAddressPin    :currentAddressPin,
        currentAddressCity   :currentAddressCity,
        currentAddressState  :currentAddressState,
        permanentAddress     :permanentAddress  ,
        permanentAddressArea :permanentAddressArea,
        permanentAddressPin  :permanentAddressPin ,
        permanentAddressCity :permanentAddressCity  ,
        AdharId              :AdharId   ,
        designation:          designation,
        uploadDocument       :"Upload your document",
        driverId             :driverId.user.driverOldId   
      }
  });

  res.status(200).send(detail)
}


const  getGuarantorDetail = async(req,res) => {
  const{referralContactNumber} = req.body
  const user = await prisma.driver.findUnique({
    where: {
      id: req.user.userId,
    },
  });
  if (!user) {
    throw new BadRequestError("user not found");
  }
  const detail = await prisma.guarantorDetails.findUnique({
     where: {
      mobileNo :mobileNo
     }
  });

  res.status(200).send(detail)
}



export  {  imageUpload,
           imageUploader,
           createVehicleDetail,
           getVehicleDetail,
           createVehicleOwner,
           getVehicleOwner,
           createGuarantorDetail,
           getGuarantorDetail,
   };