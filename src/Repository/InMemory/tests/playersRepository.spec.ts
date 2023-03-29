import { describe, expect, test } from "vitest";
import { Player } from "../../../Modules/Player/entities/Player";
import { PlayersRepositoryMemory } from "../playersRepository.memory";

describe("Players Repository", () => {
  test("Should be able to find a player by email", async () => {
    const playersRepository = PlayersRepositoryMemory.getInstance();
    const playerMock: Player = Player.create({
      name: "John",
      age: 25,
      email: "john@example.com",
      password: "password_test",
    });

    await playersRepository.save(playerMock);

    const findedPlayer = await playersRepository.findByEmail(
      "john@example.com"
    );

    expect(findedPlayer).toBeInstanceOf(Player);
  });

  test("Should be able to return all players", async () => {
    const playersRepository = PlayersRepositoryMemory.getInstance();
    const playerMock: Player = Player.create({
      name: "John",
      age: 25,
      email: "john@example.com",
      password: "password_test",
    });

    await playersRepository.save(playerMock);

    const allPlayers = await playersRepository.showAllPlayers();

    expect(allPlayers).toContainEqual(playerMock);
  });

  test("Should be able to find an index by player id", async () => {
    const playersRepository = PlayersRepositoryMemory.getInstance();
    const playerMock: Player = Player.create({
      name: "John",
      age: 25,
      email: "john@example.com",
      password: "password_test",
    });

    await playersRepository.save(playerMock);

    const findedPlayerIndex = await playersRepository.findIndexById(
      playerMock.id
    );

    expect(findedPlayerIndex).toBeGreaterThan(-1);
  });

  test("Should not be able to find a player by index if player does not exist", () => {
    const playersRepository = PlayersRepositoryMemory.getInstance();
    const findedPlayerIndex = playersRepository.findIndexById("1234151234");
    expect(findedPlayerIndex).toEqual(-1);
  });

  test("Should be able to find a player by id", async () => {
    const playersRepository = PlayersRepositoryMemory.getInstance();
    const playerMock: Player = Player.create({
      name: "John",
      age: 25,
      email: "john@example.com",
      password: "password_test",
    });

    await playersRepository.save(playerMock);

    const findedPlayer = await playersRepository.searchById(playerMock.id);

    expect(findedPlayer).toBeInstanceOf(Player);
  });

  test("Should be able to delete a player by id", async () => {
    const playersRepository = PlayersRepositoryMemory.getInstance();
    const playerMock: Player = Player.create({
      name: "John",
      age: 25,
      email: "john@example.com",
      password: "password_test",
    });

    await playersRepository.save(playerMock);

    await playersRepository.deletePlayer(playerMock.id);

    const findedPlayer = await playersRepository.searchById(playerMock.id);

    expect(findedPlayer).toBeNull();
  });

  test("Should not be able to delete a player if player does not exist", async () => {
    const playersRepository = PlayersRepositoryMemory.getInstance();

    const deletedPlayer = await playersRepository.deletePlayer("12341-123");
    expect(deletedPlayer).toBeNull();
  });

  test("Should be able to change player name", async () => {
    const playersRepository = PlayersRepositoryMemory.getInstance();
    const playerMock: Player = Player.create({
      name: "John",
      age: 25,
      email: "john@example.com",
      password: "password_test",
    });

    await playersRepository.save(playerMock);

    const playerWithNameChanged = await playersRepository.changePlayerName(
      "john@example.com",
      "new_name_test"
    );

    expect(playerWithNameChanged).toHaveProperty("name", "new_name_test");
  });

  test("Should not be able to change player name if player does not exist", async () => {
    const playersRepository = PlayersRepositoryMemory.getInstance();
    const playerWithNameChanged = await playersRepository.changePlayerName(
      "example@example.com",
      "new_name_test"
    );
    expect(playerWithNameChanged).toBeNull();
  });
});
