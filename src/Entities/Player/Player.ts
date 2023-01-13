import { v4 as uuidv4 } from "uuid";

class Player {
  id?: string;
  name: string;
  age: number;
  email: string;
  games: any[];

  constructor(name: string, age: number, email: string, games: any[]) {
    if (!this.id) {
      this.id = uuidv4();
    }

    this.name = name.toLowerCase();
    this.age = age;
    this.email = email.toLowerCase();
    this.games = games;

    if (!this.games) {
      this.games = [];
    }
  }
}

export { Player };
