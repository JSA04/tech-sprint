const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// EXPRESS SETUP
const conn = require('./db/conn');

const Category = require('./models/Category');
const Vote = require('./models/Vote');
const Idea = require('./models/Idea');
const User = require('./models/User');

const userRoutes = require('./routes/userRoutes');
const ideaRoutes = require("./routes/ideaRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  helpers: {
    eq: (a, b) => a === b,
  },
  defaultLayout: 'main',
  partialsDir: ['src/views/partials/']
});

const csrfProtection = csrf();

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);
app.use(flash());

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:"], 
    },
  })
);

app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.csrfToken = req.csrfToken();
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    req.flash('error_msg', 'Sessão expirada ou formulário inválido. Tente novamente.');
    console.error('Erro de CSRF policy');
    return res.redirect('/users/login');
  }
  next(err);
});

app.use('/users', userRoutes);
app.use("/ideas", ideaRoutes);
app.get('/', (req, res) => res.redirect('/ideas'));

// DATABASE CONNECTION AND SERVER START
conn
  .sync({ force: true }) // Isso vai recriar as tabelas
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
