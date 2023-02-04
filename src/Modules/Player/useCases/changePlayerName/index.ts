import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { PlayersPostgreSQLRepository } from "../../../../Repository/postgreSQL/postgres.repository";
import { ChangePlayerNameController } from "./changePlayerName.controller";

const playersRepositoryMemory = PlayersRepositoryMemory.getInstance();
const playersPostgreSQLRepository = new PlayersPostgreSQLRepository();
const changePlayerNameController = new ChangePlayerNameController(
  playersPostgreSQLRepository
);

export { changePlayerNameController };
