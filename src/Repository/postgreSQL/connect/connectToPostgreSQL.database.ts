const { Client } = require("pg");

export const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
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
