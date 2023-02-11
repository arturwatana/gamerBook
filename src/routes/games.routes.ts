import { Router } from "express";
import { addGameToDataBaseController } from "../Modules/Game/useCases/addGameToDatabase";
import { GamePostgreSQLRepository } from "../Repository/postgreSQL/repositories/gamePostgres.repository";

const gamesRouter = Router();
const gamesPostgreSQLRepository = new GamePostgreSQLRepository();

gamesRouter.get("/games", async (req, res) => {
  const games = await gamesPostgreSQLRepository.showAllGames();
  res.send(games);
});

gamesRouter.post("/games/addgame", (req, res) => {
  addGameToDataBaseController.handle(req, res);
});

export { gamesRouter };
