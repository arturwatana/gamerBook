import { Game } from "../Modules/Game/entities/Game";
import { IGameRepository } from "./interfaces/IGameRepository";

export class GameRepositoryMemory implements IGameRepository {
  games?: Game[];

  private static instance: GameRepositoryMemory;

  private constructor() {
    this.games = [];
  }
  showAllGames(): Promise<Game[]> {
    throw new Error("Method not implemented.");
  }

  static getInstance() {
    if (!GameRepositoryMemory.instance) {
      GameRepositoryMemory.instance = new GameRepositoryMemory();
    }
    return GameRepositoryMemory.instance;
  }

  async save(data: Game): Promise<Game> {
    data.name = data.name.toLowerCase();
    this.games?.push(data);
    return data;
  }

  async findGameByName(gameName: string): Promise<Game | undefined> {
    const findedGame = await this.games?.find((game) => {
      return game.name.toLowerCase() == gameName.toLowerCase();
    });
    return findedGame;
  }
  findGameByIndex(gameName: string): number {
    if (this.games) {
    }
    return this.games
      ? this.games.findIndex((game) => game.name == gameName)
      : -1;
  }
}
