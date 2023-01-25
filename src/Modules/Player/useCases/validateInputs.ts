import { Player } from "../entities/Player";

export async function validateInputs({ name, age, email }: Player) {
  if (
    typeof name != "string" ||
    !name ||
    typeof email != "string" ||
    !email ||
    typeof age != "number" ||
    !age ||
    email.includes("@") == false
  ) {
    throw new Error("Invalid Player to create");
  }
}
