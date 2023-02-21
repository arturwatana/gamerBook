import { GameRepositoryMemory } from "../../../../Repository/InMemory/gamesRepository.memory";
import { PlayersRepositoryMemory } from "../../../../Repository/InMemory/playersRepository.memory";
import { DeleteGameFromPlayerController } from "./deleteGameFromPlayer.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const gameRepository = GameRepositoryMemory.getInstance();

const deleteGameFromPlayerController = new DeleteGameFromPlayerController(
  playersRepository,
  gameRepository
);

export { deleteGameFromPlayerController };
