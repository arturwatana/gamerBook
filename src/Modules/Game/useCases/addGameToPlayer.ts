import { Game } from "../entities/Game";
import { IPlayerRepository } from "../../../Repository/IPlayerRepository";
import { IGameName } from "../../../Modules/Game/interfaces/gameName.interface";
import { searchById } from "../../Player/useCases/searchById";
import { searchGame } from "./searchGame";
import { f } from "vitest/dist/index-1cfc7f58";

export function addGameToPlayer(
  gameName: IGameName,
  id: string,
  playerRepository: IPlayerRepository[]
) {
  const player = searchById(id, playerRepository);
  const findedGame = searchGame(player, gameName);
  if (findedGame !== -1) throw new Error("Game already exists");
  const games = new Game(gameName);
  player.games.push(games);
  return player;
}
