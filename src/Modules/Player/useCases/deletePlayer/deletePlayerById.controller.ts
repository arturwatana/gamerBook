import { Request, Response } from "express";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { DeletePlayerByIdUseCase } from "./deletePlayerById.usecase";

export class DeletePlayerByIdController {
  constructor(private playerRepository: IPlayerRepository) {}
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletePlayerByIdUseCase = new DeletePlayerByIdUseCase(
        this.playerRepository
      );
      const deletedPlayer = deletePlayerByIdUseCase.execute(id);
      res.json(deletedPlayer);
    } catch (err: any) {
      res.status(401).json({
        message: err.message,
      });
    }
  }
}
