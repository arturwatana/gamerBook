import { IGameRepository } from "../../../../Repository/IGameRepository";
import { IPlayerRepository } from "../../../../Repository/IPlayerRepository";
import { Game } from "../../../Game/entities/Game";

export class AddGameToPlayerUseCase {
  constructor(
    private playerRepository: IPlayerRepository,
    private gameRepository: IGameRepository
  ) {}
  async execute(name: string, id: string) {
    const player = await this.playerRepository.searchById(id);
    const findedGame = await this.gameRepository.findGameByName(name);

    if (!player) {
      throw new Error("Player not found by id: " + id);
    }
    if (findedGame) {
      findedGame.players++;
      player?.games.push(findedGame);
      return player;
    } else {
      const game = Game.create({ name });
      game.players++;
      this.gameRepository.save(game);
      player?.games.push(game);
      return player;
    }
  }
}
