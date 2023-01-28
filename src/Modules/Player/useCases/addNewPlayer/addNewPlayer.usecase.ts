import { Game } from "../../../Game/entities/Game";
import { Player } from "../../entities/Player";
import { IPlayerRepository } from "../../../../Repository/IPlayerRepository";
import { IGameRepository } from "../../../../Repository/IGameRepository";

type PlayerRequestType = {
  name: string;
  age: number;
  email: string;
  games: IGameRepository[];
};
export class AddNewPlayerUseCases {
  constructor(private playerRepository: IPlayerRepository) {}

  async execute({ name, age, email, games }: PlayerRequestType) {
    Player.validateInputs({ name, age, email, games });
    const playerAlreadyExists = await this.playerRepository.findByEmail(email);
    if (playerAlreadyExists) {
      throw new Error(`Player ${email} already exists`);
    }
    let numberOfGames = games.length;

    games.forEach((game) => {
      game = new Game(game);
      games.push(game);
    });
    games.splice(0, numberOfGames);
    const player = Player.create({ name, age, email, games });
    const playerCreated = this.playerRepository.save(player);
    return playerCreated;
  }
}
