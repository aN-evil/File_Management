-- CreateTable
CREATE TABLE "HomeScreen" (
    "id" TEXT NOT NULL,
    "partyName" TEXT NOT NULL,
    "placeName" TEXT NOT NULL,
    "date" TEXT,
    "filesId" TEXT[],
    "userId" TEXT,

    CONSTRAINT "HomeScreen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeScreen_id_key" ON "HomeScreen"("id");

-- AddForeignKey
ALTER TABLE "HomeScreen" ADD CONSTRAINT "HomeScreen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
