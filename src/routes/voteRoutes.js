const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const { checkAuth } = require('../middlewares/authMiddleware');

// Rotas de VOTOS
router.post('/', checkAuth, voteController.vote);
router.post('/clear', checkAuth, voteController.clearVote);

module.exports = router;