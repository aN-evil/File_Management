/*
  Warnings:

  - You are about to drop the column `AuthApi` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "AuthApi",
ADD COLUMN     "authKey" TEXT;
