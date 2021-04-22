const { request,response }= require('express');

const usersGet = (req,res = response)=>{
    return res.json({
        msg: "get - 200 ok"
    })
};

const usersPost = (req,res = response)=>{
    const body = req.body;
    return res.json({
        msg: "post - 200 ok",
        body
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