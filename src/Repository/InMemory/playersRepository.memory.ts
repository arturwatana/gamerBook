import { Game } from "../../Modules/Game/entities/Game";
import { Player } from "../../Modules/Player/entities/Player";
import { IPlayerRepository } from "../interfaces/IPlayerRepository";

export class PlayersRepositoryMemory implements IPlayerRepository {
  players?: Player[];

  private static instance: PlayersRepositoryMemory;

  private constructor() {
    this.players = [];
  }
  vinculateGamesToPlayer(playerId: Player, games: []): Promise<Game[]> {
    throw new Error("Method not implemented.");
  }
  showAllPlayers(): Promise<Player[]> {
    throw new Error("Method not implemented.");
  }
  static getInstance() {
    if (!PlayersRepositoryMemory.instance) {
      PlayersRepositoryMemory.instance = new PlayersRepositoryMemory();
    }
    return PlayersRepositoryMemory.instance;
  }

  async save(data: Player): Promise<Player> {
    this.players?.push(data);
    return data;
  }

  async findByEmail(email: string): Promise<Player | null> {
    const findedPlayer = this.players?.find(
      (player) => player.email.toLowerCase() == email.toLowerCase()
    );
    if (findedPlayer) {
      return findedPlayer;
    }
    return null;
  }

  findIndexById(id: string) {
    const findedPlayer = this.players?.findIndex((player) => player.id == id);
    return findedPlayer ?? -1;
  }

  async deletePlayer(id: string): Promise<Player | null> {
    const playerIndex = this.findIndexById(id);
    if (this.players) {
      const findedPlayer = this.players[playerIndex];
      this.players.splice(playerIndex, 1);
      return findedPlayer;
    }

    return null;
  }
  async searchById(id: string): Promise<Player | null> {
    const findedPlayer = this.players?.find((player) => player.id == id);
    if (findedPlayer) {
      return findedPlayer;
    }
    return null;
  }

  changePlayerName(email: string, name: string): Promise<Player | null> {
    throw new Error("Method not implemented.");
  }
}
