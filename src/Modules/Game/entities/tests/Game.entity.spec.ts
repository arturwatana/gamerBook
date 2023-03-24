import { describe, expect, test } from "vitest";
import { Game } from "../Game";

describe("Game Entity", () => {
  test("Should be able to create a game entity", () => {
    const gameMock = Game.create({
      name: "GAME_NAME_TEST",
    });

    expect(gameMock).toBeInstanceOf(Game);
    expect(gameMock).toHaveProperty("id");
  });

  test("Should not be able to create a game entity without a name", () => {
    expect(() => {
      const gameMock = Game.create({
        name: "",
      });
    }).toThrow("A game must have a name");
  });
});
