import { v4 as uuidv4 } from "uuid";
import { IGameName } from "../interfaces/gameName.interface";

export class Game {
  id?: string;
  name: string;
  players: number;
  createdAt: Date;

  private constructor({ name }: IGameName) {
    if (!this.id) this.id = uuidv4();
    this.name = name;
    this.players = 0;
    this.createdAt = new Date();
  }

  static create(name: IGameName) {
    const game = new Game(name);
    return game;
  }
}
