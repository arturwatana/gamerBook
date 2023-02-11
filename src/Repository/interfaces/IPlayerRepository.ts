import { Game } from "../../Modules/Game/entities/Game";
import { IGame } from "../../Modules/Game/interfaces/game.inteface";
import { Player } from "../../Modules/Player/entities/Player";
import { IPlayerFull } from "../../Modules/Player/interfaces/playerFull.interface";

export interface IPlayerRepository {
  save(data: Player): Promise<Player | undefined>;
  findByEmail(email: string): Promise<Player | undefined>;
  findIndexById(id: string): number;
  deletePlayer(id: string): Promise<Player | undefined>;
  searchById(id: string): Promise<Player | undefined>;
  changePlayerName(email: string, name: string): Promise<Player | undefined>;
  showAllPlayers(): Promise<Player[]>;
  vinculateGamesToPlayer(
    props: IPlayerFull | undefined,
    games: IGame[]
  ): Promise<IGame[]>;
}
