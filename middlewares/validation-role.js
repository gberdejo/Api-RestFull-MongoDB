const { response } = require("express");

const isUserAdmin = (req, res = response, next) => {
    const user = req.user;
    if (!user) return res.status(500).json({ msg: 'El usuario no se autentico' });
    if (user.role !== 'ADMIN_USER') return res.status(400).json({ msg: 'no eres Admin' });
    next();
}

module.exports = { isUserAdmin }