
# Matricula

Aplicação Node.js para gerenciamento básico de matrícula (estrutura inicial). Contém autenticação, upload de arquivos e configuração de conexão.

## Funcionalidades

- Autenticação com Passport
- Upload de arquivos
- Conexão configurável via `config/connection.js`

## Pré-requisitos

- Node.js v14+ ou superior
- npm

## Instalação

1. Instale dependências:

```bash
npm install
```

2. Configure `config/config.json` conforme seu ambiente (porta, banco, etc.).

3. Inicie a aplicação:

```bash
node index.js
```

## Estrutura do projeto

- index.js — ponto de entrada
- config/ — configurações (config.json, conexão, passport, upload)
- controllers/mainController.js — lógica principal
- router/mainRouters.js — rotas da aplicação
- models/ — modelos de dados
- public/ — ativos estáticos (css, js, images)
- views/ — templates de visualização

## Variáveis / Configuração

- Edite `config/config.json` para ajustar porta, credenciais do banco e outras opções.
- As funções de autenticação estão em `config/passport.js`.

## Testes e desenvolvimento

- Para desenvolvimento, reinicie o servidor após alterações (recomenda-se usar `nodemon`):

```bash
npx nodemon index.js
```

## Contribuição

Abra um pull request ou envie issues com sugestões.


