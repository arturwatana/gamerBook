import { Player } from "../../Player/entities/Player";
import { IGameName } from "../../../Modules/Game/interfaces/gameName.interface";

export function searchGame(player: Player, { name }: IGameName) {
  const game = player.games.findIndex((e) => {
    return e.name.toString() == name.toString();
  });
  return game;
}
