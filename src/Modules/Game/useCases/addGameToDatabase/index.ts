import { GameRepositoryMemory } from "../../../../Repository/gamesRepository.memory";
import { GamePostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/gamePostgres.repository";
import { AddGameToDataBaseController } from "./addGameToDatabase.controller";

const gameRepository = GameRepositoryMemory.getInstance();
const gamePostgreSQLRepository = new GamePostgreSQLRepository();
const addGameToDataBaseController = new AddGameToDataBaseController(
  gamePostgreSQLRepository
);

export { addGameToDataBaseController };
