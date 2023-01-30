import { Router } from "express";
import { addNewPlayerController } from "../../src/Modules/Player/useCases/addNewPlayer/index";
import { searchPlayerByIdController } from "../Modules/Game/useCases/searchPlayerById";
import { addGameToPlayerController } from "../Modules/Player/useCases/addGameToPlayer";
import { changePlayerNameController } from "../Modules/Player/useCases/changePlayerName/index";
import { deleteGameFromPlayerController } from "../Modules/Player/useCases/deleteGameFromPlayer";
import { deletePlayerByIdContoller } from "../Modules/Player/useCases/deletePlayer/index";
import { PlayersRepositoryMemory } from "../Repository/playersRepository.memory";

const playerRouter = Router();
const playersRepositoryMemory = PlayersRepositoryMemory.getInstance();

playerRouter.get("/players", (req, res) => {
  res.send(playersRepositoryMemory.players);
});
playerRouter.get("/players/:id", (req, res) => {
  searchPlayerByIdController.handle(req, res);
});

playerRouter.post("/players/addPlayer", async (req, res) => {
  await addNewPlayerController.handle(req, res);
});

playerRouter.post("/players/:id/addgame", (req, res) => {
  addGameToPlayerController.handle(req, res);
});

playerRouter.put("/players/:email/removegame", (req, res) => {
  deleteGameFromPlayerController.handle(req, res);
});

playerRouter.put("/players/:email/changename", (req, res) => {
  changePlayerNameController.handle(req, res);
});

playerRouter.delete("/players/:id/deleteplayer", (req, res) => {
  deletePlayerByIdContoller.handle(req, res);
});

export { playerRouter };
