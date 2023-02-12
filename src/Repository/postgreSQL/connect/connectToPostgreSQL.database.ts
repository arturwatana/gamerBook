const { Client } = require("pg");

const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

export const client = new Client({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
});

export class ConnectToPostgreS {
  async connect() {
    try {
      await client.connect();
      const res = await client.query("SELECT * FROM GAMER_BOOK.PLAYERS");
      if (res) {
        console.log("Connected to postgreSQL on port: 5432");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default { ConnectToPostgreS };
