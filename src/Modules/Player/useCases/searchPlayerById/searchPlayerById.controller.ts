import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { Request, Response } from "express";
import { SearchPlayerByIdUseCase } from "./searchPlayerById.usecase";
import { IPlayerGamesRepository } from "../../../../Repository/interfaces/IPlayerGamesRepository";

export class SearchPlayerByIdController {
  constructor(
    private playersRepository: IPlayerRepository,
    private playerGamesRepository: IPlayerGamesRepository
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const searchPlayerByIdUseCase = new SearchPlayerByIdUseCase(
        this.playersRepository,
        this.playerGamesRepository
      );
      const player = await searchPlayerByIdUseCase.execute(id);
      res.json(player);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
