# Book E-commerce API

Este projeto representa uma API de consulta de livros desenvolvida para compor a camada de leitura de um e-commerce. A aplicação tem como objetivo buscar livros armazenados em uma base de dados, permitindo consultar informações como título, autor, categoria, preço e disponibilidade de forma rápida e organizada.

A arquitetura foi pensada para separar responsabilidades de forma clara, com uma camada de modelos, configuração de banco de dados e rotas de consulta, facilitando a manutenção e evolução do sistema. O projeto também conta com testes automatizados para validar o comportamento principal da API e garantir maior confiabilidade nas alterações futuras.

Além disso, a aplicação pode ser iniciada de forma simples tanto em ambiente local quanto via Docker, utilizando Docker Compose para disponibilizar a API e o banco de dados em um ambiente padronizado e reproduzível.

---

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **MongoDB**
- **Redis**
- **Docker**
- **Docker Compose**
- **Swagger**
- **Jest**
- **class-validator**
- **class-transformer**
- **Husky**
- **commitlint**
- **ESLint**
- **Prettier**

---

## Arquitetura

O projeto adota uma estrutura em camadas para garantir que cada componente possua uma única responsabilidade:

- **`src/config/`**: Configurações gerais da aplicação (ex: conexão com o banco de dados).
- **`src/models/`**: Definição dos Schemas do Mongoose que representam a coleção de dados no MongoDB.
- **`src/repositories/`**: Abstração da persistência de dados. Toda interação com o banco de dados é feita aqui, desacoplando os modelos dos controllers.
- **`src/controllers/`**: Recepção de requisições, invocação da lógica necessária e formulação das respostas HTTP.
- **`src/dtos/`**: Objetos de Transferência de Dados (DTOs) que definem o formato aceito na entrada e regras de validação.
- **`src/middlewares/`**: Middlewares Express para validação automatizada de DTOs nas requisições.
- **`src/routes/`**: Definição das rotas e mapeamento para os devidos controllers e middlewares.
- **`src/utils/`**: Utilitários gerais e scripts de automação, como o script de _seed_.
- **`src/data/`**: Arquivos de dados estáticos para carga inicial.

---

## Endpoints e Recursos Disponibilizados

### 1. Health Check

Endpoint simples para verificar a disponibilidade da API.

- **URL**: `GET /health`
- **Resposta**:
  ```json
  {
    "status": "UP"
  }
  ```

### 2. Consultar livro por ID

- **URL**: `GET /livros/:id`
- **Validação**: O parâmetro `:id` é validado automaticamente e deve ser um UUIDv4 válido.
- **Resposta (200 OK)**:
  ```json
  {
    "id": "3ecc868c-1ca9-4468-a567-5c810fd16e99",
    "titulo": "Clean Code",
    "autor": "Robert C. Martin",
    "isbn": "9780132350884",
    "editora": "Prentice Hall",
    "anoPublicacao": 2008,
    "categorias": ["Programação", "Engenharia de Software"],
    "preco": 243.65,
    "estoque": 46,
    "resumo": "Livro sobre programação...",
    "dataCadastro": "2024-12-04T01:03:20.148Z"
  }
  ```
- **Erro (404 Not Found)**:
  ```json
  {
    "message": "Livro não encontrado."
  }
  ```

### 3. Listagem, Busca e Filtros

- **URL**: `GET /livros`
- **Parâmetros de Consulta (Query Params)**:
  - `titulo` (opcional): Busca parcial e _case-insensitive_ pelo título do livro.
  - `resumo` (opcional): Busca parcial e _case-insensitive_ no resumo do livro.
  - `page` (opcional, padrão `1`): Página a ser visualizada para paginação.
  - `limit` (opcional, padrão `10`): Limite de registros por página.
  - `sortBy` (opcional): Ordenar por um dos seguintes campos: `titulo`, `preco` ou `anoPublicacao`.
  - `sortOrder` (opcional, padrão `asc`): Direção da ordenação (`asc` ou `desc`).
- **Resposta (200 OK)**:
  ```json
  {
    "total": 120,
    "limit": 10,
    "page": 1,
    "totalPages": 12,
    "result": [
      {
        "id": "...",
        "titulo": "...",
        "autor": "...",
        ...
      }
    ]
  }
  ```

### 4. Documentação Swagger

- **URL**: `GET /api-docs`
- A aplicação já inclui documentação Swagger gerada a partir das rotas.

