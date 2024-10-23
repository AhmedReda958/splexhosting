-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "productName" TEXT DEFAULT 'custom';

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "features" TEXT[],
    "price" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'vps',
    "cpu" TEXT,
    "cores" INTEGER,
    "ram" INTEGER,
    "storage" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
