import { v4 as uuidv4 } from "uuid";
import { IGameName } from "../interfaces/gameName.interface";
import { IPlayer } from "../../Player/interfaces/player.interface";

export class Game {
  id?: string;
  name: IGameName;

  constructor({ name }: any) {
    if (!this.id) this.id = uuidv4();
    this.name = name;
  }
}
