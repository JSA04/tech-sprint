const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkAuth } = require('../middlewares/authMiddleware');

// Rotas de SIGNUP
router.get('/signup', userController.renderSignup);
router.post('/', userController.createUser);

// Rotas de LOGIN
router.get('/login', userController.renderLogin);
router.post('/login', userController.loginUser);

// Rotas de LOGOUT
router.post('/logout', checkAuth, userController.logoutUser);

module.exports = router;