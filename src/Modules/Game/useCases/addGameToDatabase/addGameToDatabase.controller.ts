import { Request, Response } from "express";
import { GameRepositoryMemory } from "../../../../Repository/gamesRepository.memory";
import { AddGameToDataBaseUseCase } from "./addGameToDatabase.usecase";

export class AddGameToDataBaseController {
  constructor(private gamesRepository: GameRepositoryMemory) {}
  async handle(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const addGameToDataBaseUseCase = new AddGameToDataBaseUseCase(
        this.gamesRepository
      );
      const gameSaved = await addGameToDataBaseUseCase.execute({ name });
      res.send(gameSaved);
    } catch (err: any) {
      res.json({ message: err.message });
    }
  }
}
