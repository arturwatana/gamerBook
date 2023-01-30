import { IPlayerRepository } from "../../../../Repository/IPlayerRepository";

import { Request, Response } from "express";
import { SearchPlayerByIdUseCase } from "./searchPlayerById.usecase";

export class SearchPlayerByIdController {
  constructor(private playersRepository: IPlayerRepository) {}
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const searchPlayerByIdUseCase = new SearchPlayerByIdUseCase(
        this.playersRepository
      );
      const player = await searchPlayerByIdUseCase.execute(id);
      res.json(player);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
