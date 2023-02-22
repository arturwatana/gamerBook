import { Game, Player } from "@prisma/client";
import { IGame } from "../../Modules/Game/interfaces/game.inteface";

export interface IPlayerGamesRepository {
  vinculateGamesToPlayer(
    props: Player | null,
    games: IGame[]
  ): Promise<IGame[]>;
  deleteVinculatedGamesFromPlayer(idPlayer: string): Promise<void>;
  deleteVinculatedSingleGameFromPlayer(
    idPlayer: string,
    game: Game
  ): Promise<void>;
}
