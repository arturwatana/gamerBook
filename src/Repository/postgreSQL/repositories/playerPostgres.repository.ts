import { create } from "ts-node";
import { Game } from "../../../Modules/Game/entities/Game";
import { IGame } from "../../../Modules/Game/interfaces/game.inteface";
import { Player } from "../../../Modules/Player/entities/Player";
import { IPlayerFull } from "../../../Modules/Player/interfaces/playerFull.interface";
import { IPlayerRepository } from "../../interfaces/IPlayerRepository";
import { client } from "../connect/connectToPostgreSQL.database";

export class PlayersPostgreSQLRepository implements IPlayerRepository {
  async showAllPlayers(): Promise<Player[]> {
    const players = await client.query(`SELECT * FROM GAMER_BOOK.PLAYERS`);
    return players.rows;
  }
  async save({ name, age, email }: Player): Promise<Player> {
    const insertUserTest = await client.query(
      `INSERT INTO GAMER_BOOK.PLAYERS(NAME, AGE, EMAIL) VALUES('${name}', '${age}', '${email}')`
    );
    const createdUser = await this.findByEmail(email);
    return createdUser;
  }
  async findByEmail(email: string): Promise<Player> {
    const formatedEmail = email.toLowerCase();
    const findedUser = await client.query(
      `SELECT * FROM GAMER_BOOK.PLAYERS WHERE EMAIL = '${formatedEmail}' LIMIT 1`
    );

    return findedUser.rows[0];
  }
  findIndexById(id: string): number {
    throw new Error("Method not implemented.");
  }
  async deletePlayer(id: string): Promise<Player> {
    const deletedPlayer = await client.query(
      `DELETE FROM GAMER_BOOK.PLAYERS WHERE ID = '${id}'`
    );
    return deletedPlayer;
  }
  async searchById(id: string): Promise<Player | null> {
    const findedUser = await client.query(
      `SELECT * FROM GAMER_BOOK.PLAYERS WHERE id = '${id}'`
    );
    return findedUser.rows;
  }

  async changePlayerName(email: string, name: string): Promise<Player | null> {
    await client.query(
      `UPDATE GAMER_BOOK.PLAYERS SET NAME = '${name}' WHERE EMAIL = '${email}'`
    );
    const playerWithNameChanged = await client.query(
      `SELECT * FROM GAMER_BOOK.PLAYERS WHERE EMAIL = '${email}'`
    );
    return playerWithNameChanged.rows;
  }

  async vinculateGamesToPlayer(
    player: Player,
    games: IGame[]
  ): Promise<Game[]> {
    let playerGames: Game[] = [];
    games.forEach(async (game: Game) => {
      await client.query(
        `INSERT INTO GAMER_BOOK.PLAYERS_GAMES(ID_PLAYER, ID_GAME) VALUES('${player.id}', '${game.id}')`
      );
      const gameInDB = await client.query(
        `SELECT * FROM GAMER_BOOK.GAMES WHERE ID = '${game.id}'`
      );
      playerGames.push(gameInDB.rows[0]);
    });
    return playerGames;
  }
}
