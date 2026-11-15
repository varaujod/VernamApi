import { Request, Response } from 'express';
import { VernamService } from '../service/VernamService.js';
import { VernamView } from '../view/VernamView.js';

export class VernamController {
  private vernamService: VernamService;

  constructor(vernamService: VernamService = new VernamService()) {
    this.vernamService = vernamService;
  }

  public encrypt = (req: Request, res: Response): Response => {
    try {
      const { textoClaro, chave } = req.body;
      const result = this.vernamService.cifrar({ textoClaro, chave });

      return res.status(200).json(VernamView.renderCifrar(result));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Requisição inválida.';
      return res.status(400).json(VernamView.renderError(errorMessage));
    }
  };

  public decrypt = (req: Request, res: Response): Response => {
    try {
      const { textoCifrado, chave } = req.body;
      const result = this.vernamService.decifrar({ textoCifrado, chave });

      return res.status(200).json(VernamView.renderDecifrar(result));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Requisição inválida.';
      return res.status(400).json(VernamView.renderError(errorMessage));
    }
  };
}