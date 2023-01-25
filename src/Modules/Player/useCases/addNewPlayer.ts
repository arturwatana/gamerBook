import { Game } from "../../Game/entities/Game";
import { Player } from "../entities/Player";
import { IPlayerRepository } from "../../../Repository/IPlayerRepository";
import { searchPlayerByEmail } from "./searchPlayerByEmail";

export function addNewPlayer(
  { name, age, email, games }: Player,
  playerRepository: IPlayerRepository[]
) {
  const playerAlreadyExists = searchPlayerByEmail(email, playerRepository);
  if (!name || !age) {
    throw new Error(`Player needs a name and age`);
  }
  if (playerAlreadyExists) {
    throw new Error(`Player ${email} already exists`);
  }
  let numberOfGames = games.length;

  games.forEach((game) => {
    game = new Game(game);
    games.push(game);
  });
  games.splice(0, numberOfGames);

  const player = new Player(name, age, email, games);
  playerRepository.push(player);
  return player;
}
