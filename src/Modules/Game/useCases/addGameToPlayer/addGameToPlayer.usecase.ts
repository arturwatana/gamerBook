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
    const player = await this.playerRepository.findByEmail(email);
    if (!player) {
      throw new Error("Player not found by email: " + email);
    }
    const gameAlreadyExistsOnDB = await this.gameRepository.findGameByName(
      name
    );
    if (gameAlreadyExistsOnDB) {
      gameAlreadyExistsOnDB.players++;
      return player;
    }
    const game = Game.create({ name });
    game.players++;
    let gameArray: Game[] = [];
    const savedGameInDB = await this.gameRepository.save(game);
    gameArray.push(savedGameInDB);
    await this.playerGamesRepository.vinculateGamesToPlayer(player, gameArray);
    return player;
  }
}
