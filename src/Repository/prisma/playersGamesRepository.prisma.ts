import { Game, Player } from "@prisma/client";
import { IGame } from "../../Modules/Game/interfaces/game.inteface";
import { IPlayerFull } from "../../Modules/Player/interfaces/playerFull.interface";
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
        console.log(gamesCreated);
      });
    }
    return gamesCreated;
  }
}
