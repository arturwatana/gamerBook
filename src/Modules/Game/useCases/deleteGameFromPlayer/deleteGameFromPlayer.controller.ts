import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { Request, Response } from "express";
import { DeleteGameFromPlayerUseCase } from "./deleteGameFromPlayer.usecase";
import { IPlayerGamesRepository } from "../../../../Repository/interfaces/IPlayerGamesRepository";

export class DeleteGameFromPlayerController {
  constructor(
    private playersRepository: IPlayerRepository,
    private gameRepository: IGameRepository,
    private playerGamesRepository: IPlayerGamesRepository
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const { email } = req.params;
      const deleteGameFromPlayerUseCase = new DeleteGameFromPlayerUseCase(
        this.playersRepository,
        this.gameRepository,
        this.playerGamesRepository
      );
      const player = await deleteGameFromPlayerUseCase.execute(email, name);
      res.send(player);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
