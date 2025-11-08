// Importação dos módulos
const express = require("express");
require("express-async-errors");
const exphbs = require("express-handlebars");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Configuração da conexão com o banco de dados
const conn = require("./db/conn");
const sequelizeConnectionErros = require("./constants/sequelizeErrors");
// Configuração das entidades do banco de dados
const Category = require("./models/Category");
const Vote = require("./models/Vote");
const Idea = require("./models/Idea");
const User = require("./models/User");

// Importação das rotas da aplicação
const userRoutes = require("./routes/userRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const voteRoutes = require("./routes/voteRoutes");

// Configuração da aplicação express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do handlebars
/**
* HELPERS:
* eq: igualdade (==)
* ne: diferença (!=)
* or: Operador lógico OU (||)
* formatDate: exibição de datas
*/
const hbs = exphbs.create({
  helpers: {
    eq: (a, b) => {
      return String(a) === String(b);
    },
    ne: (a, b) => a !== b,
    or: function (a, b) {
      return a || b;
    },
    formatDate: (date) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  defaultLayout: "main",
  partialsDir: ["src/views/partials/"],
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});



// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Configuração de Content Security Policy (CSP)
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:", "wss:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  })
);

// Configuração de Sessão
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

// Configuração de Flash messages
app.use(flash());

// Configuração do CSRF
const csrfProtection = csrf();
app.use(csrfProtection);

// Variáveis globais da aplicação
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.csrfToken = req.csrfToken();
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Exposição das rotas da aplicação
app.use("/users", userRoutes);
app.use("/ideas", ideaRoutes);
app.use("/votes", voteRoutes);
app.get("/", (req, res) => {
  if(req.session.user) res.redirect("/ideas")
  else res.redirect("/users/login")
});

// Middleware global de tratamento de erros assíncronos
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    req.flash("error_msg", "Sessão expirada ou formulário inválido. Tente novamente.");
    return res.redirect("/users/login");
  }

  if (sequelizeConnectionErros.includes(err.name)) {
    req.flash("error_msg", "Erro de conexão com o banco de dados. Tente novamente mais tarde.");
    return res.redirect("/ideas");
  }

  console.error('Erro inesperado:', err);
  req.flash("error_msg", "Ocorreu um erro inesperado. Tente novamente mais tarde.");
  res.redirect("/ideas");
});

// ÚLTIMO PASSO
// Conexão com banco de dados e inicialização da aplicação
conn
  .sync({ alter: false }) 
  .then(() => {
    const startServer = (port) => {
      const server = app
        .listen(port)
        .on("error", (err) => {
          if (err.code === "EADDRINUSE") {
            console.log(`Port ${port} is busy, trying ${port + 1}...`);
            startServer(port + 1);
          } else {
            console.error("Server error:", err);
          }
        })
        .on("listening", () => {
          const addr = server.address();
          const host = addr.address === "::" ? "localhost" : addr.address;
          console.log(`Running in http://${host}:${addr.port}`);
        });
    };

    startServer(PORT);
  })
  .catch((err) => console.log("Error on database connection:", err));
