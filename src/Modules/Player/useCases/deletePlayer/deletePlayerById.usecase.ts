import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { Player } from "../../entities/Player";

export class DeletePlayerByIdUseCase {
  constructor(private playersRepository: IPlayerRepository) {}

  async execute(id: string) {
    const idIsValid = Player.idIsValid(id);
    if (!idIsValid) {
      throw new Error("Player not found by id: " + id);
    }
    const player = await this.playersRepository.searchById(id);
    const deletedPlayer = await this.playersRepository.deletePlayer(id);
    return player;
  }
}
