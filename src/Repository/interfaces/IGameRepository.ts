import { Game } from "../../Modules/Game/entities/Game";

export interface IGameRepository {
  save(data: Game): Promise<Game>;
  findGameByName(gameName: string): Promise<Game | undefined>;
  findGameByIndex(gameName: string): number;
  showAllGames(): Promise<Game[]>;
}
