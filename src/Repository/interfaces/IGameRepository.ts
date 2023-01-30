import { IGameName } from "../Modules/Game/interfaces/gameName.interface";
import { Game } from "../Modules/Game/entities/Game";

export interface IGameRepository {
  save(data: Game): Game;
  findGameByName(gameName: string): Promise<Game | undefined>;
  findGameByIndex(gameName: string): number;
}
