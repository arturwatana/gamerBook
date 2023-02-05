import { IGame } from "../../Game/interfaces/game.inteface";

export interface IPlayerFull {
  id?: string;
  name: string;
  age: number;
  email: string;
  createdAt?: Date;
  games: IGame[];
}
