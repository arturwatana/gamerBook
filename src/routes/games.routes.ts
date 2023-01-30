import { Router } from "express";
import { addGameToDataBaseController } from "../Modules/Game/useCases/addGameToDatabase";
import { GameRepositoryMemory } from "../Repository/gamesRepository.memory";

const gamesRouter = Router();
const gamesRepository = GameRepositoryMemory.getInstance();

gamesRouter.get("/games", (req, res) => {
  res.send(gamesRepository.games);
});

gamesRouter.post("/games/addgame", (req, res) => {
  addGameToDataBaseController.handle(req, res);
});

export { gamesRouter };
