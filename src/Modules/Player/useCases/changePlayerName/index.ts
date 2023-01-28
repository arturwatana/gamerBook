import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { ChangePlayerNameController } from "./changePlayerName.controller";

const playersRepositoryMemory = PlayersRepositoryMemory.getInstance();
const changePlayerNameController = new ChangePlayerNameController(
  playersRepositoryMemory
);

export { changePlayerNameController };
