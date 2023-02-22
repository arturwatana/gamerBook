import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";
import { Game, gameNameType } from "../../entities/Game";

export class AddGameToDataBaseUseCase {
  constructor(private gamesRepository: IGameRepository) {}
  async execute({ name }: gameNameType) {
    const gameAlreadyExists = await this.gamesRepository.findGameByName(name);
    if (gameAlreadyExists) {
      return gameAlreadyExists;
    }
    const newGame = Game.create({ name });
    const gameSaved = this.gamesRepository.save(newGame);
    return gameSaved;
  }
}
