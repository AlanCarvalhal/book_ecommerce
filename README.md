# Descrição

Este projeto representa uma API de consulta de livros desenvolvida para compor a camada de leitura de um e-commerce. A aplicação tem como objetivo buscar livros armazenados em uma base de dados, permitindo consultar informações como título, autor, categoria, preço e disponibilidade de forma rápida e organizada.

A arquitetura foi pensada para separar responsabilidades de forma clara, com uma camada de modelos, configuração de banco de dados e rotas de consulta, facilitando a manutenção e evolução do sistema. O projeto também conta com testes automatizados para validar o comportamento principal da API e garantir maior confiabilidade nas alterações futuras.

Além disso, a aplicação pode ser iniciada de forma simples tanto em ambiente local quanto via Docker, utilizando Docker Compose para disponibilizar a API e o banco de dados em um ambiente padronizado e reproduzível.

# Tecnologias Utilizadas

- Node.js (versão LTS)
- TypeScript
- MongoDB
- Docker
- Docker Compose
- Git
- GitHub
- Husky
- Prettier
- ESLint

# Arquitetura

A estrutura atual do projeto é organizada em diretórios com responsabilidades bem definidas:

- **src/**: diretório principal da aplicação, onde ficam os arquivos de implementação da API.
  - **config/**: contém a configuração da aplicação, incluindo a conexão com o MongoDB.
  - **models/**: armazena os modelos de dados da aplicação, como a definição do livro no Mongoose.
  - **utils/**: reúne utilidades e scripts auxiliares, como o processo de seed do banco.
  - **data/**: guarda dados estáticos utilizados pela aplicação, como o arquivo JSON com livros iniciais.

Essa organização tem como objetivo separar as responsabilidades da aplicação, deixando mais claro onde ficam a configuração, os modelos e os dados utilizados para inicializar o sistema.

# Requisitos para execução

Para executar o projeto, são necessários:

- Node.js 20 ou superior
- npm
- MongoDB local ou Docker
- Docker Compose (opcional, para execução em containers)

# Instruções para execução local

1. Instale as dependências:
   npm install

2. Configure as variáveis de ambiente, caso necessário:
   - PORT=3000
   - MONGO_URI=mongodb://localhost:27017/book_ecommerce

3. Inicie o servidor em modo de desenvolvimento:
   npm run dev

4. A aplicação ficará disponível em http://localhost:3000.

> Observação: o projeto já possui a estrutura para conexão e seed no MongoDB, porém a implementação completa das rotas de consulta ainda pode ser expandida.

# Instruções para execução via Docker

1. Certifique-se de que o Docker e o Docker Compose estão instalados.

2. Na raiz do projeto, execute:
   docker compose up --build

3. A API ficará disponível em http://localhost:3000 e o MongoDB em http://localhost:27017.

4. Para encerrar os containers, execute:
   docker compose down

# Execução dos testes

# Variáveis de ambiente

# Decisões arquiteturais

# Possíveis melhorias futuras
