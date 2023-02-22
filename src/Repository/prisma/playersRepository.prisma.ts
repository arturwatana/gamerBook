import { IGame } from "../../Modules/Game/interfaces/game.inteface";
import { Player } from "../../Modules/Player/entities/Player";
import { IPlayerFull } from "../../Modules/Player/interfaces/playerFull.interface";
import { IPlayerRepository } from "../interfaces/IPlayerRepository";
import { prismaClient } from "./prisma.config";

export class PlayersPrismaRepository implements IPlayerRepository {
  async save(data: Player): Promise<Player> {
    const createdPlayer = await prismaClient.player.create({
      data: {
        id: data.id,
        name: data.name,
        age: data.age,
        password: data.password,
        email: data.email,
      },
    });
    return createdPlayer;
  }
  async findByEmail(email: string): Promise<Player | null> {
    const findedPlayer = await prismaClient.player.findUnique({
      where: {
        email,
      },
    });
    return findedPlayer;
  }
  findIndexById(id: string): number {
    throw new Error("Method not implemented.");
  }
  async deletePlayer(id: string): Promise<Player | null> {
    const deletedPlayer = await prismaClient.player.delete({
      where: {
        id,
      },
    });
    return deletedPlayer;
  }
  async searchById(id: string): Promise<Player | null> {
    const findedPlayer = await prismaClient.player.findUnique({
      where: {
        id,
      },
    });
    return findedPlayer;
  }
  async changePlayerName(email: string, name: string): Promise<Player | null> {
    const playerWithNameChanged = await prismaClient.player.update({
      where: {
        email,
      },
      data: {
        name,
      },
    });
    return playerWithNameChanged;
  }
  async showAllPlayers(): Promise<Player[]> {
    const playersInDB = await prismaClient.player.findMany();
    return playersInDB;
  }
}
