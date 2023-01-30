import { GameRepositoryMemory } from "../../../../Repository/gamesRepository.memory";
import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { DeleteGameFromPlayerController } from "./deleteGameFromPlayer.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const gameRepository = GameRepositoryMemory.getInstance();

const deleteGameFromPlayerController = new DeleteGameFromPlayerController(
  playersRepository,
  gameRepository
);

export { deleteGameFromPlayerController };
