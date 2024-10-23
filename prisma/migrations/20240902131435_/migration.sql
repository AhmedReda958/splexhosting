/*
  Warnings:

  - You are about to drop the `DServer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DServer" DROP CONSTRAINT "DServer_userId_fkey";

-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "ip6" TEXT,
ADD COLUMN     "operating" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'vps';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "DServer";
