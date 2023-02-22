import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";
import { IPlayerGamesRepository } from "../../../../Repository/interfaces/IPlayerGamesRepository";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";

export class DeleteGameFromPlayerUseCase {
  constructor(
    private playersRepository: IPlayerRepository,
    private gameRepository: IGameRepository,
    private playerGamesRepository: IPlayerGamesRepository
  ) {}
  async execute(email: string, gameName: string) {
    const player = await this.playersRepository.findByEmail(email);
    const findedGame = await this.gameRepository.findGameByName(gameName);
    if (!player) throw new Error(`Player not found: ${email}`);
    if (!findedGame) throw new Error(`Game not found: ${gameName}`);
    await this.playerGamesRepository.deleteVinculatedSingleGameFromPlayer(
      player.id,
      findedGame
    );

    return player;
  }
}
