export interface CifrarRequest {
  textoClaro: string;
  chave: string;
}

export interface DecifrarRequest {
  textoCifrado: string;
  chave: string;
}

export class VernamModel {
  public readonly textoClaro: string;
  public readonly textoCifrado: string;
  public readonly chave: string;

  constructor(params: {
    textoClaro: string;
    textoCifrado: string;
    chave: string;
  }) {
    this.textoClaro = params.textoClaro;
    this.textoCifrado = params.textoCifrado;
    this.chave = params.chave;
  }
}