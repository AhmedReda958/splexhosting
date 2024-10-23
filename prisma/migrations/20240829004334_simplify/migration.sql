/*
  Warnings:

  - You are about to drop the column `cpu` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `os` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ip4` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_planId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Server" DROP CONSTRAINT "Server_planId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Server" DROP COLUMN "cpu",
DROP COLUMN "ipAddress",
DROP COLUMN "os",
DROP COLUMN "planId",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "cores" INTEGER,
ADD COLUMN     "ip4" TEXT NOT NULL,
ALTER COLUMN "serverName" DROP NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Invoice";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Plan";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";
