import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";

export class DeleteGameFromPlayerUseCase {
  constructor(
    private playersRepository: IPlayerRepository,
    private gameRepository: IGameRepository
  ) {}
  async execute(email: string, gameName: string) {
    const player = await this.playersRepository.findByEmail(email);
    const findedGame = await this.gameRepository.findGameByName(gameName);
    if (!player) throw new Error(`Player not found: ${email}`);
    if (!findedGame) throw new Error(`Game not found: ${gameName}`);
    const findedGameIndex = this.gameRepository.findGameByIndex(gameName);
    findedGame.players--;
    // player.games.splice(findedGameIndex, 1);

    return player;
  }
}
