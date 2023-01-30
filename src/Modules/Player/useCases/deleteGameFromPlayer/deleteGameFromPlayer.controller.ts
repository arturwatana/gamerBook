import { IGameRepository } from "../../../../Repository/IGameRepository";
import { IPlayerRepository } from "../../../../Repository/IPlayerRepository";
import { Request, Response } from "express";
import { DeleteGameFromPlayerUseCase } from "./deleteGameFromPlayer.usecase";

export class DeleteGameFromPlayerController {
  constructor(
    private playersRepository: IPlayerRepository,
    private gameRepository: IGameRepository
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const { email } = req.params;
      const deleteGameFromPlayerUseCase = new DeleteGameFromPlayerUseCase(
        this.playersRepository,
        this.gameRepository
      );
      const player = await deleteGameFromPlayerUseCase.execute(email, name);
      res.send(player);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
