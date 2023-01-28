import { IGameName } from "../Modules/Game/interfaces/gameName.interface";

export interface IGameRepository {
  id?: string;
  name: IGameName;
  players: number;
}
