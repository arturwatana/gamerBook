import { GamePostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/gamePostgres.repository";
import { PlayersPostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/playerPostgres.repository";
import { AddNewPlayerController } from "./addNewPlayer.controller";

const playersPostgreSQLRepository = new PlayersPostgreSQLRepository();
const gamePostgreSQLRepository = new GamePostgreSQLRepository();
const addNewPlayerController = new AddNewPlayerController(
  playersPostgreSQLRepository,
  gamePostgreSQLRepository
);

export { addNewPlayerController };
