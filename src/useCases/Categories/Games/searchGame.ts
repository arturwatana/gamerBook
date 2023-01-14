import { Player } from "../../../Entities/Player/Player";

export type gameType = {
  name: string;
};

export function searchGame(player: Player, gameName: gameType) {
  const game = player.games.findIndex((g: gameType) => {
    g.name.toLowerCase() == gameName.name.toLowerCase();
    console.log(g);
  });
  return game;
}
