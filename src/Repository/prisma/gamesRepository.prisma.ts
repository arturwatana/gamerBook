import { Game } from "../../Modules/Game/entities/Game";
import { IGameRepository } from "../interfaces/IGameRepository";
import { prismaClient } from "./prisma.config";

export class GamesPrismaRepository implements IGameRepository {
  async updatePlayersCountOnGame(idGame: string): Promise<Game> {
    const playersWithGame = await prismaClient.player_Games.findMany({
      where: {
        game_id: idGame,
      },
    });
    const gameUpdated = await prismaClient.game.update({
      where: {
        id: idGame,
      },
      data: {
        players: playersWithGame.length,
      },
    });
    return gameUpdated;
  }

  async save(data: Game): Promise<Game> {
    const gameSaved = await prismaClient.game.create({
      data: {
        id: data.id,
        name: data.name.toLowerCase(),
        players: data.players,
      },
    });
    return gameSaved;
  }
  async findGameByName(gameName: string): Promise<Game | null> {
    const findedGame = await prismaClient.game.findFirst({
      where: {
        name: gameName.toLowerCase(),
      },
    });
    return findedGame;
  }

  async showAllGames(): Promise<Game[]> {
    const savedGamesOnDB = await prismaClient.game.findMany();
    return savedGamesOnDB;
  }
  async findGameByIndex(gameName: string): Promise<Game | null> {
    throw new Error(`Could not find`);
  }
}
