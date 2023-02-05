import { Game } from "../../../Game/entities/Game";
import { Player } from "../../entities/Player";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { IGame } from "../../../Game/interfaces/game.inteface";
import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";

type PlayerRequestType = {
  name: string;
  age: number;
  email: string;
  games: IGame[];
};
export class AddNewPlayerUseCases {
  constructor(
    private playerRepository: IPlayerRepository,
    private gameRepository: IGameRepository
  ) {}

  async execute({ name, age, email, games }: PlayerRequestType) {
    Player.validateInputs({ name, age, email, games });
    const playerAlreadyExists = await this.playerRepository.findByEmail(email);
    if (playerAlreadyExists) {
      throw new Error(`Player ${email} already exists`);
    }
    let numberOfGames = games.length;
    games.forEach(async (game) => {
      let gameAlreadyExists = await this.gameRepository.findGameByName(
        game.name
      );
      if (!gameAlreadyExists) {
        game = Game.create(game);
        game.players++;
        games.push(game);
        this.gameRepository.save(game);
      } else {
        gameAlreadyExists.players++;
        games.push(gameAlreadyExists);
      }
    });
    games.splice(0, numberOfGames);
    const player = Player.create({ name, age, email, games });
    const playerSavedOnDB = this.playerRepository.save(player);

    return playerSavedOnDB;
  }
}
