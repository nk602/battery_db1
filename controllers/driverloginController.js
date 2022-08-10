import { PrismaClient } from "@prisma/client";
import { NotFoundError, BadRequestError, UnAuthenticatedError, } from "../errors/index.js";
const prisma = new PrismaClient();
import { createJWT, currentTime, OtpGen, } from "../utils/index.js";
import { loginDash, registerDash } from "../utils/logger/index.js";

const driverRegister = async (req, res, next) => {
    const { driverMasterId } = req.body;
    if (!driverMasterId) {
        registerDash.log("info", "Please provide all values");
        throw new BadRequestError("Please provide all values");
    }


    let data = {
        driverMasterId: req.body.driverMasterId,
        AssetService: req.body.AssetService,
        role: req.body.role,
        AadharId: req.body.AadharId,
        ValidateDriver: req.body.ValidateDriver
    };
    const user = await prisma.driverExtendedData.findUnique({
        where: {
            driverMasterId: driverMasterId,
        },
    });
    if (user) {
        throw new BadRequestError("User already exist");
    }

    try {

        const User = await prisma.driverExtendedData.create({ data });
        res.status(200).json({ message: "OK", User });
        console.log(User);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Error occurred while creating the dealerplan",
        });
    }
}

// driverlogin Api
const driverlogin = async (req, res, next) => {
    //* Logical code starts from here
    const { driverMasterId } = req.body;

    if (!driverMasterId) {
        loginDash.log("Please provide all the values");
        throw new BadRequestError("Please provide all the values");
    }

    // checking if user exist in DB
    const user = await prisma.driver.findUnique({
        where: {
            bssCode: driverMasterId
        }
    });
    console.log(user, "USER_____");

    //Throwing an errors
    if (!user) {
        loginDash.log("User is not registered");
        throw new UnAuthenticatedError("User is not Registered");
    }

    const now = new Date();

    //calculating current Time
    var otpCurrentTime = await currentTime(now, 0);

    //Logic for newUSER ,if user is trying to change the password for the first time
    if (!user.otp) {
        var otp = await OtpGen(); //Generating Otp
        var otpTime = await currentTime(now, 1); //calculating time for which otp will be valid
    }

    //If user already changed the password and trying for the second time
    if (user.expiryIn < user.currentIn) {
        otpTime = await currentTime(now, 1); //calculating time for which otp will be valid
        otp = await OtpGen();
    }

    const otpData = await prisma.driverExtendedData.update({
        where: {
            driverMasterId: driverMasterId,
        },
        data: {
            // otp: otp,
            // expiryIn: otpTime,
            // currentIn: otpCurrentTime,
        },
        select: {
            // id: true,
            // mobileNo: true,
            driverMasterId: true,
            // otp: true,
        },
    });
    res.status(200).json({ data: user })
    console.log(otpData);
}

const driververifyOtp = async (req, res, next) => {
    const { otp, driverMasterId } = req.body;
    // console.log(otp,dealerID,"USER______");
    if (!otp) {
        throw new BadRequestError("Please enter otp");
    }
    const user = await prisma.driverExtendedData.findUnique({
        where: {
            driverMasterId: driverMasterId,
        },

    });
    console.log(user, "USER");
    if (otp == user.otp) {
        //  console.log("otp verified");
        const token = await createJWT(user);
        res.status(200).json({ "OtpVerified": token });
        // console.log(token);

    } else {
        throw new BadRequestError("Otp not verified");
    }
}

export { driverRegister, driverlogin, driververifyOtp };