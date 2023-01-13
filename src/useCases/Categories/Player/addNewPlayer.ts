import { Player } from "../../../Entities/Player/Player";
import { IPlayerRepository } from "../../../Repository/IPlayerRepository";
import { searchPlayerByEmail } from "./searchPlayerByEmail";

export function addNewPlayer(
  { name, age, email, games }: Player,
  playerRepository: IPlayerRepository[]
) {
  const playerAlreadyExists = searchPlayerByEmail(email, playerRepository);
  if (!name || !age) {
    throw new Error(`Player needs a name and age`);
  }
  if (playerAlreadyExists) {
    throw new Error(`Player ${email} already exists`);
  }

  const player = new Player(name, age, email, games);
  playerRepository.push(player);
  return player;
}
