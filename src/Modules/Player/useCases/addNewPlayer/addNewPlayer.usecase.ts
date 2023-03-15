import { Game } from "../../../Game/entities/Game";
import { Player } from "../../entities/Player";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { IGame } from "../../../Game/interfaces/game.inteface";
import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";
import { IPlayerGamesRepository } from "../../../../Repository/interfaces/IPlayerGamesRepository";

type PlayerRequestType = {
  name: string;
  age: number;
  email: string;
  password: string;
  games: IGame[];
};
export class AddNewPlayerUseCases {
  constructor(
    private playerRepository: IPlayerRepository,
    private gameRepository: IGameRepository,
    private playerGamesRepository: IPlayerGamesRepository
  ) {}

  async execute({ name, age, password, email, games }: PlayerRequestType) {
    const player = Player.create({
      name,
      age,
      password,
      email,
    });
    const playerAlreadyExists = await this.playerRepository.findByEmail(email);
    if (playerAlreadyExists) {
      throw new Error(`Player ${email} already exists`);
    }
    let playerGames: Game[] = [];
    const playerSavedOnDB = await this.playerRepository.save(player);
    if (!games) {
      return playerSavedOnDB;
    }
    for (let i = 0; i <= games.length - 1; i++) {
      let dbGame = await this.gameRepository.findGameByName(games[i].name);
      if (!dbGame) {
        games[i] = Game.create(games[i]);
        let gameCreatedOnDB = await this.gameRepository.save(games[i]);
        games[i].id = gameCreatedOnDB.id;
        games[i].createdAt = gameCreatedOnDB.createdAt;
        playerGames.push(games[i]);
      } else {
        playerGames.push(dbGame);
      }
    }
    await this.playerGamesRepository.vinculateGamesToPlayer(
      playerSavedOnDB,
      playerGames
    );
    const playerGamesUpdated: Game[] = [];
    for (let i = 0; i < playerGames.length; i++) {
      const gameUpdated = await this.gameRepository.updatePlayersCountOnGame(
        playerGames[i]
      );
      if (gameUpdated) {
        playerGamesUpdated.push(gameUpdated);
      }
    }

    const createdPlayer = {
      ...playerSavedOnDB,
      playerGames: playerGamesUpdated,
    };
    return createdPlayer;
  }
}
