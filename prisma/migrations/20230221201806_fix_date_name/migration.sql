/*
  Warnings:

  - You are about to drop the column `date` on the `player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "player" DROP COLUMN "date",
ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
