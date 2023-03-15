import { IGame } from "../../../Modules/Game/interfaces/game.inteface";
import { IGameRepository } from "../../interfaces/IGameRepository";
import { client } from "../connect/connectToPostgreSQL.database";

export class GamePostgreSQLRepository implements IGameRepository {
  async showAllGames(): Promise<IGame[]> {
    const games = await client.query(`SELECT * FROM GAMER_BOOK.GAMES`);
    return games.rows;
  }
  async save({ name, players }: IGame): Promise<IGame> {
    const formatedName = name.toLowerCase();
    const saveGameOnDB = await client.query(
      `INSERT INTO GAMER_BOOK.GAMES(NAME, PLAYERS) VALUES('${formatedName}', ${players})`
    );
    const createdGameOnDB = await this.findGameByName(formatedName);
    return createdGameOnDB;
  }
  async findGameByName(gameName: string): Promise<IGame> {
    const findedGameOnDB = await client.query(
      `SELECT * FROM GAMER_BOOK.GAMES WHERE NAME = '${gameName}'`
    );
    const game =
      findedGameOnDB.rows.length === 0 ? undefined : findedGameOnDB.rows[0];
    return game;
  }
  updatePlayersCountOnGame(game: IGame): Promise<IGame | null> {
    throw new Error("Method not implemented.");
  }
}
