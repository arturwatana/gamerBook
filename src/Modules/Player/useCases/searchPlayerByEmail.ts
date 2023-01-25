import { IPlayerRepository } from "../../../Repository/IPlayerRepository";

export function searchPlayerByEmail(
  email: string,
  playerRepository: IPlayerRepository[]
) {
  const findedPlayer = playerRepository.find(
    (player) => player.email.toLowerCase() == email.toLowerCase()
  );

  return findedPlayer;
}
