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
        game.name.toLowerCase()
      );
      if (!gameAlreadyExists) {
        game = Game.create(game);
        let gameCreatedOnDB = await this.gameRepository.save(game);
        game.id = gameCreatedOnDB.id;
        game.createdAt = gameCreatedOnDB.createdAt;
        games.push(game);
      } else {
        games.push(gameAlreadyExists);
      }
    });
    games.splice(0, numberOfGames);
    const player = Player.create({ name, age, email, games });
    const playerSavedOnDB = await this.playerRepository.save(player);
    if (playerSavedOnDB) {
      playerSavedOnDB.games = player.games;
      await this.playerRepository.vinculateGamesToPlayer(
        playerSavedOnDB,
        player.games
      );

      return playerSavedOnDB;
    }
  }
}
