const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const Idea = require("./models/Idea");
const ideaRoutes = require("./routes/ideaRoutes");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// EXPRESS SETUP
const conn = require("./db/conn");
const app = express();

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  helpers: {
    eq: (a, b) => a === b,
  },
  defaultLayout: "main",
});

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));

// Uso das rotas
app.use("/ideas", ideaRoutes);
app.get("/", (req, res) => res.redirect("/ideas"));

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
