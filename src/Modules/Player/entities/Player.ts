import { v4 as uuidv4 } from "uuid";
import { IGame } from "../../Game/interfaces/game.inteface";
import { IPlayerFull } from "../interfaces/playerFull.interface";

export class Player {
  id?: string;
  name: string;
  age: number;
  email: string;
  games: IGame[];

  private constructor(props: IPlayerFull) {
    this.id = uuidv4();
    this.name = props.name.toLowerCase();
    this.age = props.age;
    this.email = props.email.toLowerCase();
    this.games = props.games;

    if (!this.games) {
      this.games = [];
    }
  }

  static create(props: Player) {
    const player = new Player(props);
    return player;
  }
  static validateInputs(props: IPlayerFull) {
    if (!props.name || !props.age || !props.email) {
      throw new Error("Invalid Player to create");
    }
  }
}
