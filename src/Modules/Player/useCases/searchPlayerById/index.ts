import { PlayersRepositoryMemory } from "../../../../Repository/InMemory/playersRepository.memory";
import { PlayersPrismaRepository } from "../../../../Repository/prisma/playersRepository.prisma";
import { SearchPlayerByIdController } from "./searchPlayerById.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const playersPrismaRepository = new PlayersPrismaRepository();
const searchPlayerByIdController = new SearchPlayerByIdController(
  playersPrismaRepository
);

export { searchPlayerByIdController };
