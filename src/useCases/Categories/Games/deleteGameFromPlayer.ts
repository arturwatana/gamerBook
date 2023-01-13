import { IPlayerRepository } from "../../../Repository/IPlayerRepository";
import { searchPlayerByEmail } from "../Player/searchPlayerByEmail";
import { searchGame } from "./searchGame";

export function deleteGameFromPlayer(
  email: string,
  gameName: string,
  playerRepository: IPlayerRepository[]
) {
  const player: any = searchPlayerByEmail(email, playerRepository);
  const findedGame = searchGame(player, gameName);
  player.games.splice(findedGame, 1);

  return player;
}
