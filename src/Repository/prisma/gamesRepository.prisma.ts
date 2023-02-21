import { Game } from "../../Modules/Game/entities/Game";
import { IGameRepository } from "../interfaces/IGameRepository";
import { prismaClient } from "./prisma.config";

export class GamesPrismaRepository implements IGameRepository {
  async save(data: Game): Promise<Game> {
    const gameSaved = await prismaClient.game.create({
      data: {
        id: data.id,
        name: data.name,
        players: data.players,
      },
    });
    return gameSaved;
  }
  async findGameByName(gameName: string): Promise<Game | undefined> {
    const findedGame = await prismaClient.game.findFirst({
      where: {
        name: gameName,
      },
    });
    return findedGame || undefined;
  }
  findGameByIndex(gameName: string): number {
    throw new Error("Method not implemented.");
  }
  showAllGames(): Promise<Game[]> {
    throw new Error("Method not implemented.");
  }
}
