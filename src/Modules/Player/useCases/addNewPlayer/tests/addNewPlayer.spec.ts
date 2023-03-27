import { describe, expect, test } from "vitest";
import { GameRepositoryMemory } from "../../../../../Repository/InMemory/gamesRepository.memory";
import { PlayerGamesMemory } from "../../../../../Repository/InMemory/playerGamesRepository.memory";
import { PlayersRepositoryMemory } from "../../../../../Repository/InMemory/playersRepository.memory";
import { Player } from "../../../entities/Player";
import {
  AddNewPlayerUseCase,
  PlayerRequestType,
} from "../addNewPlayer.usecase";

describe("Add new Player", () => {
  test("Should be able to add a new Player", async () => {
    const playerRepository = PlayersRepositoryMemory.getInstance();
    const gameRepository = GameRepositoryMemory.getInstance();
    const playerGamesRepository = PlayerGamesMemory.getInstance();

    const playerMock: PlayerRequestType = {
      name: "PLAYER_NAME",
      age: 25,
      email: "user@example.com",
      password: "PLAYER_PASSWORD",
    };

    const addNewPlayerUseCase = new AddNewPlayerUseCase(
      playerRepository,
      gameRepository,
      playerGamesRepository
    );

    const createdPlayer = await addNewPlayerUseCase.execute(playerMock);

    expect(createdPlayer).toBeInstanceOf(Player);
    expect(createdPlayer).toHaveProperty("id");
  });

  test("Should be able to create a new Player with some favorite games", async () => {
    const playerRepository = PlayersRepositoryMemory.getInstance();
    const gameRepository = GameRepositoryMemory.getInstance();
    const playerGamesRepository = PlayerGamesMemory.getInstance();

    const playerMock: PlayerRequestType = {
      name: "PLAYER_NAME",
      age: 25,
      email: "user1@example.com",
      password: "PLAYER_PASSWORD",
      games: [
        {
          name: "GAME_TEST1",
        },
      ],
    };

    const addNewPlayerUseCase = new AddNewPlayerUseCase(
      playerRepository,
      gameRepository,
      playerGamesRepository
    );

    const createdPlayer = await addNewPlayerUseCase.execute(playerMock);

    expect(createdPlayer).toHaveProperty("games");
  });

  test("Should not be able to add a new player if email is already registered", () => {
    expect(async () => {
      const playerRepository = PlayersRepositoryMemory.getInstance();
      const gameRepository = GameRepositoryMemory.getInstance();
      const playerGamesRepository = PlayerGamesMemory.getInstance();

      const playerMock: PlayerRequestType = {
        name: "PLAYER_NAME",
        age: 25,
        email: "user@example.com",
        password: "PLAYER_PASSWORD",
      };

      const addNewPlayerUseCase = new AddNewPlayerUseCase(
        playerRepository,
        gameRepository,
        playerGamesRepository
      );

      await addNewPlayerUseCase.execute(playerMock);

      const playerMockWithSameEmail: PlayerRequestType = {
        name: "PLAYER_NAME1",
        age: 25,
        email: "user@example.com",
        password: "PLAYER_PASSWORD2",
      };

      await addNewPlayerUseCase.execute(playerMockWithSameEmail);
    }).rejects.toThrow("Player user@example.com already exists");
  });
});
