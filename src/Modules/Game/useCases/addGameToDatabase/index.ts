import { GameRepositoryMemory } from "../../../../Repository/InMemory/gamesRepository.memory";

import { GamePostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/gamePostgres.repository";
import { GamesPrismaRepository } from "../../../../Repository/prisma/gamesRepository.prisma";
import { AddGameToDataBaseController } from "./addGameToDatabase.controller";

const gameRepository = GameRepositoryMemory.getInstance();
const gamePostgreSQLRepository = new GamePostgreSQLRepository();
const gamesPrismaRepository = new GamesPrismaRepository();
const addGameToDataBaseController = new AddGameToDataBaseController(
  gamesPrismaRepository
);

export { addGameToDataBaseController };
