const Role = require('../models/roles.model');
const User = require('../models/users.model');
const isRoleValid = async ( role = '') =>{
    const rolExists = await Role.findOne({role:role});
    console.log(rolExists);
    if (!rolExists) throw new Error(`El rol ${role} no es permitido`);
}
const isExistsEmail = async (email = '')=>{
    const existsEmail = await User.findOne({ email : email });
    if ( existsEmail ) throw new Error(`El Email ${email} ya existe`);
}
const isExistsId = async (id )=>{
    const existsId = await User.findById(id);
    if ( !existsId ) throw new Error(`El ID ${id} no existe`);
}

module.exports = {
    isRoleValid,isExistsEmail,isExistsId
}