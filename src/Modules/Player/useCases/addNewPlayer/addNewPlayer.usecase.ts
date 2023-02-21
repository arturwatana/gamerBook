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
    const playerAlreadyExists = await this.playerRepository.findByEmail(email);
    if (playerAlreadyExists) {
      throw new Error(`Player ${email} already exists`);
    }
    let playerGames: Game[] = [];
    const player = Player.create({ id: "", name, age, password, email });
    const playerSavedOnDB = await this.playerRepository.save(player);
    console.log(games);

    if (games) {
      games.map(async (game) => {
        const createGame = Game.create(game);
        const gameAlreadyExists = await this.gameRepository.findGameByName(
          createGame.name
        );
        if (gameAlreadyExists) {
          player.games?.push(gameAlreadyExists);
          return;
        }
        const gameCreatedInDB = await this.gameRepository.save(createGame);
        player.games?.push(gameCreatedInDB);
      });
    }
    const vinculateGamesToPlayer =
      await this.playerGamesRepository.vinculateGamesToPlayer(
        playerSavedOnDB,
        playerGames
      );
    console.log(vinculateGamesToPlayer);
    playerSavedOnDB.games = vinculateGamesToPlayer;
    return playerSavedOnDB;
  }
}
