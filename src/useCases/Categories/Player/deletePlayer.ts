import { IPlayerRepository } from "../../../Repository/IPlayerRepository";

export function deletePlayer(
  id: string,
  playersRepository: IPlayerRepository[]
) {
  const findedPlayer = playersRepository.findIndex((player) => player.id == id);
  console.log(findedPlayer);
  if (findedPlayer == -1) {
    throw new Error("Player not found: " + id);
  }

  playersRepository.splice(findedPlayer, 1);
}
