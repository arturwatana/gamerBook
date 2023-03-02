import { IPlayerGamesRepository } from "../../../../Repository/interfaces/IPlayerGamesRepository";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { Player } from "../../entities/Player";

export class DeletePlayerByIdUseCase {
  constructor(
    private playersRepository: IPlayerRepository,
    private playerGamesRepository: IPlayerGamesRepository
  ) {}

  async execute(id: string) {
    const idIsValid = Player.idIsValid(id);
    if (!idIsValid) {
      throw new Error("Player not found by id: " + id);
    }
    const player = await this.playersRepository.searchById(id);
    if (!player) {
      throw new Error("Player not found by id: " + id);
    }
    const playerGames =
      await this.playerGamesRepository.searchGamesVinculatedToPlayer(player.id);
    await this.playerGamesRepository.deleteVinculatedGamesFromPlayer(player.id);
    const deletedPlayerinDb = await this.playersRepository.deletePlayer(id);
    const deletedPlayer = {
      ...deletedPlayerinDb,
      playerGames,
    };
    return deletedPlayer;
  }
}
