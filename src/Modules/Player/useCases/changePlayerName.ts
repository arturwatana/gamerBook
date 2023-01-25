import { IPlayerRepository } from "../../../Repository/IPlayerRepository";
import { INewName } from "../interfaces/newName.interface";
import { searchPlayerByEmail } from "./searchPlayerByEmail";

export function changePlayerName(
  email: string,
  newName: INewName,
  playerRepository: IPlayerRepository[]
) {
  const player: any = searchPlayerByEmail(email, playerRepository);
  if (!player) throw new Error(`Player not found: ${email}`);
  player.name = newName.name;
  return player;
}
