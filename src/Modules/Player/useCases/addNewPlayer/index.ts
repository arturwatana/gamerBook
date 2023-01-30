import { GameRepositoryMemory } from "../../../../Repository/gamesRepository.memory";
import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { AddNewPlayerController } from "./addNewPlayer.controller";

const playersRepositoryMemory = PlayersRepositoryMemory.getInstance();
const gameRepositoryMemory = GameRepositoryMemory.getInstance();
const addNewPlayerController = new AddNewPlayerController(
  playersRepositoryMemory,
  gameRepositoryMemory
);

export { addNewPlayerController };
