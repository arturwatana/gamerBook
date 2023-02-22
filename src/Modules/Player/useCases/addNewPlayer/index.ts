import { GamePostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/gamePostgres.repository";
import { PlayersPostgreSQLRepository } from "../../../../Repository/postgreSQL/repositories/playerPostgres.repository";
import { GamesPrismaRepository } from "../../../../Repository/prisma/gamesRepository.prisma";
import { PlayerGamesPrismaRepository } from "../../../../Repository/prisma/playersGamesRepository.prisma";
import { PlayersPrismaRepository } from "../../../../Repository/prisma/playersRepository.prisma";
import { AddNewPlayerController } from "./addNewPlayer.controller";

const playersPostgreSQLRepository = new PlayersPostgreSQLRepository();
const gamePostgreSQLRepository = new GamePostgreSQLRepository();

const playersPrismaRepository = new PlayersPrismaRepository();
const gamesPrismaRepository = new GamesPrismaRepository();
const playersGamesPrismaRepository = new PlayerGamesPrismaRepository();

const addNewPlayerController = new AddNewPlayerController(
  playersPrismaRepository,
  gamesPrismaRepository,
  playersGamesPrismaRepository
);

export { addNewPlayerController };
