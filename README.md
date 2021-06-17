# Teste de Admissão - DFCom

Arthur Henrique Verdadeiro

## Objetivos

- Criar uma API de produtos aleatórios em Node.js e comunicar-se com ela via ReactJS

### Instalando o Banco de Dados.

- Os arquivos gerados pelo comando `mongodump` estão no diretório dump/teste-dfcom, e podem ser diretamente importados para um servidor próprio, executando o comando `mongorestore` 
- Opcionalmente, a API conta com uma rota `/install`, que com o auxílio da API "Faker.js" popula o banco com dados aleatórios.
- O sistema conta com um único usuário cadastrado, com o email "arthur.hvs@gmail.com" e senha "banana" 

### Rodando a Aplicação

`npm run prod`

- O script "prod" faz o deploy "daemonizado" da aplicação (server.js e build/) nas portas 3000 (frontend) e 8080 (API)

### EndPoints da API

#### `GET /todos`
- Rota usada pelo React para renderizar os produtos. Busca os documentos no banco de dados e os retorna no formato JSON

#### `POST /login`
- Rota usada para logar o usuário.
- Recebe um objeto JSON no formato {username:"nome", password:"senha"}
- Compara o password recebido com o bcryptjs (no banco de dados não há cópia da senha descriptografada)

#### `GET /install`
- Rota usada para gerar produtos aleatórios para o banco de dados.

### Testes
#### `npm run test` 
- Executa o script "test.js", uma suíte básica de testes criada com mocha/chai
- Suíte de testes padrão vinda do `create-react-app` não modificada

#### Suíte
- Testa rota `POST /login`, com combinações válidas e inválidas de username/password.

