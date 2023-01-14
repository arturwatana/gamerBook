import { gameType } from "../useCases/Categories/Games/searchGame";

export interface IPlayerRepository {
  id?: string;
  name: string;
  age: number;
  email: string;
  games: gameType[];
}
