import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";
import { IPlayerGamesRepository } from "../../../../Repository/interfaces/IPlayerGamesRepository";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { Game } from "../../entities/Game";

export class AddGameToPlayerUseCase {
  constructor(
    private playerRepository: IPlayerRepository,
    private gameRepository: IGameRepository,
    private playerGamesRepository: IPlayerGamesRepository
  ) {}
  async execute(name: string, email: string) {
    const findedPlayerInDB = await this.playerRepository.findByEmail(email);
    if (!findedPlayerInDB) {
      throw new Error("Player not found by email: " + email);
    }
    const gameAlreadyExistsOnDB = await this.gameRepository.findGameByName(
      name
    );
    console.log(gameAlreadyExistsOnDB);
    let gameArray: Game[] = [];
    if (gameAlreadyExistsOnDB) {
      gameArray.push(gameAlreadyExistsOnDB);
    } else {
      const game = Game.create({ name });
      game.players++;
      const savedGameInDB = await this.gameRepository.save(game);
      gameArray.push(savedGameInDB);
    }
    await this.playerGamesRepository.vinculateGamesToPlayer(
      findedPlayerInDB,
      gameArray
    );
    const playerGames =
      await this.playerGamesRepository.searchGamesVinculatedToPlayer(
        findedPlayerInDB.id
      );
    const player = {
      ...findedPlayerInDB,
      playerGames,
    };
    return player;
  }
}
