import { Game } from "../Modules/Game/entities/Game";
import { IGameRepository } from "./IGameRepository";
import { IPlayerRepository } from "./IPlayerRepository";

export class GameRepositoryMemory implements IGameRepository {
  games: Game[];

  private static instance: GameRepositoryMemory;

  private constructor() {
    this.games = [];
  }

  static getInstance() {
    if (!GameRepositoryMemory.instance) {
      GameRepositoryMemory.instance = new GameRepositoryMemory();
    }
    return GameRepositoryMemory.instance;
  }

  save(data: Game): Game {
    this.games.push(data);
    return data;
  }

  async findGameByName(gameName: string): Promise<Game | undefined> {
    const findedGame = await this.games.find((game) => game.name == gameName);
    return findedGame;
  }
  findGameByIndex(gameName: string): number {
    const findedGame = this.games.findIndex((game) => game.name == gameName);
    return findedGame;
  }
}
