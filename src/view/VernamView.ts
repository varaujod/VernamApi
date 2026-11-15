import { VernamModel } from '../model/VernamModel.js';

export class VernamView {
  public static renderCifrar(data: VernamModel) {
    return {
      textoCifrado: data.textoCifrado
    };
  }

  public static renderDecifrar(data: VernamModel) {
    return {
      textoClaro: data.textoClaro
    };
  }

  public static renderError(mensagemErro: string) {
    return {
      erro: mensagemErro
    };
  }
}