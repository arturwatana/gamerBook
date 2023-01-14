import { Player } from "../../../Entities/Player/Player";

export function validateInputs(inputs: Player) {
  const { name, age, email } = inputs;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof age !== "number" ||
    email.includes("@") == false
  ) {
    throw new Error("Invalid Player to create");
  }
}
