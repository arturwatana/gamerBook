import { IGame } from "../../Modules/Game/interfaces/game.inteface";
import { IPlayerFull } from "../../Modules/Player/interfaces/playerFull.interface";
import { PlayerGame } from "../../Modules/PlayerGame/PlayerGame.entity";

export interface IPlayerGamesRepository {
  vinculateGamesToPlayer(
    props: IPlayerFull | null,
    games: IGame[]
  ): Promise<IGame[]>;
}
