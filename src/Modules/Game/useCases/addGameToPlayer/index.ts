import { GameRepositoryMemory } from "../../../../Repository/gamesRepository.memory";
import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { AddGameToPlayerController } from "./addGameToPlayer.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const gamesRepository = GameRepositoryMemory.getInstance();

const addGameToPlayerController = new AddGameToPlayerController(
  playersRepository,
  gamesRepository
);

export { addGameToPlayerController };
