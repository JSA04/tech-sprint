# Tech Sprint J&F

O Tech Sprint J&F é uma plataforma web colaborativa voltada para a criação e compartilhamento de ideias inovadoras.
Usuários podem publicar suas ideias, votar nas criações de outras pessoas e ajudar a destacar as mais criativas dentro da comunidade J&F.

---

### Funcionalidades principais

- 🧠 **Criação de ideias:** qualquer usuário pode cadastrar novas ideias.

- 👍 **Sistema de votos:** as melhores ideias sobem no ranking através dos votos da comunidade.

- 💬 **Interação social:** os usuários podem visualizar e apoiar ideias de outros participantes.

- 🔐 **Autenticação segura:** login e gerenciamento de sessão protegidos.

- 🛡️ **Proteção e boas práticas:** uso de Helmet e CSRF Token para garantir segurança das requisições.

---

### Tecnologias utilizadas

- **Node.js** — ambiente de execução do servidor

- **Express.js** — framework para rotas e middlewares

- **Express-Handlebars** — template engine para renderização de páginas dinâmicas

- **Sequelize** — ORM para comunicação com o banco de dados

- **PostgreSQL / MySQL** — banco de dados relacional

- **Helmet e CSURF** — segurança e proteção contra ataques comuns

---


## 🌐 Rotas da Aplicação

### 👤 Usuários (`/users`)
| Método | Rota              | Descrição                        |
|:-------|:------------------|:---------------------------------|
| **POST** | `/users`          | Cria um novo usuário             |
| **GET**  | `/users/signup`   | Renderiza a página de cadastro   |
| **POST** | `/users/login`    | Autentica o usuário              |
| **GET**  | `/users/login`    | Renderiza a página de login      |

---

### 💡 Ideias (`/ideas`)
| Método | Rota                  | Descrição                              |
|:-------|:----------------------|:---------------------------------------|
| **GET**  | `/ideas`              | Renderiza a página de ideias           |
| **GET**  | `/ideas/:id`          | Renderiza a página de uma ideia        |
| **GET**  | `/ideas/create`       | Renderiza a página de criação de ideia |
| **GET**  | `/ideas/:id/edit`     | Renderiza a página de edição de ideia  |
| **DELETE** | `/ideas/:id`        | Deleta uma ideia                       |
| **POST** | `/ideas`              | Cria uma nova ideia                    |
| **PUT**  | `/ideas/:id`          | Atualiza uma ideia existente           |

---

### 👍 Votos (`/votes`)
| Método | Rota       | Descrição         |
|:-------|:------------|:------------------|
| **POST** | `/votes`   | Salva um voto     |
