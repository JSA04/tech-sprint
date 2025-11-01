function setUser(req, { id, name, email }) {
    req.session.user = {
        id,
        name,
        email,
    };
}

function getUser(req) {
    return req.session.user;
}

function clearUser(req, res) {
    if (req.session) {
        delete req.session.user;
    }
}

module.exports = {
    setUser,
    getUser,
    clearUser,
}