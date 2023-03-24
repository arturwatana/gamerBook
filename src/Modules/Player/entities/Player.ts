import { Game } from "@prisma/client";
import { v4 as uuidv4, validate } from "uuid";
import { IPlayerRequest } from "../interfaces/IPlayerRequest.interface";

export class Player {
  id: string;
  name: string;
  age: number;
  password: string;
  email: string;
  created_At: Date;
  games?: Game[];

  private constructor(props: IPlayerRequest) {
    if (!props.name || !props.age || !props.email || !props.password) {
      throw new Error("Invalid Player to create");
    }
    if (
      typeof props.name != "string" ||
      typeof props.email != "string" ||
      typeof props.age != "number" ||
      typeof props.password != "string"
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

  static create(props: IPlayerRequest) {
    const player = new Player(props);
    return player;
  }
  static idIsValid(id: string): boolean {
    const isValid = validate(id);
    return isValid;
  }
}
