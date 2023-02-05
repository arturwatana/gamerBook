import { Player } from "../../Modules/Player/entities/Player";
import { IPlayerRepository } from "../interfaces/IPlayerRepository";
import { client } from "./connectToPostgreSQL.database";

export class PlayersPostgreSQLRepository implements IPlayerRepository {
  async save({ name, age, email }: Player): Promise<Player | undefined> {
    const insertUserTest = await client.query(
      `INSERT INTO GAMER_BOOK.USERS(NAME, AGE, EMAIL) VALUES('${name}', '${age}', '${email}')`
    );
    const createdUser = await this.findByEmail(email);
    return createdUser;
  }
  async findByEmail(email: string): Promise<Player | undefined> {
    const formatedEmail = email.toLowerCase();
    const findedUser = await client.query(
      `SELECT * FROM GAMER_BOOK.USERS WHERE EMAIL = '${formatedEmail}' LIMIT 1`
    );
    return findedUser.rows[0];
  }
  findIndexById(id: string): number {
    throw new Error("Method not implemented.");
  }
  async deletePlayer(id: string): Promise<Player> {
    const deletedPlayer = await client.query(
      `DELETE FROM GAMER_BOOK.USERS WHERE ID = '${id}'`
    );
    return deletedPlayer;
  }
  async searchById(id: string): Promise<Player | undefined> {
    const findedUser = await client.query(
      `SELECT * FROM GAMER_BOOK.USERS WHERE id = '${id}'`
    );
    return findedUser.rows;
  }

  async changePlayerName(
    email: string,
    name: string
  ): Promise<Player | undefined> {
    await client.query(
      `UPDATE GAMER_BOOK.USERS SET NAME = '${name}' WHERE EMAIL = '${email}'`
    );
    const playerWithNameChanged = await client.query(
      `SELECT * FROM GAMER_BOOK.USERS WHERE EMAIL = '${email}'`
    );
    return playerWithNameChanged.rows;
  }
}
