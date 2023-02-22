import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";

export class SearchPlayerByIdUseCase {
  constructor(private playersRepository: IPlayerRepository) {}
  async execute(id: string) {
    const player = await this.playersRepository.searchById(id);
    if (!player) {
      throw new Error(`Player ${id} not found`);
    }
    return player;
  }
}
