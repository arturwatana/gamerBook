import { describe, expect, test } from "vitest";
import { GameRepositoryMemory } from "../../../../../Repository/InMemory/gamesRepository.memory";
import { PlayerGamesMemory } from "../../../../../Repository/InMemory/playerGamesRepository.memory";
import { PlayersRepositoryMemory } from "../../../../../Repository/InMemory/playersRepository.memory";
import { IPlayerRequest } from "../../../interfaces/IPlayerRequest.interface";
import {
  AddNewPlayerUseCase,
  PlayerRequestType,
} from "../../addNewPlayer/addNewPlayer.usecase";
import { ChangePlayerNameUseCase } from "../changePlayerName.usecase";

describe("Change Player Name", () => {
  test("Should be able to change player name", async () => {
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

    const newName = "new_name_test";
    const changePlayerNameUseCase = new ChangePlayerNameUseCase(
      playerRepository
    );
    const playerWithNameChanged = await changePlayerNameUseCase.execute(
      playerMock.email,
      newName
    );

    expect(playerWithNameChanged?.name).toEqual(newName);
  });
});
