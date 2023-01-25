import { test, expect } from "vitest";
import { Player } from "../Player/entities/Player";

test("Create a new instance player", () => {
  const player = new Player("John Doe", 25, "arturwatanabe@gmail.com", [
    "Counter Strike",
  ]);

  expect(player).toBeInstanceOf(Player);
  expect(player.name).toBe("John Doe");
});
