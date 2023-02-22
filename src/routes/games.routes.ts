import { Router } from "express";
import { addGameToDataBaseController } from "../Modules/Game/useCases/addGameToDatabase";
import { GamePostgreSQLRepository } from "../Repository/postgreSQL/repositories/gamePostgres.repository";
import { GamesPrismaRepository } from "../Repository/prisma/gamesRepository.prisma";

const gamesRouter = Router();
const gamesPostgreSQLRepository = new GamePostgreSQLRepository();
const gamesPrismaRepository = new GamesPrismaRepository();

gamesRouter.get("/games", async (req, res) => {
  const games = await gamesPrismaRepository.showAllGames();
  res.send(games);
});

gamesRouter.post("/games/addgame", (req, res) => {
  addGameToDataBaseController.handle(req, res);
});

export { gamesRouter };
