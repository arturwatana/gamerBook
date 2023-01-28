import { Player } from "../Modules/Player/entities/Player";
import { IGameRepository } from "./IGameRepository";
import { IPlayerRepository } from "./IPlayerRepository";

export class PlayersRepositoryMemory implements IPlayerRepository {
  players: Player[];

  private static instance: PlayersRepositoryMemory;

  private constructor() {
    this.players = [];
  }

  static getInstance() {
    if (!PlayersRepositoryMemory.instance) {
      PlayersRepositoryMemory.instance = new PlayersRepositoryMemory();
    }
    return PlayersRepositoryMemory.instance;
  }

  save(data: Player): Player {
    this.players.push(data);
    return data;
  }

  async findByEmail(email: string) {
    const findedPlayer = this.players.find(
      (player) => player.email.toLowerCase() == email.toLowerCase()
    );
    return findedPlayer;
  }

  findIndexById(id: string) {
    const findedPlayer = this.players.findIndex((player) => player.id == id);
    return findedPlayer;
  }

  deletePlayer(playerIndex: number) {
    const player = this.players[playerIndex];
    this.players.splice(playerIndex, 1);
    return player;
  }
}
