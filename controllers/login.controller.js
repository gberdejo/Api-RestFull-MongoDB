const User = require("../models/users.model");
const bcript = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");
const {googleVerify} = require('../helpers/google-verify');
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
const googlesignin = async(req,res)=>{

    const { id_token } = req.body;
    try {
        const {name,email,img} = await googleVerify(id_token);
        const user = await User.findOne({email});
        if(!user){
            const data = {
                name,
                email,
                img,
                password: ":P",
                google:true,
            }
            const user = await User.create(data);
            await user.save();
        }
        if(!user.state){
            res.status(401).json({msg:"Hable con el admin"});
        }
        const token = await generateJWT(user.id);
    
        res.json({msg:"ok",user,token});
    } catch (error) {
        
    }
}
module.exports = {
    login,googlesignin
}