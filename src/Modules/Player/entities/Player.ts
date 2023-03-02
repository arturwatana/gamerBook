import { Game } from "@prisma/client";
import { v4 as uuidv4, validate } from "uuid";
import { IPlayerFull } from "../interfaces/playerFull.interface";

export class Player {
  id: string;
  name: string;
  age: number;
  password: string;
  email: string;
  created_At: Date;

  private constructor(props: IPlayerFull) {
    if (!props.name || !props.age || !props.email) {
      throw new Error("Invalid Player to create");
    }
    if (
      typeof props.name != "string" ||
      typeof props.email != "string" ||
      typeof props.age != "number"
    ) {
      throw new Error("Invalid Player to create");
    }
    this.id = uuidv4();
    this.name = props.name.toLowerCase();
    this.age = props.age;
    this.password = props.password;
    this.email = props.email.toLowerCase();
    this.created_At = new Date();
  }

  static create(props: IPlayerFull) {
    const player = new Player(props);
    return player;
  }
  static idIsValid(id: string): boolean {
    const isValid = validate(id);
    return isValid;
  }
}
