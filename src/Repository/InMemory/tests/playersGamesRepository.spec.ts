import { describe, expect, test } from "vitest";
import { Game } from "../../../Modules/Game/entities/Game";
import { IGameName } from "../../../Modules/Game/interfaces/gameName.interface";
import { Player } from "../../../Modules/Player/entities/Player";
import {
  AddNewPlayerUseCase,
  PlayerRequestType,
} from "../../../Modules/Player/useCases/addNewPlayer/addNewPlayer.usecase";
import { GameRepositoryMemory } from "../gamesRepository.memory";
import { PlayerGamesMemory } from "../playerGamesRepository.memory";
import { PlayersRepositoryMemory } from "../playersRepository.memory";

describe("Player Games Repository", () => {
  test("Should be able to vinculate games to player", async () => {
    const playerRepository = PlayersRepositoryMemory.getInstance();
    const gameRepository = GameRepositoryMemory.getInstance();
    const playerGamesRepository = PlayerGamesMemory.getInstance();
    const playerMock: PlayerRequestType = {
      name: "example_name",
      age: 27,
      email: "example@example.com",
      password: "password_test",
      games: [
        {
          name: "example_game_name",
        },
        {
          name: "example_game_name1",
        },
      ],
    };
    const addNewPlayerUseCase = new AddNewPlayerUseCase(
      playerRepository,
      gameRepository,
      playerGamesRepository
    );
    const createdPlayerInDB = await addNewPlayerUseCase.execute(playerMock);

    expect(createdPlayerInDB).toHaveProperty("games");
  });
});
