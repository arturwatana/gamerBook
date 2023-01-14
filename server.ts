import { IPlayerRepository } from "./src/Repository/IPlayerRepository";
import { addGameToPlayer } from "./src/useCases/Categories/Games/addGameToPlayer";
import { addNewPlayer } from "./src/useCases/Categories/Player/addNewPlayer";
import { deleteGameFromPlayer } from "./src/useCases/Categories/Games/deleteGameFromPlayer";
import { searchById } from "./src/useCases/Categories/Player/searchById";
import { changePlayerName } from "./src/useCases/Categories/Player/changePlayerName";
import { deletePlayer } from "./src/useCases/Categories/Player/deletePlayer";

const express = require("express");
const app = express();
app.use(express.json());
const port = 8080;
const playersRepository: IPlayerRepository[] = [];

app.get("/players", (req: any, res: any) => {
  res.send(playersRepository);
});
app.get("/players/:id", (req: any, res: any) => {
  try {
    const { id } = req.params;
    const player = searchById(id, playersRepository);
    res.json(player);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

app.post("/players", (req: any, res: any) => {
  try {
    const { name, age, email, games } = req.body;
    const player = addNewPlayer({ name, age, email, games }, playersRepository);
    res.json(player);
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

app.post("/players/:id/addgame", (req: any, res: any) => {
  try {
    const { id } = req.params;
    const game = req.body;
    const newPlayer = addGameToPlayer(game, id, playersRepository);
    res.send(newPlayer);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/players/:email/removegame", (req: any, res: any) => {
  try {
    const { email } = req.params;
    const game = req.body;
    const newPlayer = deleteGameFromPlayer(email, game, playersRepository);
    res.send(newPlayer);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

app.put("/players/:email/changename", (req: any, res: any) => {
  try {
    const { email } = req.params;
    const name = req.body;
    const newPlayer = changePlayerName(email, name, playersRepository);
    res.send(newPlayer);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

app.delete("/players/:id/deleteplayer", (req: any, res: any) => {
  try {
    const { id } = req.params;

    deletePlayer(id, playersRepository);

    res.send(playersRepository);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
