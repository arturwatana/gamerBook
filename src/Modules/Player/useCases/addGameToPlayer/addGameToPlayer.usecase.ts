import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { Game } from "../../../Game/entities/Game";

export class AddGameToPlayerUseCase {
  constructor(
    private playerRepository: IPlayerRepository,
    private gameRepository: IGameRepository
  ) {}
  async execute(name: string, email: string) {
    const player = await this.playerRepository.findByEmail(email);

    if (!player) {
      throw new Error("Player not found by email: " + email);
    }
    const gameIntoPlayer = player.games.find(
      (game: Game) => game.name === name
    );
    if (gameIntoPlayer) {
      throw new Error("Game already exists on : " + player.name);
    }
    const game = Game.create({ name });
    game.players++;
    this.gameRepository.save(game);
    player?.games.push(game);
    return player;
  }
}
