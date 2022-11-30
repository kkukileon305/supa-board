-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
