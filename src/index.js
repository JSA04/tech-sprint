const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// EXPRESS SETUP
const conn = require("./db/conn");

const Category = require("./models/Category");
const Vote = require("./models/Vote");
const Idea = require("./models/Idea");
const User = require("./models/User");

const userRoutes = require("./routes/userRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const voteRoutes = require("./routes/voteRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  helpers: {
    eq: (a, b) => a === b,
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

const csrfProtection = csrf();

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Segurança (relaxa CSP em desenvolvimento para evitar ruídos do DevTools)
const isDev = process.env.NODE_ENV !== "production";
if (isDev) {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
} else {
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
}

// Sessão e Flash Messages
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);
app.use(flash());

app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.csrfToken = req.csrfToken();
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    req.flash(
      "error_msg",
      "Sessão expirada ou formulário inválido. Tente novamente."
    );
    console.error("Erro de CSRF policy");
    return res.redirect("/users/login");
  }
  return res.redirect("/ideas");
});

app.use("/users", userRoutes);
app.use("/ideas", ideaRoutes);
app.use("/votes", voteRoutes);
app.get("/", (req, res) => {
  if(req.session.user) res.redirect("/ideas")
  else res.redirect("/users/login")
});

// DATABASE CONNECTION AND SERVER START
conn
  .sync({ alter: true }) // Mantém os dados existentes
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
