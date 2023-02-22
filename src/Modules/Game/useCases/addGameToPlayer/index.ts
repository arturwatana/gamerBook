import { GameRepositoryMemory } from "../../../../Repository/InMemory/gamesRepository.memory";
import { PlayersRepositoryMemory } from "../../../../Repository/InMemory/playersRepository.memory";
import { GamesPrismaRepository } from "../../../../Repository/prisma/gamesRepository.prisma";
import { PlayerGamesPrismaRepository } from "../../../../Repository/prisma/playersGamesRepository.prisma";
import { PlayersPrismaRepository } from "../../../../Repository/prisma/playersRepository.prisma";
import { AddGameToPlayerController } from "./addGameToPlayer.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const gamesRepository = GameRepositoryMemory.getInstance();

const playersPrismaRepository = new PlayersPrismaRepository();
const gamesPrismaRepository = new GamesPrismaRepository();
const playerGamesPrismaRepository = new PlayerGamesPrismaRepository();

const addGameToPlayerController = new AddGameToPlayerController(
  playersPrismaRepository,
  gamesPrismaRepository,
  playerGamesPrismaRepository
);

export { addGameToPlayerController };
