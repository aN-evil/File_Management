/*
  Warnings:

  - The `filesId` column on the `HomeScreen` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "HomeScreen" DROP COLUMN "filesId",
ADD COLUMN     "filesId" JSONB;
