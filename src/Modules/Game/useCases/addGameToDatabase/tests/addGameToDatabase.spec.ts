import { expect, test } from "vitest";
import { GameRepositoryMemory } from "../../../../../Repository/InMemory/gamesRepository.memory";
import { Game } from "../../../entities/Game";
import { AddGameToDataBaseUseCase } from "../addGameToDatabase.usecase";

test("Should be able to add a new game to database", async () => {
  const gameRepository = GameRepositoryMemory.getInstance();
  const gameMock = {
    name: "GAME_NAME_TEST",
  };

  const addGameToDatabaseUseCase = new AddGameToDataBaseUseCase(gameRepository);
  const gameSavedInDB = await addGameToDatabaseUseCase.execute(gameMock);

  expect(gameSavedInDB).toBeInstanceOf(Game);
  expect(gameSavedInDB).toHaveProperty("id");
});

test("Should not be able to add a new game if this game already exists", async () => {
  const gameRepository = GameRepositoryMemory.getInstance();
  const gameMock = {
    name: "GAME_NAME_TEST",
  };
  const addGameToDatabaseUseCase = new AddGameToDataBaseUseCase(gameRepository);
  const gameSavedInDB = await addGameToDatabaseUseCase.execute(gameMock);

  const gameMock1 = {
    name: "GAME_NAME_TEST",
  };
  const sameGameSavedInDB = await addGameToDatabaseUseCase.execute(gameMock1);

  expect(sameGameSavedInDB).toBe(gameSavedInDB);
});
