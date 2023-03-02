import { Game } from "../../Modules/Game/entities/Game";
import { IGame } from "../../Modules/Game/interfaces/game.inteface";
import { Player } from "../../Modules/Player/entities/Player";
import { PlayerGame } from "../../Modules/PlayerGame/PlayerGame.entity";

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
  searchGamesVinculatedToPlayer(idPlayer: string): Promise<Game[]>;
}
