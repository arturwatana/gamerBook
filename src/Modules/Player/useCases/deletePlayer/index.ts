import { PlayersRepositoryMemory } from "../../../../Repository/InMemory/playersRepository.memory";
import { PlayersPostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/playerPostgres.repository";
import { PlayersPrismaRepository } from "../../../../Repository/prisma/playersRepository.prisma";
import { DeletePlayerByIdController } from "./deletePlayerById.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const playersPostgreSQLRepository = new PlayersPostgreSQLRepository();
const playersPrismaRepository = new PlayersPrismaRepository();
const deletePlayerByIdContoller = new DeletePlayerByIdController(
  playersPrismaRepository
);

export { deletePlayerByIdContoller };
