import { v4 as uuidv4 } from "uuid";
import { gameType } from "../../useCases/Categories/Games/searchGame";
import { validateInputs } from "../../useCases/Categories/Player/validateInputs";

class Player {
  id?: string;
  name: string;
  age: number;
  email: string;
  games: gameType[];

  constructor(name: string, age: number, email: string, games: gameType[]) {
    if (!this.id) {
      this.id = uuidv4();
    }
    let player = {
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
