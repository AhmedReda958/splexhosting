/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Inovice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inovice_paymentId_key" ON "Inovice"("paymentId");