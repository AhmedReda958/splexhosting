-- CreateTable
CREATE TABLE "DServer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT,
    "desc" TEXT,
    "ip4" TEXT NOT NULL,
    "cpu" TEXT,
    "ram" INTEGER,
    "storage" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DServer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DServer" ADD CONSTRAINT "DServer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
