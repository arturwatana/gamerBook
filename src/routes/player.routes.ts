import { Router } from "express";

// import { addGameToPlayer } from "../../src/Modules/Game/useCases/addGameToPlayer";
import { addNewPlayerController } from "../../src/Modules/Player/useCases/addNewPlayer/index";
// import { deleteGameFromPlayer } from "../../src/Modules/Game/useCases/deleteGameFromPlayer";
// import { searchById } from "../../src/Modules/Player/useCases/searchById";
// import { changePlayerName } from "../../src/Modules/Player/useCases/changePlayerName";
// import { deletePlayer } from "../../src/Modules/Player/useCases/deletePlayer";
import { IPlayerRepository } from "../../src/Repository/IPlayerRepository";
import { changePlayerNameController } from "../Modules/Player/useCases/changePlayerName/index";
import { deletePlayerByIdContoller } from "../Modules/Player/useCases/deletePlayer/index";
import { PlayersRepositoryMemory } from "../Repository/playersRepository.memory";

type Error = {
  message: string;
};

const playerRouter = Router();
const playersRepositoryMemory = PlayersRepositoryMemory.getInstance();

playerRouter.get("/players", (req, res) => {
  res.send(playersRepositoryMemory.players);
});
playerRouter.get("/players/:id", (req, res) => {
  try {
    const { id } = req.params;
    // const player = searchById(id, playersRepository);
    // res.json(player);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

playerRouter.post("/players/addPlayer", async (req, res) => {
  await addNewPlayerController.handle(req, res);
});

playerRouter.post("/players/:id/addgame", (req, res) => {
  try {
    const { id } = req.params;
    const game = req.body;
    // const newPlayer = addGameToPlayer(game, id, playersRepository);
    // res.send(newPlayer);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

playerRouter.put("/players/:email/removegame", (req, res) => {
  try {
    const { email } = req.params;
    const game = req.body;
    // const newPlayer = deleteGameFromPlayer(email, game, playersRepository);
    // res.send(newPlayer);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

playerRouter.put("/players/:email/changename", (req, res) => {
  changePlayerNameController.handle(req, res);
});

playerRouter.delete("/players/:id/deleteplayer", (req, res) => {
  deletePlayerByIdContoller.handle(req, res);
});

export { playerRouter };
