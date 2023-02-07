import { Router } from "express";
import { addNewPlayerController } from "../../src/Modules/Player/useCases/addNewPlayer/index";
import { searchPlayerByIdController } from "../Modules/Game/useCases/searchPlayerById";
import { addGameToPlayerController } from "../Modules/Player/useCases/addGameToPlayer";
import { changePlayerNameController } from "../Modules/Player/useCases/changePlayerName/index";
import { deleteGameFromPlayerController } from "../Modules/Player/useCases/deleteGameFromPlayer";
import { deletePlayerByIdContoller } from "../Modules/Player/useCases/deletePlayer/index";
import { PlayersPostgreSQLRepository } from "../Repository/postgreSQL/repositories/playerPostgres.repository";

const playerRouter = Router();
const postgreSQLRepository = new PlayersPostgreSQLRepository();

playerRouter.get("/players", async (req, res) => {
  const players = await postgreSQLRepository.showAllPlayers();
  res.send(players);
});
playerRouter.get("/players/:id", (req, res) => {
  searchPlayerByIdController.handle(req, res);
});

playerRouter.post("/players/addPlayer", (req, res) => {
  addNewPlayerController.handle(req, res);
});

playerRouter.post("/players/:email/addgame", (req, res) => {
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
