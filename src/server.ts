import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { playerRouter } from "./routes/player.routes";
import { gamesRouter } from "./routes/games.routes";
import express from "express";
import { ConnectToPostgreS } from "./Repository/postgreSQL/connect/connectToPostgreSQL.database";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = 8080;

// const connectPostgreSQL = new ConnectToPostgreS();
// connectPostgreSQL.connect();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(playerRouter);
app.use(gamesRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});
