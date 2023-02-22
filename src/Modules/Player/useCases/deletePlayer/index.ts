import { PlayersRepositoryMemory } from "../../../../Repository/InMemory/playersRepository.memory";
import { PlayersPostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/playerPostgres.repository";
import { PlayerGamesPrismaRepository } from "../../../../Repository/prisma/playersGamesRepository.prisma";
import { PlayersPrismaRepository } from "../../../../Repository/prisma/playersRepository.prisma";
import { DeletePlayerByIdController } from "./deletePlayerById.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const playersPostgreSQLRepository = new PlayersPostgreSQLRepository();

const playersPrismaRepository = new PlayersPrismaRepository();
const playerGamesPrismaRepository = new PlayerGamesPrismaRepository();

const deletePlayerByIdContoller = new DeletePlayerByIdController(
  playersPrismaRepository,
  playerGamesPrismaRepository
);

export { deletePlayerByIdContoller };
