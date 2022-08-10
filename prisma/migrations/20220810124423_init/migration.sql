/*
  Warnings:

  - A unique constraint covering the columns `[driverId]` on the table `VehicleDetails` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `financerContactNo` on the `VehicleDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "VehicleDetails" DROP COLUMN "financerContactNo",
ADD COLUMN     "financerContactNo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VehicleDetails_financerContactNo_key" ON "VehicleDetails"("financerContactNo");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleDetails_driverId_key" ON "VehicleDetails"("driverId");
