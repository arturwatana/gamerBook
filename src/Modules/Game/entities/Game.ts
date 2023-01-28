import { v4 as uuidv4 } from "uuid";
import { IGameName } from "../interfaces/gameName.interface";

export class Game {
  id?: string;
  name: IGameName;
  players: number;

  constructor({ name }: any) {
    if (!this.id) this.id = uuidv4();
    this.name = name;
    this.players = 0;
  }
}
