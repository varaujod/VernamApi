import { CifrarRequest, DecifrarRequest, VernamModel } from '../model/VernamModel.js';

export class VernamService {
  public cifrar({ textoClaro, chave }: CifrarRequest): VernamModel {
    if (!textoClaro || !chave) {
      throw new Error('Os campos textoClaro e chave são obrigatórios.');
    }

    const textoClaroBuffer = Buffer.from(textoClaro, 'utf-8');
    const chaveBuffer = Buffer.from(chave, 'utf-8');

    if (chaveBuffer.length !== textoClaroBuffer.length) {
      throw new Error('A chave deve ter exatamente o mesmo tamanho (em bytes) do textoClaro.');
    }

    const cifradoBuffer = this.applyXor(textoClaroBuffer, chaveBuffer);
    const textoCifradoBinario = this.bufferToBinary(cifradoBuffer);

    return new VernamModel({
      textoClaro,
      textoCifrado: textoCifradoBinario,
      chave
    });
  }

  public decifrar({ textoCifrado, chave }: DecifrarRequest): VernamModel {
    if (!textoCifrado || !chave) {
      throw new Error('Os campos textoCifrado e chave são obrigatórios.');
    }

    if (!/^[01]+$/.test(textoCifrado) || textoCifrado.length % 8 !== 0) {
      throw new Error('O textoCifrado deve ser uma string binária válida (múltipla de 8 bits).');
    }

    const cifradoBuffer = this.binaryToBuffer(textoCifrado);
    const chaveBuffer = Buffer.from(chave, 'utf-8');

    if (chaveBuffer.length !== cifradoBuffer.length) {
      throw new Error('A chave deve ter exatamente o mesmo tamanho (em bytes) do textoCifrado.');
    }

    const textoClaroBuffer = this.applyXor(cifradoBuffer, chaveBuffer);

    return new VernamModel({
      textoClaro: textoClaroBuffer.toString('utf-8'),
      textoCifrado,
      chave
    });
  }

  private bufferToBinary(buffer: Buffer): string {
    let binary = '';
    for (let i = 0; i < buffer.length; i++) {
      binary += buffer[i].toString(2).padStart(8, '0');
    }
    return binary;
  }


  private binaryToBuffer(binary: string): Buffer {
    const byteLength = binary.length / 8;
    const buffer = Buffer.alloc(byteLength);

    for (let i = 0; i < byteLength; i++) {
      const byteBits = binary.slice(i * 8, i * 8 + 8);
      buffer[i] = parseInt(byteBits, 2);
    }

    return buffer;
  }

  private applyXor(dataBuffer: Buffer, keyBuffer: Buffer): Buffer {
    const resultBuffer = Buffer.alloc(dataBuffer.length);

    for (let i = 0; i < dataBuffer.length; i++) {
      resultBuffer[i] = dataBuffer[i] ^ keyBuffer[i];
    }

    return resultBuffer;
  }
}