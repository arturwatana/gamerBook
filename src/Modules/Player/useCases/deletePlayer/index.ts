import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { PlayersPostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/playerPostgres.repository";
import { DeletePlayerByIdController } from "./deletePlayerById.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const playersPostgreSQLRepository = new PlayersPostgreSQLRepository();
const deletePlayerByIdContoller = new DeletePlayerByIdController(
  playersPostgreSQLRepository
);

export { deletePlayerByIdContoller };
