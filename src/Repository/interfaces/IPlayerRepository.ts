import { Player } from "../../Modules/Player/entities/Player";

export interface IPlayerRepository {
  save(data: Player): Promise<Player | undefined>;
  findByEmail(email: string): Promise<Player | undefined>;
  findIndexById(id: string): number;
  deletePlayer(id: string): Promise<Player>;
  searchById(id: string): Promise<Player | undefined>;
  changePlayerName(email: string, name: string): Promise<Player | undefined>;
}
