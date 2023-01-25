import { v4 as uuidv4 } from "uuid";
import { IGameRepository } from "../../../Repository/IGameRepository";
import { validateInputs } from "../useCases/validateInputs";

class Player {
  id?: string;
  name: string;
  age: number;
  email: string;
  games: IGameRepository[];

  constructor(
    name: string,
    age: number,
    email: string,
    games: IGameRepository[]
  ) {
    if (!this.id) {
      this.id = uuidv4();
    }
    const player = {
      name,
      age,
      email,
      games,
    };
    validateInputs(player);
    this.name = player.name.toLowerCase();
    this.age = player.age;
    this.email = player.email.toLowerCase();
    this.games = player.games;

    if (!this.games) {
      this.games = [];
    }
  }
}

export { Player };
