import { Request, Response } from "express";
import { IGameRepository } from "../../../../Repository/interfaces/IGameRepository";
import { AddGameToDataBaseUseCase } from "./addGameToDatabase.usecase";

export class AddGameToDataBaseController {
  constructor(private gamesRepository: IGameRepository) {}
  async handle(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const addGameToDataBaseUseCase = new AddGameToDataBaseUseCase(
        this.gamesRepository
      );
      const gameSaved = await addGameToDataBaseUseCase.execute({ name });
      res.send(gameSaved);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
