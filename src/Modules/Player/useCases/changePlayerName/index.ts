import { PlayersRepositoryMemory } from "../../../../Repository/InMemory/playersRepository.memory";
import { PlayersPostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/playerPostgres.repository";
import { PlayersPrismaRepository } from "../../../../Repository/prisma/playersRepository.prisma";
import { ChangePlayerNameController } from "./changePlayerName.controller";

const playersRepositoryMemory = PlayersRepositoryMemory.getInstance();
const playersPostgreSQLRepository = new PlayersPostgreSQLRepository();
const playersPrismaRepository = new PlayersPrismaRepository();
const changePlayerNameController = new ChangePlayerNameController(
  playersPrismaRepository
);

export { changePlayerNameController };
