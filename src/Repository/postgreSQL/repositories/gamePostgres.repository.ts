import { Game } from "../../../Modules/Game/entities/Game";
import { IGameRepository } from "../../interfaces/IGameRepository";
import { client } from "../connect/connectToPostgreSQL.database";

export class GamePostgreSQLRepository implements IGameRepository {
  async showAllGames(): Promise<Game[]> {
    const games = await client.query(`SELECT * FROM GAMER_BOOK.GAMES`);
    return games.rows;
  }
  async save({ name, players }: Game): Promise<Game> {
    const formatedName = name.toLowerCase();
    const saveGameOnDB = await client.query(
      `INSERT INTO GAMER_BOOK.GAMES(NAME, PLAYERS) VALUES('${formatedName}', ${players})`
    );
    const createdGameOnDB = await this.findGameByName(formatedName);
    return createdGameOnDB;
  }
  async findGameByName(gameName: string): Promise<Game> {
    const findedGameOnDB = await client.query(
      `SELECT * FROM GAMER_BOOK.GAMES WHERE NAME = '${gameName}'`
    );
    const game =
      findedGameOnDB.rows.length === 0 ? undefined : findedGameOnDB.rows[0];
    return game;
  }
  findGameByIndex(gameName: string): number {
    throw new Error("Method not implemented.");
  }
}
