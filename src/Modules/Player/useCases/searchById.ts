import { IPlayerRepository } from "../../../Repository/IPlayerRepository";

export function searchById(id: string, playerRepository: IPlayerRepository[]) {
  const findedPlayer = playerRepository.find((e) => e.id === id);
  if (!findedPlayer) {
    throw new Error("Player not found");
  }
  return findedPlayer;
}
