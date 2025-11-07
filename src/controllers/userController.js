const userService = require('../services/userService');
const sessionService = require('../services/sessionService');

async function createUser(req, res) {
    try {
        const user = await userService.createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        sessionService.setUser(req, { 
            id: user.id,
            name: user.name,
            email: user.email,
         });
        req.flash('success_msg', 'Usuário cadatrado!');
        res.redirect('/ideas');
    } catch(error) {
        req.flash('error_msg', error.message);
        res.redirect('/users/signup');
    }
}

async function renderSignup(req, res) {
    res.render('signup');
}

async function loginUser(req, res) {
    try {
        const user = await userService.loginUser({
            email: req.body.email,
            password: req.body.password,
        })
        sessionService.setUser(req, { 
            id: user.id,
            name: user.name,
            email: user.email,
        });
        req.flash('success_msg', `Olá, ${user.name}!`);
        res.redirect('/ideas');
    } catch(error) {
        req.flash('error_msg', error.message);
        res.redirect('/users/login');
    }
}

async function renderLogin(req, res) {
    res.render('login');
}

async function logoutUser(req, res) {
  try {
    sessionService.clearUser(req, res);
    req.flash('success_msg', 'Até breve!');
    res.redirect('/users/login');
  } catch (error) {
    req.flash('error_msg', 'Não foi possível sair');
    res.redirect('/');
  }
}

module.exports = {
    createUser,
    renderSignup,
    loginUser,
    renderLogin,
    logoutUser,
};