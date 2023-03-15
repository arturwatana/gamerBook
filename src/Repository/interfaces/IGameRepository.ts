import { IGame } from "../../Modules/Game/interfaces/game.inteface";

export interface IGameRepository {
  save(data: IGame): Promise<IGame>;
  findGameByName(gameName: string): Promise<IGame | null>;
  showAllGames(): Promise<IGame[]>;
  updatePlayersCountOnGame(game: IGame): Promise<IGame | null>;
}
