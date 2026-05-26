# Sistema de Matrícula Acadêmica

Aplicação web desenvolvida em Node.js utilizando Express, Sequelize e EJS para gerenciamento acadêmico de alunos, disciplinas, matrículas e solicitações de pré-requisito.

---

# Funcionalidades

## Alunos
- Cadastro de alunos
- Geração automática de matrícula
- Controle de semestre atual
- Controle de status da matrícula
- Identificação de formando

## Disciplinas
- Cadastro de disciplinas
- Organização por semestre
- Controle de carga horária

## Matrículas
- Cadastro de matrícula
- Validação automática de semestre
- Bloqueio de matrícula em disciplinas inválidas
- Prevenção de matrícula duplicada

### Regra implementada
O aluno só pode se matricular em disciplinas do próximo semestre.

Exemplo:
- Aluno no 2º semestre → pode cursar apenas disciplinas do 3º semestre
- Aluno no 4º semestre → pode cursar apenas disciplinas do 5º semestre

## Pré-requisitos
- Solicitação de quebra de pré-requisito
- Listagem de alunos
- Tela individual de solicitação

---

# Tecnologias utilizadas

- Node.js
- Express
- Sequelize
- MySQL
- EJS
- CSS
- Sequelize CLI

---

# Estrutura do Projeto

```bash
├── config/
│   ├── connection.js
│   ├── passport.js
│   └── upload.js
│
├── controllers/
│   └── mainController.js
│
├── migrations/
│
├── models/
│
├── public/
│   └── css/
│
├── router/
│   └── mainRouters.js
│
├── views/
│
├── index.js
└── package.json

## Como usar o projeto

### 1. Instalar as dependências

```bash
npm install



```

### 2. Configurar o banco de dados


```bash
npx sequelize-cli db:create   
```


### 3. Executar as migrations

```bash
npx sequelize-cli db:migrate
```

### 4. Iniciar o servidor

```bash
node index.js
```

### 5. Acessar no navegador

Abra:

```bash
http://localhost:3000
```


