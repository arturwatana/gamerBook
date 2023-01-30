import { GameRepositoryMemory } from "../../../../Repository/gamesRepository.memory";
import { AddGameToDataBaseController } from "./addGameToDatabase.controller";

const gameRepository = GameRepositoryMemory.getInstance();
const addGameToDataBaseController = new AddGameToDataBaseController(
  gameRepository
);

export { addGameToDataBaseController };
