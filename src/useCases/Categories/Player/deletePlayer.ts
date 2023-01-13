import { IPlayerRepository } from "../../../Repository/IPlayerRepository";

export function deletePlayer(
  id: string,
  playersRepository: IPlayerRepository[]
) {
  const findedPlayer = playersRepository.findIndex((player) => player.id == id);
  if (!findedPlayer) {
    throw new Error("Player not found");
  }

  playersRepository.splice(findedPlayer, 1);
}
