require("dotenv").config();

import { playerRouter } from "./routes/player.routes";
import { gamesRouter } from "./routes/games.routes";
import express from "express";
import { ConnectToPostgreS } from "./Repository/postgreSQL/connectToPostgreSQL.database";
import { InsertUserOnTestTable } from "./Repository/postgreSQL/insertUserOnTestTable";

const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const port = 8080;

const connectPostgreSQL = new ConnectToPostgreS();
connectPostgreSQL.connect();

app.use(playerRouter);
app.use(gamesRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});
