import { randomInt } from 'node:crypto';
import { DecryptDTO, EncryptDTO, VernamModel } from '../model/VernamModel.js';

export class VernamService {
  public encrypt({ message, key }: EncryptDTO): VernamModel {
    if (!message) {
      throw new Error('A mensagem é obrigatória.');
    }

    const messageBuffer = Buffer.from(message, 'utf-8');
    const finalKey = key && key.trim().length > 0
      ? key
      : this.generateRandomKey(messageBuffer.length);

    const keyBuffer = Buffer.from(finalKey, 'utf-8');

    if (keyBuffer.length < messageBuffer.length) {
      throw new Error('A chave deve ter tamanho (em bytes) igual ou superior ao da mensagem.');
    }

    const cipherBuffer = this.applyXor(messageBuffer, keyBuffer);

    return new VernamModel({
      message,
      ciphertext: cipherBuffer.toString('hex'),
      key: finalKey,
      format: 'hex'
    });
  }

  public decrypt({ ciphertext, key }: DecryptDTO): VernamModel {
    if (!ciphertext || !key) {
      throw new Error('Texto cifrado e chave são obrigatórios.');
    }

    if (!/^[0-9a-fA-F]+$/.test(ciphertext) || ciphertext.length % 2 !== 0) {
      throw new Error('O texto cifrado deve estar em formato hexadecimal válido.');
    }

    const cipherBuffer = Buffer.from(ciphertext, 'hex');
    const keyBuffer = Buffer.from(key, 'utf-8');

    if (keyBuffer.length < cipherBuffer.length) {
      throw new Error('A chave deve ter tamanho igual ou superior ao do texto cifrado.');
    }

    const plainBuffer = this.applyXor(cipherBuffer, keyBuffer);

    return new VernamModel({
      message: plainBuffer.toString('utf-8'),
      ciphertext,
      key,
      format: 'hex'
    });
  }
  private generateRandomKey(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let generated = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = randomInt(0, charset.length);
      generated += charset[randomIndex];
    }

    return generated;
  }

  private applyXor(dataBuffer: Buffer, keyBuffer: Buffer): Buffer {
    const resultBuffer = Buffer.alloc(dataBuffer.length);

    for (let i = 0; i < dataBuffer.length; i++) {
      resultBuffer[i] = dataBuffer[i] ^ keyBuffer[i];
    }

    return resultBuffer;
  }
}