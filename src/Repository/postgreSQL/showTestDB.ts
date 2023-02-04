import { client } from "./connectToPostgreSQL.database";

export class ShowDBTest {
  async show() {
    try {
      const showDB = await client.query("SELECT * FROM TEST");
      console.log(showDB);
    } catch (err) {
      console.log(err);
    }
  }
}
