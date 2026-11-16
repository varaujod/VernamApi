export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'API Cifra de Vernan - Bruna Serra Amorim e Vinicius Araujo Domingues',
        version: '1.0.0',
        description: 'API para cifrar e decifrar mensagens utilizando a Cifra de Vernam usando Typescript/express e Node.js.'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor Local'
        }
    ],
    paths: {
        '/cifrar': {
            post: {
                summary: 'Cifra uma mensagem usando a Cifra de Vernan',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CifrarRequest'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Mensagem cifrada com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/CifrarResponse'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Requisição inválida',
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
                summary: 'Decifra uma mensagem cifrada usando a Cifra de Vernan',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/DecifrarRequest'
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
                                    $ref: '#/components/schemas/DecifrarResponse'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Requisição inválida',
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
        }
    },
    components: {
        schemas: {
            CifrarRequest: {
                type: 'object',
                required: ['textoClaro', 'chave'],
                properties: {
                    textoClaro: {
                        type: 'string',
                        example: 'OLA'
                    },
                    chave: {
                        type: 'string',
                        example: 'CHT'
                    }
                }
            },
            CifrarResponse: {
                type: 'object',
                properties: {
                    textoCifrado: {
                        type: 'string',
                        example: '000011000000010000010101'
                    }
                }
            },
            DecifrarRequest: {
                type: 'object',
                required: ['textoCifrado', 'chave'],
                properties: {
                    textoCifrado: {
                        type: 'string',
                        example: '000011000000010000010101'
                    },
                    chave: {
                        type: 'string',
                        example: 'CHT'
                    }
                }
            },
            DecifrarResponse: {
                type: 'object',
                properties: {
                    textoClaro: {
                        type: 'string',
                        example: 'OLA'
                    }
                }
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    erro: {
                        type: 'string',
                        example: 'Requisição inválida'
                    }
                }
            }
        }
    }
};
