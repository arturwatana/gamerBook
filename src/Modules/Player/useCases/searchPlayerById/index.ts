import { PlayersRepositoryMemory } from "../../../../Repository/InMemory/playersRepository.memory";
import { PlayerGamesPrismaRepository } from "../../../../Repository/prisma/playersGamesRepository.prisma";
import { PlayersPrismaRepository } from "../../../../Repository/prisma/playersRepository.prisma";
import { SearchPlayerByIdController } from "./searchPlayerById.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();

const playersPrismaRepository = new PlayersPrismaRepository();
const playersGamesRepository = new PlayerGamesPrismaRepository();
const searchPlayerByIdController = new SearchPlayerByIdController(
  playersPrismaRepository,
  playersGamesRepository
);

export { searchPlayerByIdController };
