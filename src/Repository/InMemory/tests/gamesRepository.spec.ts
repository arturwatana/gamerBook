import { describe, expect, test } from "vitest";
import { GameRepositoryMemory } from "../gamesRepository.memory";
import { Game } from "../../../Modules/Game/entities/Game";

describe("Games Repository", () => {
  test("Should be able to return all games", async () => {
    const gamesRepository = GameRepositoryMemory.getInstance();
    const gameMock: Game = Game.create({
      name: "name_test",
    });
    await gamesRepository.save(gameMock);
    const allGames = await gamesRepository.showAllGames();
    expect(allGames).toContainEqual(gameMock);
  });

  test("Should not be able to update if the game does not exist", async () => {
    const gamesRepository = GameRepositoryMemory.getInstance();
    const gameMock1: Game = Game.create({
      name: "name_tasdasdest1",
    });
    const findedGame = await gamesRepository.updatePlayersCountOnGame(
      gameMock1
    );
    expect(findedGame).toBeNull();
  });
});
