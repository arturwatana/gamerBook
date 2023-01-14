import { Player } from "../../../Entities/Player/Player";
import { IPlayerRepository } from "../../../Repository/IPlayerRepository";
import { searchPlayerByEmail } from "../Player/searchPlayerByEmail";
import { gameType, searchGame } from "./searchGame";

export function deleteGameFromPlayer(
  email: string,
  gameName: gameType,
  playerRepository: IPlayerRepository[]
) {
  const player: Player | undefined = searchPlayerByEmail(
    email,
    playerRepository
  );
  if (!player) throw new Error(`Player not found: ${email}`);
  const findedGame = searchGame(player, gameName);
  player.games.splice(findedGame, 1);

  return player;
}
