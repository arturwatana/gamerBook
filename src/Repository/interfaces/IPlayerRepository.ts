import { Player } from "../../Modules/Player/entities/Player";

export interface IPlayerRepository {
  save(data: Player): Promise<Player>;
  findByEmail(email: string): Promise<Player | null>;
  deletePlayer(id: string): Promise<Player | null>;
  searchById(id: string): Promise<Player | null>;
  changePlayerName(email: string, name: string): Promise<Player | null>;
  showAllPlayers(): Promise<Player[]>;
}
