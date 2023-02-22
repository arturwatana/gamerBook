import { Router } from "express";
import { addNewPlayerController } from "../../src/Modules/Player/useCases/addNewPlayer/index";
import { searchPlayerByIdController } from "../Modules/Player/useCases/searchPlayerById";
import { addGameToPlayerController } from "../Modules/Game/useCases/addGameToPlayer";
import { changePlayerNameController } from "../Modules/Player/useCases/changePlayerName/index";
import { deleteGameFromPlayerController } from "../Modules/Game/useCases/deleteGameFromPlayer/index";
import { deletePlayerByIdContoller } from "../Modules/Player/useCases/deletePlayer/index";
import { PlayersPostgreSQLRepository } from "../Repository/postgreSQL/repositories/playerPostgres.repository";
import { PlayersPrismaRepository } from "../Repository/prisma/playersRepository.prisma";

const playerRouter = Router();
const postgreSQLRepository = new PlayersPostgreSQLRepository();
const playersPrismaRepository = new PlayersPrismaRepository();

playerRouter.get("/players", async (req, res) => {
  const players = await playersPrismaRepository.showAllPlayers();
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

playerRouter.delete("/players/:email/removegame", (req, res) => {
  deleteGameFromPlayerController.handle(req, res);
});

playerRouter.put("/players/:email/changename", (req, res) => {
  changePlayerNameController.handle(req, res);
});

playerRouter.delete("/players/:id/deleteplayer", (req, res) => {
  deletePlayerByIdContoller.handle(req, res);
});

export { playerRouter };
