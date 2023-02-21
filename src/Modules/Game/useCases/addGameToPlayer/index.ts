import { GameRepositoryMemory } from "../../../../Repository/InMemory/gamesRepository.memory";
import { PlayersRepositoryMemory } from "../../../../Repository/InMemory/playersRepository.memory";
import { AddGameToPlayerController } from "./addGameToPlayer.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const gamesRepository = GameRepositoryMemory.getInstance();

const addGameToPlayerController = new AddGameToPlayerController(
  playersRepository,
  gamesRepository
);

export { addGameToPlayerController };
