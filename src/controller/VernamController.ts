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
      const message = req.body.message || req.body.mensagem || req.body.texto || req.body.text;
      const key = req.body.key || req.body.chave;

      const result = this.vernamService.encrypt({ message, key });
      return res.status(200).json(VernamView.renderEncrypt(result));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao cifrar mensagem.';
      return res.status(400).json(VernamView.renderError(errorMessage));
    }
  };

  public decrypt = (req: Request, res: Response): Response => {
    try {
      const ciphertext = req.body.ciphertext || req.body.texto_cifrado || req.body.message || req.body.mensagem;
      const key = req.body.key || req.body.chave;

      const result = this.vernamService.decrypt({ ciphertext, key });
      return res.status(200).json(VernamView.renderDecrypt(result));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao decifrar mensagem.';
      return res.status(400).json(VernamView.renderError(errorMessage));
    }
  };
}