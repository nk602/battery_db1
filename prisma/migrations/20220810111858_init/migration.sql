-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "driverOldId" TEXT,
    "batteryID" TEXT,
    "driver" TEXT,
    "code" INTEGER,
    "expiryIn" INTEGER,
    "currentIn" INTEGER,
    "bss" TEXT,
    "bssCode" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealerData" (
    "id" SERIAL NOT NULL,
    "bssCode" TEXT,
    "bss" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "countryName" TEXT,
    "pincode" INTEGER,
    "coordinates" TEXT,

    CONSTRAINT "DealerData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverExtendedData" (
    "id" SERIAL NOT NULL,
    "otp" INTEGER,
    "role" TEXT NOT NULL,
    "expiryIn" INTEGER,
    "currentIn" INTEGER,
    "AadharId" INTEGER,
    "AssetService" TEXT NOT NULL,
    "ValidateDriver" BOOLEAN NOT NULL,
    "driverMasterId" TEXT NOT NULL,

    CONSTRAINT "DriverExtendedData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "referralNo" SERIAL NOT NULL,
    "referralName" TEXT NOT NULL,
    "referralContactNumber" INTEGER NOT NULL,
    "referralRelationship" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleDetails" (
    "id" SERIAL NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "vehicleRegNo" TEXT NOT NULL,
    "regValidity" TEXT NOT NULL,
    "chasisNo" TEXT NOT NULL,
    "vehicleMake" TEXT NOT NULL,
    "vehicleModel" TEXT NOT NULL,
    "purchaseDate" TEXT NOT NULL,
    "vehicleFinanced" TEXT NOT NULL,
    "financerName" TEXT NOT NULL,
    "financerContactNo" TEXT NOT NULL,
    "insuranceStatus" TEXT NOT NULL,
    "insuranceUpto" TEXT NOT NULL,
    "uploadRCdocument" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "VehicleDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleOwner" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "currentAddressArea" TEXT NOT NULL,
    "currentAddressPin" TEXT NOT NULL,
    "currentAddressCity" TEXT NOT NULL,
    "currentAddressState" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "permanentAddressArea" TEXT NOT NULL,
    "permanentAddressPin" TEXT NOT NULL,
    "permanentAddressCity" TEXT NOT NULL,
    "permanentAddressState" TEXT NOT NULL,
    "AdharId" TEXT NOT NULL,
    "uploadDocument" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "VehicleOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuarantorDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNo" INTEGER NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "currentAddressArea" TEXT NOT NULL,
    "currentAddressPin" TEXT NOT NULL,
    "currentAddressCity" TEXT NOT NULL,
    "currentAddressState" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "permanentAddressArea" TEXT NOT NULL,
    "permanentAddressPin" TEXT NOT NULL,
    "permanentAddressCity" TEXT NOT NULL,
    "permanentAddressState" TEXT NOT NULL,
    "AdharId" TEXT NOT NULL,
    "UploadDocument" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "GuarantorDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_id_key" ON "Driver"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_mobileNo_key" ON "Driver"("mobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_driverId_key" ON "Driver"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_driverOldId_key" ON "Driver"("driverOldId");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_bssCode_key" ON "Driver"("bssCode");

-- CreateIndex
CREATE UNIQUE INDEX "DealerData_id_key" ON "DealerData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DealerData_bssCode_key" ON "DealerData"("bssCode");

-- CreateIndex
CREATE UNIQUE INDEX "DriverExtendedData_id_key" ON "DriverExtendedData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DriverExtendedData_driverMasterId_key" ON "DriverExtendedData"("driverMasterId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_id_key" ON "Referral"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referralNo_key" ON "Referral"("referralNo");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referralContactNumber_key" ON "Referral"("referralContactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleDetails_id_key" ON "VehicleDetails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleDetails_chasisNo_key" ON "VehicleDetails"("chasisNo");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleDetails_financerContactNo_key" ON "VehicleDetails"("financerContactNo");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleOwner_mobileNo_key" ON "VehicleOwner"("mobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "GuarantorDetails_mobileNo_key" ON "GuarantorDetails"("mobileNo");

-- AddForeignKey
ALTER TABLE "DriverExtendedData" ADD CONSTRAINT "DriverExtendedData_driverMasterId_fkey" FOREIGN KEY ("driverMasterId") REFERENCES "Driver"("bssCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("driverOldId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleDetails" ADD CONSTRAINT "VehicleDetails_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("driverOldId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleOwner" ADD CONSTRAINT "VehicleOwner_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("driverOldId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuarantorDetails" ADD CONSTRAINT "GuarantorDetails_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("driverOldId") ON DELETE RESTRICT ON UPDATE CASCADE;
