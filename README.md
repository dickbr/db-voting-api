# DB-Vote-API

DB-Vote-API é uma API de backend construída usando o framework Nest.js. Ela foi projetada para gerenciar votos em vários tópicos, permitindo que os usuários criem, atualizem e excluam tópicos, bem como votem neles. A API também fornece funcionalidades de autenticação e gerenciamento de sessões.

## Tecnologias

- **Nest.js**: O principal framework utilizado para construir a API.
- **TypeScript**: A linguagem de programação utilizada.
- **PostgreSQL**: O banco de dados para armazenar os dados.
- **TypeORM**: A biblioteca ORM para operações de banco de dados.
- **Jest**: O framework de teste para testes unitários e de integração.

## Como Começar

### Pré-requisitos

- Node.js
- PostgreSQL

### Instalação

1. Clone o repositório:
```bash 
git clone https://github.com/dickbr/db-voting-api.git && cd db-voting-api
```

2. Instale as dependências:
```bash 
yarn install
```

3. Configure seu arquivo `.env` com base no `.env.example` fornecido no projeto.

4. Execute as migrações do banco de dados (produção):
```bash 
yarn typeorm migration:run
```
ou migrações (desenvolvimento):
```bash
yarn typeorm migration:run:dev
```
5. Inicie o servidor de desenvolvimento:
```bash
yarn start dev
```

## Uso

Após iniciar o servidor, você pode acessar os endpoints da API em `http://localhost:3001/api/v1`.

Por exemplo, para listar todos os tópicos:
```bash 
curl http://localhost:3001/api/v1/topics
```

## Endpoints da API

### Autenticação

#### POST /auth
Autentica um usuário e gera tokens.

**Parâmetros:**
- `email`: E-mail do usuário.
- `senha`: Senha do usuário.

**Resposta:**
- `access_token`: Token de acesso para o usuário autenticado.
- `refresh_token`: Token de atualização para o usuário autenticado.

### Gerenciamento de Clientes

#### POST /clients
Cria um novo cliente.

**Parâmetros:**
- `cpf`: CPF do cliente.

**Resposta:**
- `cliente`: Detalhes do novo cliente criado.

### Gerenciamento de Sessões

#### POST /sessions
Cria uma nova sessão.

**Parâmetros:**
- `titulo`: Título da sessão.
- `tempo_sessao`: Tempo da sessão (opcional). Por padrão é 1 se não for fornecido.

**Resposta:**
- `sessao`: Detalhes da nova sessão criada.

#### DELETE /sessions/:id
Exclui uma sessão existente.

**Parâmetros:**
- `id`: ID da sessão a ser excluída.

**Resposta:**
- Não há retorno esperado para esta chamada. Se a sessão for encontrada e deletada com sucesso, um código de status HTTP 200 é retornado. Caso contrário, uma mensagem de erro é retornada.


#### POST /sessions/:session_id/votes
Cria um novo voto para uma sessão específica.

**Parâmetros:**
- `session_id`: ID da sessão para a qual o voto deve ser criado.
- `client_id`: ID do cliente que está votando.
- `topic_id`: ID do tópico que está sendo votado.
- `choice`: Escolha do cliente (verdadeiro para sim, falso para não).

**Resposta:**
- `vote`: Detalhes do voto criado.

### Gerenciamento de Usuários Administradores

#### POST /users/admin
Cria um novo usuário administrador.

Este endpoint é protegido e só pode ser acessado por usuários autenticados com privilégios de administrador. O usuário administrador é criado automaticamente quando este endpoint é chamado pela primeira vez.

**Parâmetros:**
- `email`: E-mail do usuário administrador.
- `cpf`: CPF do usuário administrador.
- `senha`: Senha do usuário administrador.

**Resposta:**
- Não há retorno esperado para esta chamada. Se o usuário administrador for criado com sucesso, um código de status HTTP 200 é retornado. Caso contrário, uma mensagem de erro é retornada.

### Gerenciamento de Tópicos

#### POST /sessions/:session_id/topics
Cria um novo tópico para uma sessão específica.

**Parâmetros:**
- `session_id`: ID da sessão para a qual o tópico deve ser criado.
- `titulo`: Título do tópico.

**Resposta:**
- `topico`: Detalhes do tópico criado.

#### PUT /topics/:id
Atualiza um tópico existente.

**Parâmetros:**
- `id`: ID do tópico a ser atualizado.
- `titulo`: Novo título do tópico.

**Resposta:**
- `topico`: Detalhes do tópico atualizado.

#### GET /sessions/:session_id/topics
Lista todos os tópicos de uma sessão específica.

**Parâmetros:**
- `session_id`: ID da sessão cujos tópicos devem ser listados.

**Resposta:**
- `topicos`: Lista de detalhes dos tópicos da sessão.

#### DELETE /topics/:id
Exclui um tópico existente.

**Parâmetros:**
- `id`: ID do tópico a ser excluído.

**Resposta:**
- Não há retorno esperado para esta chamada. Se o tópico for encontrado e excluído com sucesso, um código de status HTTP 200 é retornado. Caso contrário, uma mensagem de erro é retornada.

#### PUT /sessions/:id
Atualiza uma sessão existente.

**Parâmetros:**
- `id`: ID da sessão a ser atualizada.
- `titulo`: Novo título da sessão.

**Resposta:**
- Não há retorno esperado para esta chamada. Se a sessão for encontrada e atualizada com sucesso, um código de status HTTP 200 é retornado. Caso contrário, uma mensagem de erro é retornada.


## Contribuindo

Contribuições são bem-vindas! Por favor, siga estas etapas para contribuir:

1. Faça um fork do repositório.
2. Crie uma nova branch: `git checkout -b feature/nome-da-sua-funcionalidade`.
3. Faça suas alterações e faça commit delas: `git commit -m 'Adiciona alguma funcionalidade'`.
4. Envie para a branch: `git push origin feature/nome-da-sua-funcionalidade`.
5. Faça um pull request.

## Versionamento

Este projeto utiliza o [Semantic Versioning](https://semver.org/) para controle de versão. As versões são incrementadas automaticamente com base nas mudanças feitas no código.

É importante notar que outras estratégias de versionamento podem ser aplicadas conforme as necessidades do projeto. Por exemplo, o uso de tags Git para marcar releases específicas ou a implementação de um sistema de versionamento mais complexo que leve em conta diferentes ramificações e ciclos de vida dos recursos.

Quando contribuir para este projeto, é recomendável seguir as convenções de versionamento estabelecidas para garantir a consistência e facilitar o rastreamento das mudanças ao longo do tempo.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

Jean Pierre
