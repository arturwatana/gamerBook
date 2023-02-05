import { GameRepositoryMemory } from "../../../../Repository/gamesRepository.memory";
import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { PlayersPostgreSQLRepository } from "../../../../Repository/postgreSQL/postgres.repository";
import { AddNewPlayerController } from "./addNewPlayer.controller";

const playersRepositoryMemory = PlayersRepositoryMemory.getInstance();
const playersPostgreSQLRepository = new PlayersPostgreSQLRepository();
const gameRepositoryMemory = GameRepositoryMemory.getInstance();
const addNewPlayerController = new AddNewPlayerController(
  playersPostgreSQLRepository,
  gameRepositoryMemory
);

export { addNewPlayerController };
