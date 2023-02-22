import { Game } from "../../Modules/Game/entities/Game";

export interface IGameRepository {
  save(data: Game): Promise<Game>;
  findGameByName(gameName: string): Promise<Game | null>;
  showAllGames(): Promise<Game[]>;
  updatePlayersCountOnGame(idGame: string): Promise<Game | null>;
}
