const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/users.model');

const usersGet = async(req = request, res = response) => {
    const { desde = 0, limit = 5 } = req.query;
    /* const user = await User.find()
                 .skip(Number(desde))
                 .limit(Number(limit));
     const count = await User.countDocuments();*/

    const [count, user, ] = await Promise.all([
        User.countDocuments(),
        User.find()
        .skip(Number(desde))
        .limit(Number(limit))
    ])
    return res.json({
        count,
        user
    });
};

const usersPost = async(req, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    //validacion del email con la DB
    const existsEmail = await User.findOne({ email: email });
    if (existsEmail) {
        return res.status(400).json({
            msg: "este correo ya esta registrado"
        })
    }
    //numero de vueltas 
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //guardar el mongo
    const info = await user.save();
    console.log(info);
    return res.json({
        msg: "post - 200 ok",
        user
    })
};
const usersUpdate = async(req = request, res = response) => {
    const { password, google, ...resto } = req.body;
    // TODO validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(req.params.id, resto);
    return res.json({
        msg: "update - 200 ok",
        id: req.params.id
    })
};
const usersDelete = async(req, res = response) => {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, { state: false });
    console.log(user);
    return res.json({
        msg: "delete - 200 ok",
        user
    });
};

const usersPatch = (req, res = response) => {
    return res.json({
        msg: "Patch - 200 ok"
    })
};

module.exports = {
    usersGet,
    usersPost,
    usersUpdate,
    usersDelete,
    usersPatch,
}