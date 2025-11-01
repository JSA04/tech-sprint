function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        req.flash('error_msg', 'Autentique-se para acessar esse recurso!');
        res.redirect('/users/login');
    } 
}

module.exports = {
    checkAuth,
};