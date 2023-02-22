import { randomUUID } from "crypto";

export class PlayerGame {
  id: string;
  player_id: string;
  game_id: string;

  private constructor(playerId: string, gameId: string) {
    this.id = randomUUID();
    this.player_id = playerId;
    this.game_id = gameId;
  }

  static create(playerId: string, gameId: string) {
    const playerGame = new PlayerGame(playerId, gameId);
    return playerGame;
  }
}
