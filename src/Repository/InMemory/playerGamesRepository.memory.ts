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
  async deleteVinculatedGamesFromPlayer(idPlayer: string): Promise<void> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].player_id === idPlayer) {
        this.items.slice(i, 1);
      }
    }
  }
  async deleteVinculatedSingleGameFromPlayer(
    idPlayer: string,
    game: Game
  ): Promise<void> {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].player_id === idPlayer &&
        this.items[i].game_id === game.id
      ) {
        this.items.slice(i, 1);
      }
    }
  }
  async searchGamesVinculatedToPlayer(idPlayer: string): Promise<Game[]> {
    const playerGamesInDB = this.items.filter(
      (item) => item.player_id === idPlayer
    );
    const gamesRepository = GameRepositoryMemory.getInstance();
    const playerGames: Game[] = [];
    for (let i = 0; i <= playerGamesInDB.length; i++) {
      const findedGameInDB = gamesRepository.games.find(
        (game) => game.id === playerGamesInDB[i].game_id
      );
      if (findedGameInDB) {
        playerGames.push(findedGameInDB);
      }
    }
    return playerGames;
  }
}
