const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const { checkAuth } = require('../middlewares/authMiddleware');

/**
* Rotas de votos
* TODAS AS ROTAS DE VOTOS SÃO AUTENTICADAS!
*/

// Votar 
router.post('/', checkAuth, voteController.vote);

// Desfazer voto
router.post('/clear', checkAuth, voteController.clearVote);

module.exports = router;