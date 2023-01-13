import { Player } from "../../../Entities/Player/Player";

export function searchGame(player: Player, gameName: any) {
  const game = player.games.findIndex(
    (g: any) => g.name.toLowerCase() == gameName.name.toLowerCase()
  );
  console.log(game);
  return game;
}
