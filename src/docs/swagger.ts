export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Cifra de Vernam - IFSP Boituva',
    version: '1.0.0',
    description:
      'API REST para encriptação e decriptação de mensagens utilizando a Cifra de Vernam (operação XOR bit a bit).'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local'
    }
  ],
  tags: [
    {
      name: 'Criptografia',
      description: 'Operações de cifragem e decifragem via Cifra de Vernam'
    },
    {
      name: 'Status',
      description: 'Verificação de disponibilidade da API'
    }
  ],
  paths: {
    '/': {
      get: {
        tags: ['Status'],
        summary: 'Verifica se a API está online',
        responses: {
          '200': {
            description: 'API operacional',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'online' },
                    architecture: { type: 'string', example: 'MSCV' },
                    service: {
                      type: 'string',
                      example: 'API Cifra de Vernam - IFSP Boituva'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/cifrar': {
      post: {
        tags: ['Criptografia'],
        summary: 'Cifra uma mensagem usando a Cifra de Vernam',
        description:
          'Aplica XOR byte a byte entre a mensagem e a chave (a chave deve ter tamanho maior ou igual ao da mensagem). Também acessível via /encrypt e /criptografar.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EncryptRequest'
              },
              examples: {
                exemploSlide: {
                  summary: 'Exemplo do slide (OLA + CHT)',
                  value: {
                    mensagem: 'OLA',
                    chave: 'CHT'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Mensagem cifrada com sucesso (saída em hexadecimal)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EncryptResponse'
                }
              }
            }
          },
          '400': {
            description: 'Erro de validação (campos ausentes ou chave menor que a mensagem)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      }
    },
    '/decifrar': {
      post: {
        tags: ['Criptografia'],
        summary: 'Decifra uma mensagem hexadecimal usando a Cifra de Vernam',
        description:
          'Recebe o texto cifrado em hexadecimal e aplica XOR byte a byte com a chave original. Também acessível via /decrypt e /descriptografar.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DecryptRequest'
              },
              examples: {
                exemploSlide: {
                  summary: 'Exemplo do slide (0c0415 + CHT -> OLA)',
                  value: {
                    texto_cifrado: '0c0415',
                    chave: 'CHT'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Mensagem decifrada com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DecryptResponse'
                }
              }
            }
          },
          '400': {
            description: 'Erro de validação (hexadecimal inválido ou chave curta)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      }
    },
  components: {
    schemas: {
      EncryptRequest: {
        type: 'object',
        required: ['mensagem', 'chave'],
        properties: {
          mensagem: {
            type: 'string',
            description: 'Texto claro a ser cifrado',
            example: 'OLA'
          },
          chave: {
            type: 'string',
            description: 'Chave com tamanho maior ou igual ao da mensagem',
            example: 'CHT'
          }
        }
      },
      EncryptResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'OLA' },
          mensagem: { type: 'string', example: 'OLA' },
          key: { type: 'string', example: 'CHT' },
          chave: { type: 'string', example: 'CHT' },
          ciphertext: { type: 'string', example: '0c0415' },
          texto_cifrado: { type: 'string', example: '0c0415' },
          format: { type: 'string', example: 'hex' }
        }
      },
      DecryptRequest: {
        type: 'object',
        required: ['texto_cifrado', 'chave'],
        properties: {
          texto_cifrado: {
            type: 'string',
            description: 'Texto cifrado em formato hexadecimal',
            example: '0c0415'
          },
          chave: {
            type: 'string',
            description: 'Mesma chave utilizada na cifragem',
            example: 'CHT'
          }
        }
      },
      DecryptResponse: {
        type: 'object',
        properties: {
          ciphertext: { type: 'string', example: '0c0415' },
          texto_cifrado: { type: 'string', example: '0c0415' },
          key: { type: 'string', example: 'CHT' },
          chave: { type: 'string', example: 'CHT' },
          decrypted: { type: 'string', example: 'OLA' },
          mensagem_descriptografada: { type: 'string', example: 'OLA' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'A chave deve ter tamanho (em bytes) igual ou superior ao da mensagem.'
          },
          erro: {
            type: 'string',
            example: 'A chave deve ter tamanho (em bytes) igual ou superior ao da mensagem.'
          }
        }
      }
    }
  }
}

}