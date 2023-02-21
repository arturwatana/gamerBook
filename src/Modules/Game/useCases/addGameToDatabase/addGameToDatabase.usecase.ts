import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";
import { Game } from "../../entities/Game";
import { IGameName } from "../../interfaces/gameName.interface";

export class AddGameToDataBaseUseCase {
  constructor(private gamesRepository: IGameRepository) {}
  async execute({ name }: IGameName) {
    const gameAlreadyExists = await this.gamesRepository.findGameByName(name);
    if (gameAlreadyExists) {
      return gameAlreadyExists;
    }
    const newGame = Game.create({ name });
    const gameSaved = this.gamesRepository.save(newGame);
    return gameSaved;
  }
}
