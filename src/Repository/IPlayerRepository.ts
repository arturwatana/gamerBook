import { Player } from "../Modules/Player/entities/Player";

export interface IPlayerRepository {
  save(data: Player): void;
  findByEmail(email: string): Promise<Player | undefined>;
  findIndexById(id: string): number;
  deletePlayer(player: number): Player;
}
