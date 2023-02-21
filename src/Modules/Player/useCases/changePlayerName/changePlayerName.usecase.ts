import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { Player } from "../../entities/Player";

export class ChangePlayerNameUseCase {
  constructor(private playersRepository: IPlayerRepository) {}

  async execute(email: string, newName: string) {
    const player: Player | null = await this.playersRepository.findByEmail(
      email
    );

    if (!player) throw new Error(`Player not found: ${email}`);
    const newPlayer = this.playersRepository.changePlayerName(
      email.toLowerCase(),
      newName.toLowerCase()
    );
    return newPlayer;
  }
}
