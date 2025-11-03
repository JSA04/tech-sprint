const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const Idea = require('./models/Idea');
const ideasRoutes = require('./routes/ideasRoutes');

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

// Uso das rotas
app.use('/ideas', ideasRoutes);
app.get('/', (req, res) => res.redirect('/ideas'));


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
