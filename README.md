# 🏁 Tech Sprint J&F

O **Tech Sprint J&F** é uma plataforma web colaborativa voltada para a **criação e compartilhamento de ideias inovadoras**.  
Usuários podem publicar suas ideias, votar nas criações de outras pessoas e ajudar a destacar as mais criativas dentro da comunidade **J&F**.

---

## 🚀 Funcionalidades principais

- 🧠 **Criação de ideias:** qualquer usuário autenticado pode cadastrar novas ideias.  
- 👍 **Sistema de votos:** as melhores ideias sobem no ranking através dos votos da comunidade.  
- 💬 **Interação social:** os usuários podem visualizar e apoiar ideias de outros participantes.  
- 🔐 **Autenticação segura:** login e gerenciamento de sessão protegidos.  
- 🛡️ **Proteção e boas práticas:** uso de **Helmet** e **CSRF Token (csurf)** para garantir segurança das requisições.  

---

## 🧩 Tecnologias utilizadas

| Categoria | Tecnologias |
|------------|-------------|
| **Servidor** | Node.js |
| **Framework Web** | Express.js |
| **Template Engine** | Express-Handlebars |
| **Banco de Dados** | MySQL |
| **ORM** | Sequelize |
| **Autenticação e Segurança** | bcrypt, express-session, helmet, csurf |
| **Validação** | express-validator |
| **Feedbacks** | express-flash |
| **Métodos HTTP extras** | method-override |
| **Variáveis de ambiente** | dotenv |
| **Execução assíncrona segura** | express-async-errors |
| **Hot Reload** (dev) | nodemon |

---

## ⚙️ Instalação e execução

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/tech-sprint-jf.git

# 2. Acessar a pasta do projeto
cd tech-sprint-jf

# 3. Instalar as dependências
npm install

# 4. Criar o arquivo de ambiente
cp .env.example .env

# 5. Executar a aplicação (modo desenvolvimento)
npm run dev
```

---

## 🌐 Estrutura de Rotas

### 👤 Usuários (`/users`)

| Método | Rota | Descrição |
|:-------|:------|:-----------|
| **GET** | `/users/signup` | Renderiza a página de cadastro |
| **POST** | `/users` | Cria um novo usuário |
| **GET** | `/users/login` | Renderiza a página de login |
| **POST** | `/users/login` | Autentica o usuário |
| **POST** | `/users/logout` | Encerra a sessão do usuário *(requer autenticação)* |

---

### 💡 Ideias (`/ideas`)

> Todas as rotas de ideias exigem autenticação (`checkAuth`).

| Método | Rota | Descrição |
|:-------|:------|:-----------|
| **GET** | `/ideas` | Lista todas as ideias |
| **GET** | `/ideas/:id` | Exibe detalhes de uma ideia específica |
| **GET** | `/ideas/new` | Renderiza o formulário de criação de ideia |
| **GET** | `/ideas/:id/edit` | Renderiza o formulário de edição de ideia |
| **POST** | `/ideas` | Cria uma nova ideia |
| **POST** | `/ideas/:id/update` | Atualiza uma ideia existente |
| **POST** | `/ideas/:id/delete` | Remove uma ideia existente |

---

### 👍 Votos (`/votes`)

> Todas as rotas de votos exigem autenticação (`checkAuth`).

| Método | Rota | Descrição |
|:-------|:------|:-----------|
| **POST** | `/votes` | Registra um voto (a favor ou contra) |
| **POST** | `/votes/clear` | Remove o voto do usuário em uma ideia |

---

## 🗄️ Estrutura geral do projeto

```
tech-sprint-jf/
├── config/
│   └── database.js
├── controllers/
│   ├── ideaController.js
│   ├── userController.js
│   └── voteController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── Idea.js
│   ├── User.js
│   └── Vote.js
├── routes/
│   ├── ideaRoutes.js
│   ├── userRoutes.js
│   └── voteRoutes.js
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── ideas/
│   ├── users/
│   └── partials/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── .env.example
├── app.js
├── package.json
└── README.md
```

---

## 🔐 Segurança implementada

- **Helmet:** adiciona cabeçalhos HTTP de segurança.  
- **CSURF:** protege contra ataques Cross-Site Request Forgery.  
- **Sessions + Flash:** gerenciamento seguro de login e mensagens temporárias.  
- **bcrypt:** armazenamento seguro de senhas com hash e salt.  

---

## 💻 Scripts úteis

| Script | Descrição |
|:--------|:-----------|
| `npm start` | Inicia o servidor em modo de produção |
| `npm run dev` | Inicia o servidor com `nodemon` (reload automático) |
| `npm install` | Instala as dependências |
| `npm audit` | Verifica vulnerabilidades de segurança |

---

## 🧾 Licença

Este projeto é de uso interno da **J&F Investimentos** e tem como objetivo o aprendizado e fomento à inovação dentro do grupo.  
