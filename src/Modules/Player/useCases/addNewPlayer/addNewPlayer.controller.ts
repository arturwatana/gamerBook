import { Request, Response } from "express";
import { IGameRepository } from "../../../../Repository/IGameRepository";
import { IPlayerRepository } from "../../../../Repository/IPlayerRepository";
import { AddNewPlayerUseCases } from "./addNewPlayer.usecase";

export class AddNewPlayerController {
  constructor(
    private playersRepository: IPlayerRepository,
    private gameRepository: IGameRepository
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;
      const addNewPlayerUseCase = new AddNewPlayerUseCases(
        this.playersRepository,
        this.gameRepository
      );
      const player = await addNewPlayerUseCase.execute(data);
      res.json(player);
    } catch (err: any) {
      res.status(401).json({
        message: err.message,
      });
    }
  }
}
