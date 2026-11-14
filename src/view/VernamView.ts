import { VernamModel } from '../model/VernamModel.js';

export class VernamView {
  public static renderEncrypt(data: VernamModel) {
    return {
      message: data.message,
      mensagem: data.message,
      key: data.key,
      chave: data.key,
      ciphertext: data.ciphertext,
      texto_cifrado: data.ciphertext,
      format: data.format
    };
  }

  public static renderDecrypt(data: VernamModel) {
    return {
      ciphertext: data.ciphertext,
      texto_cifrado: data.ciphertext,
      key: data.key,
      chave: data.key,
      decrypted: data.message,
      mensagem_descriptografada: data.message
    };
  }

  public static renderError(errorMessage: string) {
    return {
      error: errorMessage,
      erro: errorMessage
    };
  }
}