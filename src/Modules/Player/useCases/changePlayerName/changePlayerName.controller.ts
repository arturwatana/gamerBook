import { Request, Response } from "express";
import { IPlayerRepository } from "../../../../Repository/interfaces/IPlayerRepository";
import { ChangePlayerNameUseCase } from "./changePlayerName.usecase";

export class ChangePlayerNameController {
  constructor(private playersRepository: IPlayerRepository) {}
  async handle(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const { name } = req.body;

      if (!name || name.length <= 1) {
        throw new Error("Please enter a valid name");
      }
      const changePlayerNameUseCase = new ChangePlayerNameUseCase(
        this.playersRepository
      );
      const playerWithNameChanged = await changePlayerNameUseCase.execute(
        email,
        name
      );
      res.json(playerWithNameChanged);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
