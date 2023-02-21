import { Game } from "../../Modules/Game/entities/Game";
import { IGame } from "../../Modules/Game/interfaces/game.inteface";
import { Player } from "../../Modules/Player/entities/Player";
import { IPlayerFull } from "../../Modules/Player/interfaces/playerFull.interface";

export interface IPlayerRepository {
  save(data: Player): Promise<Player>;
  findByEmail(email: string): Promise<Player | null>;
  findIndexById(id: string): number;
  deletePlayer(id: string): Promise<Player | null>;
  searchById(id: string): Promise<Player | null>;
  changePlayerName(email: string, name: string): Promise<Player | null>;
  showAllPlayers(): Promise<Player[]>;
}
