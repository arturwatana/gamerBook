import { IGame } from "../../Modules/Game/interfaces/game.inteface";
import { IGameRepository } from "../interfaces/IGameRepository";
import { prismaClient } from "./prisma.config";

export class GamesPrismaRepository implements IGameRepository {
  async updatePlayersCountOnGame(game: IGame): Promise<IGame> {
    //Nao encontra os registros do primeiro ID
    const playersCount = await prismaClient.player_Games.findMany({
      where: {
        game_id: game.id,
      },
    });
    const gameUpdated = await prismaClient.game.update({
      where: {
        id: game.id,
      },
      data: {
        players: playersCount.length,
      },
    });
    return gameUpdated;
  }
  async save(data: IGame): Promise<IGame> {
    const gameSaved = await prismaClient.game.create({
      data: {
        id: data.id,
        name: data.name.toLowerCase(),
        players: data.players,
      },
    });
    return gameSaved;
  }
  async findGameByName(gameName: string): Promise<IGame | null> {
    const findedGame = await prismaClient.game.findFirst({
      where: {
        name: gameName.toLowerCase(),
      },
    });
    return findedGame;
  }

  async showAllGames(): Promise<IGame[]> {
    const savedGamesOnDB = await prismaClient.game.findMany();
    return savedGamesOnDB;
  }
  async findGameByIndex(gameName: string): Promise<number | null> {
    const findedGame = await prismaClient.game.findMany();
    const findedGameIndex = findedGame.findIndex(
      (game) => game.name === gameName
    );
    return findedGameIndex;
  }
}
