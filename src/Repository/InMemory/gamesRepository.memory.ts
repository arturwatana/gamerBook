import { Game } from "../../Modules/Game/entities/Game";
import { IGameRepository } from "../interfaces/IGameRepository";

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

  async save(data: Game): Promise<Game> {
    data.name = data.name.toLowerCase();
    this.games?.push(data);
    return data;
  }

  async findGameByName(gameName: string): Promise<Game | null> {
    const findedGame = await this.games?.find((game) => {
      return game.name.toLowerCase() == gameName.toLowerCase();
    });
    return findedGame || null;
  }

  async updatePlayersCountOnGame(idGame: string): Promise<Game | null> {
    const findedGame = await this.games?.find((game) => game.id == idGame);
    if (findedGame) {
      findedGame.players++;
      return findedGame;
    } else {
      return null;
    }
  }
  async showAllGames(): Promise<Game[]> {
    return this.games;
  }
}
