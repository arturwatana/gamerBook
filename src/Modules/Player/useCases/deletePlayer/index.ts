import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { Player } from "../../entities/Player";
import { DeletePlayerByIdController } from "./deletePlayerById.controller";

const playersRepository = PlayersRepositoryMemory.getInstance();
const deletePlayerByIdContoller = new DeletePlayerByIdController(
  playersRepository
);

export { deletePlayerByIdContoller };
