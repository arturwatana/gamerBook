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
    if (!player) throw new Error(`Player not found: ${email}`);
    const playerGames =
      await this.playerGamesRepository.searchGamesVinculatedToPlayer(player.id);
    const findedGame = playerGames.find((game) => game.name === gameName);
    if (!findedGame) throw new Error(`Game not found: ${gameName} in ${email}`);
    await this.playerGamesRepository.deleteVinculatedSingleGameFromPlayer(
      player.id,
      findedGame
    );
    await this.gameRepository.updatePlayersCountOnGame(findedGame);
    return { ...player, playerGames };
  }
}
