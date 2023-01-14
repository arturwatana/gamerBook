import { IPlayerRepository } from "../../../Repository/IPlayerRepository";
import { searchById } from "../Player/searchById";
import { gameType, searchGame } from "./searchGame";

export function addGameToPlayer(
  game: gameType,
  id: string,
  playerRepository: IPlayerRepository[]
) {
  const player = searchById(id, playerRepository);
  const findedGame = searchGame(player, game);
  if (findedGame) {
    throw new Error("Game already exists");
  }

  player.games.push(game);
  return player;
}
