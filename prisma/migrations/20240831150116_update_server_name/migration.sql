/*
  Warnings:

  - You are about to drop the column `serverName` on the `Server` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Server" DROP COLUMN "serverName",
ADD COLUMN     "name" TEXT;
