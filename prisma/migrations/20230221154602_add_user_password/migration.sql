/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player_Games` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player_Games" DROP CONSTRAINT "Player_Games_game_id_fkey";

-- DropForeignKey
ALTER TABLE "Player_Games" DROP CONSTRAINT "Player_Games_player_id_fkey";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "Player_Games";

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_games" (
    "id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,

    CONSTRAINT "player_games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_email_key" ON "player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "player_games_player_id_key" ON "player_games"("player_id");

-- AddForeignKey
ALTER TABLE "player_games" ADD CONSTRAINT "player_games_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_games" ADD CONSTRAINT "player_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
