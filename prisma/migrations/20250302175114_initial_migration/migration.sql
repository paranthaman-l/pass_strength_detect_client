-- CreateTable
CREATE TABLE "Policy" (
    "pid" TEXT NOT NULL,
    "lower" INTEGER NOT NULL,
    "upper" INTEGER NOT NULL,
    "special" INTEGER NOT NULL,
    "digit" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("pid")
);
