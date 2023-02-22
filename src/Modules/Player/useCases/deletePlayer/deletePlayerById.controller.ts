import { Request, Response } from "express";
import { IPlayerGamesRepository } from "../../../../Repository/interfaces/IPlayerGamesRepository";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { DeletePlayerByIdUseCase } from "./deletePlayerById.usecase";

export class DeletePlayerByIdController {
  constructor(
    private playerRepository: IPlayerRepository,
    private playerGamesRepository: IPlayerGamesRepository
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletePlayerByIdUseCase = new DeletePlayerByIdUseCase(
        this.playerRepository,
        this.playerGamesRepository
      );
      const deletedPlayer = await deletePlayerByIdUseCase.execute(id);
      res.json(deletedPlayer);
    } catch (err: any) {
      res.status(401).json({
        message: err.message,
      });
    }
  }
}
