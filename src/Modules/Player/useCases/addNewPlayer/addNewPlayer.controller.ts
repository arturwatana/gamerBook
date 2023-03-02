import { Request, Response } from "express";
import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";
import { IPlayerGamesRepository } from "../../../../Repository/interfaces/IPlayerGamesRepository";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { AddNewPlayerUseCases } from "./addNewPlayer.usecase";

export class AddNewPlayerController {
  constructor(
    private playersRepository: IPlayerRepository,
    private gameRepository: IGameRepository,
    private playersGamesRepository: IPlayerGamesRepository
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;
      const addNewPlayerUseCase = new AddNewPlayerUseCases(
        this.playersRepository,
        this.gameRepository,
        this.playersGamesRepository
      );
      const player = await addNewPlayerUseCase.execute(data);
      res.json({
        createdPlayer: player,
        message: "Player created in database!",
      });
    } catch (err: any) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
}
