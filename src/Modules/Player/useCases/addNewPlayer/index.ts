import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";
import { AddNewPlayerController } from "./addNewPlayer.controller";

const playersRepositoryMemory = PlayersRepositoryMemory.getInstance();
const addNewPlayerController = new AddNewPlayerController(
  playersRepositoryMemory
);

export { addNewPlayerController };
