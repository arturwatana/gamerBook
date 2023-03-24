import { Game } from "../../Modules/Game/entities/Game";
import { IGame } from "../../Modules/Game/interfaces/game.inteface";
import { Player } from "../../Modules/Player/entities/Player";
import { PlayerGame } from "../../Modules/PlayerGame/PlayerGame.entity";
import { IPlayerGamesRepository } from "../interfaces/IPlayerGamesRepository";
import { GameRepositoryMemory } from "./gamesRepository.memory";

export class PlayerGamesMemory implements IPlayerGamesRepository {
  items: PlayerGame[];

  private static instance: PlayerGamesMemory;

  constructor() {
    this.items = [];
  }

  static getInstance() {
    if (!PlayerGamesMemory.instance) {
      PlayerGamesMemory.instance = new PlayerGamesMemory();
    }
    return PlayerGamesMemory.instance;
  }

  async vinculateGamesToPlayer(props: Player, games: IGame[]): Promise<Game[]> {
    let playerGames: Game[] = [];
    const gamesRepository = GameRepositoryMemory.getInstance();
    for (let i = 0; i <= games.length; i++) {
      const playerGame = PlayerGame.create(props?.id, games[i]?.id);
      const gameAlreadyExistOnPlayer = this.items.find((gameSavedToPlayer) => {
        if (
          gameSavedToPlayer.game_id == games[i]?.id &&
          gameSavedToPlayer.player_id == props.id
        ) {
          return gameSavedToPlayer;
        }
      });
      if (gameAlreadyExistOnPlayer) {
        playerGames.push(games[i]);
      } else {
        this.items.push(playerGame);
      }
    }
    return playerGames;
  }
  deleteVinculatedGamesFromPlayer(idPlayer: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteVinculatedSingleGameFromPlayer(
    idPlayer: string,
    game: Game
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  searchGamesVinculatedToPlayer(idPlayer: string): Promise<Game[]> {
    throw new Error("Method not implemented.");
  }
}
