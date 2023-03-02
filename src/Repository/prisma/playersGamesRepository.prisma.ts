import { Game } from "../../Modules/Game/entities/Game";
import { IGame } from "../../Modules/Game/interfaces/game.inteface";
import { Player } from "../../Modules/Player/entities/Player";
import { PlayerGame } from "../../Modules/PlayerGame/PlayerGame.entity";
import { IPlayerGamesRepository } from "../interfaces/IPlayerGamesRepository";
import { prismaClient } from "./prisma.config";

export class PlayerGamesPrismaRepository implements IPlayerGamesRepository {
  async vinculateGamesToPlayer(
    props: Player | null,
    games: IGame[]
  ): Promise<IGame[]> {
    const gamesCreated: Game[] = [];
    if (props) {
      games.map(async (game) => {
        const playerGame = PlayerGame.create(props.id, game.id);
        const gameAlreadyExistOnPlayer =
          await prismaClient.player_Games.findFirst({
            where: {
              game_id: game.id,
            },
          });
        if (gameAlreadyExistOnPlayer) {
          return;
        }
        const gameCreated = await prismaClient.player_Games.create({
          data: {
            id: playerGame.id,
            player_id: playerGame.player_id,
            game_id: playerGame.game_id,
          },
        });
        const gameCreatedInDB = await prismaClient.game.findFirst({
          where: {
            id: gameCreated.id,
          },
        });
        if (gameCreatedInDB) {
          gamesCreated.push(gameCreatedInDB);
          return;
        }
      });
    }
    return gamesCreated;
  }

  async deleteVinculatedGamesFromPlayer(idPlayer: string): Promise<void> {
    await prismaClient.player_Games.deleteMany({
      where: {
        player_id: idPlayer,
      },
    });
  }

  async deleteVinculatedSingleGameFromPlayer(
    idPlayer: string,
    game: Game
  ): Promise<void> {
    await prismaClient.player_Games.deleteMany({
      where: {
        player_id: idPlayer,
        game_id: game.id,
      },
    });
  }

  async searchGamesVinculatedToPlayer(idPlayer: string): Promise<Game[]> {
    const playerGamesInDB = await prismaClient.player_Games.findMany({
      where: {
        player_id: idPlayer,
      },
    });
    const playerGames: Game[] = [];
    for (let i = 0; i < playerGamesInDB.length; i++) {
      const findedGameInDB = await prismaClient.game.findFirst({
        where: {
          id: playerGamesInDB[i].game_id,
        },
      });
      if (findedGameInDB) {
        playerGames.push(findedGameInDB);
      }
    }
    return playerGames;
  }
}
