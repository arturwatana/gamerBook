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
    let playerGames: IGame[] = [];

    for (let i = 0; i < games.length; i++) {
      let dbGame = await this.gameRepository.findGameByName(
        games[i].name.toLowerCase()
      );
      if (!dbGame) {
        games[i] = Game.create(games[i]);
        let gameCreatedOnDB = await this.gameRepository.save(games[i]);
        games[i].id = gameCreatedOnDB.id;
        games[i].createdAt = new Date();
        playerGames.push(games[i]);
      } else {
        playerGames.push(dbGame);
      }
    }
    const player = Player.create({ name, age, email, games: playerGames });
    const playerSavedOnDB = await this.playerRepository.save(player);
    if (playerSavedOnDB) {
      playerSavedOnDB.games = player.games;
      await this.playerRepository.vinculateGamesToPlayer(
        playerSavedOnDB,
        playerSavedOnDB.games
      );

      return playerSavedOnDB;
    }
  }
}
