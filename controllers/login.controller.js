const User = require("../models/users.model");
const bcript = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");
const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "El usuario no exite" });
        }
        if (!user.state) {
            return res.status(400).json({ msg: "El usuario fue eliminado" });
        }
        const validPassword = await bcript.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ msg: "la contraseña es incorrecta" });
        }
        const mytoken = await generateJWT(user.id);
        res.json({
            msg: 'Login ok',
            user,
            mytoken
        })
    } catch (error) {
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

module.exports = {
    login
}