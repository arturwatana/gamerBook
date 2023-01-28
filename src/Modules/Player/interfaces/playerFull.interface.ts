import { IGameRepository } from "../../../Repository/IGameRepository";

export interface IPlayerFull {
  id?: string;
  name: string;
  age: number;
  email: string;
  games: IGameRepository[];
}
