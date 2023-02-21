import { GamePostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/gamePostgres.repository";
import { PlayersPostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/playerPostgres.repository";
import { GamesPrismaRepository } from "../../../../Repository/prisma/gamesRepository.prisma";
import { PlayerGamesPrismaRepository } from "../../../../Repository/prisma/playersGamesRepository.prisma";
import { PlayersPrismaRepository } from "../../../../Repository/prisma/playersRepository.prisma";
import { AddNewPlayerController } from "./addNewPlayer.controller";

const playersPostgreSQLRepository = new PlayersPostgreSQLRepository();
const playersPrismaRepository = new PlayersPrismaRepository();
const gamePostgreSQLRepository = new GamePostgreSQLRepository();
const gamesPrismaRepository = new GamesPrismaRepository();
const playersGamesPrismaRepository = new PlayerGamesPrismaRepository();
const addNewPlayerController = new AddNewPlayerController(
  playersPrismaRepository,
  gamesPrismaRepository,
  playersGamesPrismaRepository
);

export { addNewPlayerController };
