const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const helmet = require('helmet');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// EXPRESS SETUP
const conn = require('./db/conn');
const Category = require('./models/Category');
const Vote = require('./models/Vote');
const Idea = require('./models/Idea');
const User = require('./models/User');

const app = express();

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  helpers: {
    eq: (a, b) => a === b
  },
  defaultLayout: 'main'
});

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "data:", "https:"],
        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": ["'self'", "'unsafe-inline'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);


// DATABASE CONNECTION AND SERVER START
conn
  .sync()
  .then(() => {
    const server = app.listen(PORT, () => {
      const addr = server.address();
      const host = addr.address === '::' ? 'localhost' : addr.address;
      console.log(`Running in http://${host}:${addr.port}`);
    });
  })
  .catch((err) => console.log('Error on database connection:', err));
