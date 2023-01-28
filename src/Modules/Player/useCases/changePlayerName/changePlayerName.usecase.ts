import { PlayersRepositoryMemory } from "../../../../Repository/playersRepository.memory";

export class ChangePlayerNameUseCase {
  constructor(private playersRepository: PlayersRepositoryMemory) {}

  async execute(email: string, newName: string) {
    const player: any = await this.playersRepository.findByEmail(email);
    if (!player) throw new Error(`Player not found: ${email}`);
    player.name = newName;
    return player;
  }
}
