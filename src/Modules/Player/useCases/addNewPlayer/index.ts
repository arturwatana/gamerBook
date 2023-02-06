import { GameRepositoryMemory } from "../../../../Repository/gamesRepository.memory";
import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { GamePostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/gamePostgres.repository";
import { PlayersPostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/postgres.repository";
import { AddNewPlayerController } from "./addNewPlayer.controller";

const playersRepositoryMemory = PlayersRepositoryMemory.getInstance();
const gameRepositoryMemory = GameRepositoryMemory.getInstance();
const playersPostgreSQLRepository = new PlayersPostgreSQLRepository();
const gamePostgreSQLRepository = new GamePostgreSQLRepository();
const addNewPlayerController = new AddNewPlayerController(
  playersPostgreSQLRepository,
  gamePostgreSQLRepository
);

export { addNewPlayerController };
