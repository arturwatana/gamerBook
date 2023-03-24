import { test, describe, expect } from "vitest";
import { Player } from "../Player";

describe("Player Entity", () => {
  test("Should be able to create a new Player", () => {
    const playerMock = {
      name: "NAME_TEST",
      age: 20,
      email: "email@example.com",
      password: "PASSWORD_TEST",
    };
    const player = Player.create(playerMock);

    expect(player).toBeInstanceOf(Player);
    expect(player).toHaveProperty("id");
  });

  test("Should not be able to create a player without a name, age, email or password", () => {
    expect(() => {
      Player.create({
        name: "",
        age: 20,
        email: "email@example.com",
        password: "PASSWORD_TEST",
      });
    }).toThrow("Invalid Player to create");
  });

  test("Id created by entity must be an uuidv4 id", () => {
    const playerMock = {
      name: "NAME_TEST",
      age: 20,
      email: "email@example.com",
      password: "PASSWORD_TEST",
    };

    const createdPlayer = Player.create(playerMock);
    const isValid = Player.idIsValid(createdPlayer.id);
    expect(isValid).toBeTruthy();
  });
});