---

## Variáveis de Ambiente

As configurações da aplicação podem ser controladas através das seguintes variáveis de ambiente:

| Variável    | Descrição                                   | Padrão                                     |
| ----------- | ------------------------------------------- | ------------------------------------------ |
| `PORT`      | Porta em que a API ficará escutando         | `3000`                                     |
| `MONGO_URI` | URI de conexão com o banco de dados MongoDB | `mongodb://localhost:27017/book_ecommerce` |
| `REDIS_URL` | URI de conexão com o cache Redis            | `redis://localhost:6379`                   |
| `NODE_ENV`  | Modo de execução do ambiente                | `development`                              |

---

## Requisitos para Execução

Para rodar o projeto localmente você precisará de:

- **Node.js** v20 ou superior
- **npm** v10 ou superior
- **MongoDB** rodando localmente (caso não use o Docker)
- **Redis** rodando localmente (caso não use o Docker)
- **Docker** & **Docker Compose** (caso prefira rodar via containers)

---

## Instruções para Execução

### Opção A: Execução via Docker (Recomendada)

Para subir o banco de dados MongoDB e a API Express juntos de forma automática:

1. Na raiz do projeto, execute o comando:
   ```bash
   docker compose up --build
   ```
2. A API ficará disponível em `http://localhost:3000`.
3. O MongoDB iniciará na porta `27017`.
4. Para parar os containers, execute:
   ```bash
   docker compose down
   ```

### Opção B: Execução Local

1. Instale as dependências da aplicação:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente necessárias (como a `MONGO_URI` apontando para sua instância do MongoDB).
3. Inicie o servidor em modo de desenvolvimento (recarrega automaticamente nas alterações de arquivos):
   ```bash
   npm run dev
   ```
4. A API estará acessível em `http://localhost:3000`.

> **Carga de Dados Automática (_Seed_)**: Durante a primeira inicialização (tanto via Docker quanto local), a aplicação verificará se a coleção `books` está populada. Caso esteja vazia, ela executará o script de _seed_ inserindo automaticamente os livros fictícios a partir de `src/data/books.json` na base de dados.

> **Nota**: o serviço Redis também é inicializado pelo `docker compose up` e é utilizado pela aplicação para cache. Localmente, configure `REDIS_URL` ou inicie o Redis manualmente.

---

## Execução dos Testes

O projeto conta com uma suíte de testes unitários para todas as camadas principais da aplicação (Controllers, Services, Repositories e Models), desenvolvidos utilizando o Jest. A cobertura atual é de **86.95%** no total, com **100%** de cobertura no arquivo `src/models/Book.ts`.

Para executar a suíte de testes:

```bash
npm run test
```

Para rodar os testes em modo de observação (_watch_):

```bash
npm run test:watch
```

E para gerar o relatório de cobertura de código (cobertura mínima exigida de **70%**):

```bash
npm run test:cov
```

---

## Decisões Arquiteturais

1. **Separação de Responsabilidades (Repository Pattern)**: As consultas ao banco MongoDB foram isoladas na camada de `Repository`. Isso evita acoplar os controllers ao Mongoose, facilitando a substituição da base de dados futuramente ou a criação de mocks para testes unitários.
2. **Validação Antecipada com DTOs**: Criamos um middleware genérico de validação (`validateDto`) utilizando as bibliotecas `class-validator` e `class-transformer`. Qualquer requisição fora do contrato estabelecido nos DTOs é rejeitada imediatamente com `400 Bad Request` antes de chegar no controller.
3. **Carga Inicial Automatizada**: Para garantir a facilidade de avaliação do projeto, o script de _seed_ é executado automaticamente ao conectar ao banco de dados se a coleção estiver vazia, dispensando passos manuais adicionais.
4. **Standardização de Código**: A adoção de ferramentas como ESLint, Prettier, Husky e commitlint garante que todo código commitado siga as mesmas boas práticas de formatação e que as mensagens de commits sigam o padrão _Conventional Commits_.

---

## Possíveis Melhorias Futuras

- [ ] **Logs Estruturados**: Implementar o logger `pino` para gerar logs limpos e estruturados em formato JSON, facilitando a observabilidade em ambientes de produção.
- [ ] **Pipeline de CI/CD**: Criar uma pipeline do GitHub Actions para validar o build, linter e rodar a suíte de testes a cada pull request.
