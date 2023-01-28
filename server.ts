import { playerRouter } from "./src/routes/player.routes";

const express = require("express");
const app = express();
app.use(express.json());
const port = 8080;

app.use(playerRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});
