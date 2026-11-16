# API Cifra de Vernam

API desenvolvida em **Node.js**, **TypeScript** e **Express** para cifrar e decifrar mensagens utilizando a **Cifra de Vernam** (operação lógica XOR bit a bit), conforme a especificação OpenAPI/Swagger proposta na disciplina de Segurança da Informação (IFSP).

* **Repositório oficial:** [https://github.com/varaujod/VernamApi](https://github.com/varaujod/VernamApi)

## Integrantes do Grupo

* **Bruna Serra Amorim**
* **Vinicius Araujo Domingues**

## Pré-requisitos

Para executar o projeto localmente, certifique-se de ter instalado em sua máquina:

* [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
* `npm` (gerenciador de pacotes instalado junto com o Node.js)

## Como Executar o Projeto Localmente

1. **Obtenha o código-fonte** clonando o repositório ou extraindo o arquivo `.zip`, e acesse a pasta raiz:

   ```bash
   git clone https://github.com/varaujod/VernamApi.git
   cd VernamApi
   ```

2. **Instale as dependências** do projeto:

   ```bash
   npm install
   ```

3. **Compile o código TypeScript** para JavaScript:

   ```bash
   npm run build
   ```

4. **Inicie o servidor**:

   ```bash
   npm start
   ```

   *(Caso o projeto possua script de desenvolvimento configurado, também é possível executar diretamente com `npm run dev`.)*

5. O servidor estará disponível localmente em:

   ```text
   http://localhost:3000
   ```

## Documentação Interativa (Swagger UI)

Com a API em execução, você pode visualizar e testar todos os endpoints diretamente pelo navegador através da interface do Swagger (verifique a rota configurada no servidor, geralmente):

* `http://localhost:3000/api-docs` *(ou `http://localhost:3000/docs`)*

## Endpoints Disponíveis

### 1. Cifrar Mensagem

* **Rota:** `POST /cifrar`
* **Descrição:** Recebe um texto claro e uma chave de mesmo tamanho (em bytes) e retorna o texto cifrado em representação binária (8 bits por byte).

**Exemplo de Requisição (`application/json`):**

```json
{
  "textoClaro": "OLA",
  "chave": "CHT"
}
```

**Exemplo de Resposta (`200 OK`):**

```json
{
  "textoCifrado": "000011000000010000010101"
}
```

### 2. Decifrar Mensagem

* **Rota:** `POST /decifrar`
* **Descrição:** Recebe uma string binária cifrada (múltipla de 8 bits) e a mesma chave utilizada na cifragem para recuperar o texto original.

**Exemplo de Requisição (`application/json`):**

```json
{
  "textoCifrado": "000011000000010000010101",
  "chave": "CHT"
}
```

**Exemplo de Resposta (`200 OK`):**

```json
{
  "textoClaro": "OLA"
}
```

### Tratamento de Erros (`400 Bad Request`)

Caso os campos obrigatórios não sejam informados, a chave não possua exatamente o mesmo tamanho em bytes da mensagem ou o texto cifrado não seja um binário válido múltiplo de 8 bits, a API retornará status `400`:

```json
{
  "erro": "A chave deve ter exatamente o mesmo tamanho (em bytes) do textoClaro."
}
```
