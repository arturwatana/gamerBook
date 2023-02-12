import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { SearchPlayerByIdController } from "./searchPlayerById.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const searchPlayerByIdController = new SearchPlayerByIdController(
  playersRepository
);

export { searchPlayerByIdController };
