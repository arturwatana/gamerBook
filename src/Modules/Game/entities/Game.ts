import { randomUUID } from "crypto";

export type gameNameType = {
  name: string;
};

export class Game {
  id: string;
  name: string;
  players: number;
  createdAt: Date;

  private constructor({ name }: gameNameType) {
    this.id = randomUUID();
    this.name = name;
    this.players = 0;
    this.createdAt = new Date();
  }

  static create(name: gameNameType) {
    const game = new Game(name);
    return game;
  }
}
