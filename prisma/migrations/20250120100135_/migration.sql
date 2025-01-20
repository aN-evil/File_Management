/*
  Warnings:

  - You are about to drop the column `filesId` on the `HomeScreen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HomeScreen" DROP COLUMN "filesId",
ADD COLUMN     "files" JSONB;
