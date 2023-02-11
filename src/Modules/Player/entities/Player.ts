import { v4 as uuidv4, validate } from "uuid";
import { IGame } from "../../Game/interfaces/game.inteface";
import { IPlayerFull } from "../interfaces/playerFull.interface";

export class Player {
  id?: string;
  name: string;
  age: number;
  email: string;
  createdAt?: Date;
  games: IGame[];

  private constructor(props: IPlayerFull) {
    this.id = "";
    this.name = props.name.toLowerCase();
    this.age = props.age;
    this.email = props.email.toLowerCase();
    this.createdAt = new Date();
    this.games = props.games;
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

  static idIsValid(id: string): boolean {
    const isValid = validate(id);
    return isValid;
  }
}
