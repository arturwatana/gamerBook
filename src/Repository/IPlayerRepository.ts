import { IGameRepository } from "./IGameRepository";

export interface IPlayerRepository {
  id?: string;
  name: string;
  age: number;
  email: string;
  games: IGameRepository[];
}
