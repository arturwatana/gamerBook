import { test, expect } from "vitest";
import { Player } from "../Player/entities/Player";

test("Create a new instance player", () => {
  const player = Player.create({
    name: "John Doe",
    age: 25,
    email: "jdoe@example.com",
  });

  expect(player).toBeInstanceOf(Player);
  expect(player.name).toBe("john doe");
});
