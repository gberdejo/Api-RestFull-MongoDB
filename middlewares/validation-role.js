const { response } = require("express");

const isUserAdmin = (req, res = response, next) => {
    const user = req.user;
    if (!user) return res.status(500).json({ msg: 'El usuario no se autentico' });
    if (user.role !== 'ADMIN_USER') return res.status(400).json({ msg: 'no eres Admin' });
    next();
}
const isValidRole = (...roles)=>{
    return (req,res,next)=>{
        if(!req.user) return res.status(500).json({ msg: 'El usuario no se autentico' });
        if(!roles.includes(req.user.role)) return res.status(401).json({ msg: `el user necesita ser ${roles}` });
        next();
    }
}
module.exports = { isUserAdmin ,isValidRole}