const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkAuth } = require('../middlewares/authMiddleware');

/**
* Rotas de usuário
*/

// Cadastro
router.get('/signup', userController.renderSignup);
router.post('/', userController.createUser);

// Login
router.get('/login', userController.renderLogin);
router.post('/login', userController.loginUser);

// Logout (Autenticada)
router.post('/logout', checkAuth, userController.logoutUser);

module.exports = router;