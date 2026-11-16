import { VernamService } from '../service/VernamService.js';
import { VernamView } from '../view/VernamView.js';
export class VernamController {
    vernamService;
    constructor(vernamService = new VernamService()) {
        this.vernamService = vernamService;
    }
    encrypt = (req, res) => {
        try {
            const { textoClaro, chave } = req.body;
            const result = this.vernamService.cifrar({ textoClaro, chave });
            return res.status(200).json(VernamView.renderCifrar(result));
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Requisição inválida.';
            return res.status(400).json(VernamView.renderError(errorMessage));
        }
    };
    decrypt = (req, res) => {
        try {
            const { textoCifrado, chave } = req.body;
            const result = this.vernamService.decifrar({ textoCifrado, chave });
            return res.status(200).json(VernamView.renderDecifrar(result));
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Requisição inválida.';
            return res.status(400).json(VernamView.renderError(errorMessage));
        }
    };
}
