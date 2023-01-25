import { Player } from "../../Player/entities/Player";
import { IPlayerRepository } from "../../../Repository/IPlayerRepository";
import { IGameName } from "../../../Modules/Game/interfaces/gameName.interface";
import { searchPlayerByEmail } from "../../Player/useCases/searchPlayerByEmail";
import { searchGame } from "./searchGame";

export function deleteGameFromPlayer(
  email: string,
  gameName: IGameName,
  playerRepository: IPlayerRepository[]
) {
  const player = searchPlayerByEmail(email, playerRepository);
  if (!player) throw new Error(`Player not found: ${email}`);
  const findedGame = searchGame(player, gameName);
  player.games.splice(findedGame, 1);

  return player;
}
