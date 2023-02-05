import { Player } from "../Modules/Player/entities/Player";
import { IPlayerRepository } from "./interfaces/IPlayerRepository";

export class PlayersRepositoryMemory implements IPlayerRepository {
  players?: Player[];

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

  async save(data: Player): Promise<Player | undefined> {
    this.players?.push(data);
    return data;
  }

  async findByEmail(email: string): Promise<Player | undefined> {
    const findedPlayer = this.players?.find(
      (player) => player.email.toLowerCase() == email.toLowerCase()
    );
    return findedPlayer;
  }

  findIndexById(id: string) {
    const findedPlayer = this.players?.findIndex((player) => player.id == id);
    return findedPlayer ?? -1;
  }

  async deletePlayer(id: string): Promise<Player | undefined> {
    const playerIndex = this.findIndexById(id);
    if (this.players) {
      const findedPlayer = this.players[playerIndex];
      this.players.splice(playerIndex, 1);
      return findedPlayer;
    }

    return undefined;
  }
  async searchById(id: string): Promise<Player | undefined> {
    const findedPlayer = this.players?.find((player) => player.id == id);
    return findedPlayer;
  }

  changePlayerName(email: string, name: string): Promise<Player | undefined> {
    throw new Error("Method not implemented.");
  }
}
