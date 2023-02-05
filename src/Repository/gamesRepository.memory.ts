import { Game } from "../Modules/Game/entities/Game";
import { IGameRepository } from "./interfaces/IGameRepository";

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
    data.name = data.name.toLowerCase();
    this.games.push(data);
    return data;
  }

  async findGameByName(gameName: string): Promise<Game | undefined> {
    const findedGame = await this.games.find((game) => {
      return game.name.toLowerCase() == gameName.toLowerCase();
    });
    return findedGame;
  }
  findGameByIndex(gameName: string): number {
    const findedGame = this.games.findIndex((game) => game.name == gameName);
    return findedGame;
  }

  verifyIfGameAlreadyExists(): void {}
}
