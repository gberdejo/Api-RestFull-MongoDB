const { request,response }= require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/users.model');

const usersGet = async (req,res = response)=>{
    return res.json({
        msg: "get - 200 ok"
    })
};

const usersPost = async (req,res = response)=>{
    const { name , email , password , role } = req.body;
    const user = new User({ name , email , password , role });
    //validacion del email con la DB
    const existsEmail = await User.findOne({ email : email });
    if ( existsEmail ){
        return res.status(400).json({
            msg:"este correo ya esta registrado"
        })
    }
    //numero de vueltas 
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);
    
    //guardar el mongo
    const info = await user.save();
    console.log(info);
    return res.json({
        msg: "post - 200 ok",
        user
    })
};
const usersUpdate = (req = request,res = response)=>{
    const {id} = req.params;
    const { name, lastname} = req.query;
    return res.json({
        msg: "update - 200 ok",
        id,
        name,
        lastname
    })
};
const usersDelete = (req,res = response)=>{
    return res.json({
        msg: "delete - 200 ok"
    })
};

const usersPatch = (req,res = response)=>{
    return res.json({
        msg: "Patch - 200 ok"
    })
};
module.exports = {
    usersGet,
    usersPost,
    usersUpdate,
    usersDelete,
    usersPatch
}