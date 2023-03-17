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
    const gamesVinculated: Game[] = [];
    if (props) {
      for (let i = 0; i <= games.length - 1; i++) {
        const playerGame = PlayerGame.create(props.id, games[i].id);
        const gameAlreadyExistOnPlayer =
          await prismaClient.player_Games.findFirst({
            where: {
              game_id: games[i].id,
              player_id: playerGame.player_id,
            },
          });
        if (!gameAlreadyExistOnPlayer) {
          const gameCreated = await prismaClient.player_Games.create({
            data: {
              id: playerGame.id,
              player_id: playerGame.player_id,
              game_id: playerGame.game_id,
            },
          });
          const gameVinculatedToPlayer = await prismaClient.game.findFirst({
            where: {
              id: gameCreated.id,
            },
          });
          if (gameVinculatedToPlayer) {
            gamesVinculated.push(gameVinculatedToPlayer);
          }
        }
      }
    }
    return gamesVinculated;
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
