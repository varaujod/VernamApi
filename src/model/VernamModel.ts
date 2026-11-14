export interface EncryptDTO {
  message: string;
  key?: string;
}

export interface DecryptDTO {
  ciphertext: string;
  key: string;
}

export class VernamModel {
  public readonly message: string;
  public readonly ciphertext: string;
  public readonly key: string;
  public readonly format: string;

  constructor(params: {
    message: string;
    ciphertext: string;
    key: string;
    format?: string;
  }) {
    this.message = params.message;
    this.ciphertext = params.ciphertext;
    this.key = params.key;
    this.format = params.format ?? 'hex';
  }
}