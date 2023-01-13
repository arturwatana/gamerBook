export function searchGame(player: any, gameName: any) {
  const game = player.games.findIndex(
    (g: any) => g.name.toLowerCase() == gameName.name.toLowerCase()
  );
  console.log(game);
  return game;
}
