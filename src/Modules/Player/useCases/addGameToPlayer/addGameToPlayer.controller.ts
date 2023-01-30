import { Request, Response } from "express";
import { IGameRepository } from "../../../../Repository/IGameRepository";
import { IPlayerRepository } from "../../../../Repository/IPlayerRepository";
import { AddGameToPlayerUseCase } from "./addGameToPlayer.usecase";

export class AddGameToPlayerController {
  constructor(
    private playersRepository: IPlayerRepository,
    private gameRepository: IGameRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const { id } = req.params;

      const addGameToPlayerUseCase = new AddGameToPlayerUseCase(
        this.playersRepository,
        this.gameRepository
      );
      const player = await addGameToPlayerUseCase.execute(name, id);
      res.json(player);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
