import { Player } from "../../../Entities/Player/Player";
import { IPlayerRepository } from "../../../Repository/IPlayerRepository";
import { searchPlayerByEmail } from "./searchPlayerByEmail";

export function addNewPlayer(
  { name, age, email, games }: Player,
  playerRepository: IPlayerRepository[]
) {
  const playerAlreadyExists = searchPlayerByEmail(email, playerRepository);

  const player = new Player(name, age, email, games);
  if (playerAlreadyExists) {
    throw new Error(`Player ${email} already exists`);
  }
  playerRepository.push(player);
  return player;
}
