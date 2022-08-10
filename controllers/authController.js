import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
// import {
//   hashPassword,
//   createJWT,
//   comparePassword,
//   AddOntime,
//   currentTime,
//   OtpGen,
// } from "../utils/index.js";
// import { AccessControl } from 'accesscontrol';
import {
  NotFoundError,
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index.js";
const prisma = new PrismaClient();
import {
  hashPassword,
  createJWT,
  comparePassword,
  currentTime,
  OtpGen,
} from "../utils/index.js";
import { StatusCodes } from "http-status-codes";
import { loginDash, registerDash } from "../utils/logger/index.js";
import bcrypt from "bcrypt";

//! Register User
const register = async (req, res) => {
  const { mobileNo,} = req.body;

  //* checking if any one of the field is empty will throw an error
  if (!mobileNo) {
    registerDash.log("info", "Please provide all values");
    throw new BadRequestError("Please provide all values");
  }

  //checking if user exist
  const userAlreadyExist = await prisma.driver.findUnique({
    where: {
      mobileNo: mobileNo,
    },
  });

  if (userAlreadyExist) {
    throw new BadRequestError("User already exist");
  }

  //encrypting the password
  // const newPassword = await hashPassword(password);

  ///const now = new Date();

  // //calculating current Time
 ///  var otpCurrentTime = await currentTime(now, 0);

  // //Logic for newUSER ,if user is trying to change the password for the first time
  //if (!resetUser.code) {
   // var otp = await OtpGen(); //Generating Otp
    // var otpTime = await currentTime(now, 1); //calculating time for which otp will be valid
 // }

  // //If user already changed the password and trying for the second time
 //  if (resetUser.expiryIn < resetUser.currentIn) {
  //   otpTime = await currentTime(now, 1); //calculating time for which otp will be valid
   // otp = await OtpGen();
  //}

   ////const otpData = await prisma.user.update({
   //where: {
   ///  email: email,
    //  },
  ///  data: {
        
    ///    code: otp,
    //   expiryIn: otpTime,
    //    currentIn: otpCurrentTime,
    /// },
    // select: {
   //     id: true,
    ///  email: true,
   //   code: true,
   //   expiryIn: true,
  //      currentIn: true,
  //  },
   // });

  //creating user
  const newUser = await prisma.driver.create({
    data: {
      mobileNo: mobileNo,
      driverId: "D0000",
     // code: otp,
      // expiryIn: otpTime,
      // currentIn: otpCurrentTime,
    },
  });
  let dId = `${process.env.PREFIX}${newUser.id}`;
  const updatedUser = await prisma.driver.update({
    where: { id: newUser.id },
    data: {
      driverId: dId,
    },
  });

  //Generating JWT token but not using it in registration form
   const accessToken = await createJWT(newUser);

  // Generating logs for register dash
 //  registerDash.log(
  //  "info",
  ///  `${newUser.name} ,${newUser.password},${newUser.email},Token:${accessToken}`
 /// );
  res.status(StatusCodes.OK).json({
    msg: "signed in successfully",
    updatedUser,
  });
};
//!LOGIN USER
const login = async (req, res) => {
  //* Logical code starts from here
  const {driverId } = req.body;
  console.log(driverId)
  if (!driverId) {
    loginDash.log("Please provide all the values");
    throw new BadRequestError("Please provide all the values");
  }

  //checking if user exist in DB
  const user = await prisma.Driver.findUnique({
    where: {
      driverOldId:driverId,
    },
  });
 

  //Throwing an error
  if (!user) {
    loginDash.log("User is not registered");
    throw new UnAuthenticatedError("User is not Registered");
  }

  const now = new Date();

  //calculating current Time
  var otpCurrentTime = await currentTime(now, 0);

  //Logic for newUSER ,if user is trying to change the password for the first time
  if (!user.code) {
    var otp = await OtpGen(); //Generating Otp
    var otpTime = await currentTime(now, 1); //calculating time for which otp will be valid
  }

  //If user already changed the password and trying for the second time
  if (user.expiryIn < user.currentIn) {
    otpTime = await currentTime(now, 1); //calculating time for which otp will be valid
    otp = await OtpGen();
  }

  //  const otpData = await prisma.driver.update({
  //    where: {
  //     mobileNo: user.mobileNo,
  //    },
  //    data: {
  //      code: 2121,
  //      expiryIn: otpTime,
  //      currentIn: otpCurrentTime,
  //    },
  //    select: {
  //      id: true,
  //      mobileNo: true,
  //      driverId: true,
  //      code: true,
  //    },
  //  });
   res.status(200).json({data:user })


  
};
//!Verify otp
const verifyOtp = async (req, res, next) => {
  const { code,driverId } = req.body;
  if (!code) {
    throw new BadRequestError("Please enter otp");
  }
  const user = await prisma.driver.findUnique({
    where: {
      driverOldId:driverId,
    },
  });

  if (code == user.code) {
    //  console.log("otp verified");
    const token = await createJWT(user);
    res.status(200).json({"OtpVerified":token});
  } else {
    throw new BadRequestError("Otp not verified");
  }
};

export { register, login ,verifyOtp};
