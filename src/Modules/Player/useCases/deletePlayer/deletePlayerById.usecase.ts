import { IPlayerRepository } from "../../../../Repository/IPlayerRepository";

export class DeletePlayerByIdUseCase {
  constructor(private playersRepository: IPlayerRepository) {}

  async execute(id: string) {
    const findedPlayerIndex = this.playersRepository.findIndexById(id);
    if (findedPlayerIndex == -1) {
      throw new Error("Player not found by id: " + id);
    }
    this.playersRepository.deletePlayer(findedPlayerIndex);
    return findedPlayerIndex;
  }
}
