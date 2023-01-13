import { IPlayerRepository } from "../../../Repository/IPlayerRepository";
import { searchPlayerByEmail } from "./searchPlayerByEmail";

export function changePlayerName(
  email: string,
  newName: any,
  playerRepository: IPlayerRepository[]
) {
  const player: any = searchPlayerByEmail(email, playerRepository);
  player.name = newName.name;
  return player;
}
