const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const User = require('../models/users.model');

const validationJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) return res.status(401).json({ msg: 'no hay token en la peticion' });
    try {
        const { uid } = jwt.verify(token, process.env.MYSECRET);
        const user = await User.findById(uid);
        if (!user) return res.status(401).json({ msg: "Token no valido - el user no esta en la DB" });
        if (!user.state) return res.status(401).json({ msg: "Token no valido - El usuario esta eliminado" });
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Token no valido' });
    }
}

module.exports = { validationJWT };