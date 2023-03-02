import { IPlayerGamesRepository } from "../../../../Repository/interfaces/IPlayerGamesRepository";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { Game } from "../../../Game/entities/Game";

export class SearchPlayerByIdUseCase {
  constructor(
    private playersRepository: IPlayerRepository,
    private playersGamesRepository: IPlayerGamesRepository
  ) {}
  async execute(id: string) {
    const findedPlayerInDB = await this.playersRepository.searchById(id);
    if (!findedPlayerInDB) {
      throw new Error(`Player ${id} not found`);
    }
    const playerGames: Game[] =
      await this.playersGamesRepository.searchGamesVinculatedToPlayer(
        findedPlayerInDB.id
      );
    const player = {
      ...findedPlayerInDB,
      playerGames,
    };
    return player;
  }
}
