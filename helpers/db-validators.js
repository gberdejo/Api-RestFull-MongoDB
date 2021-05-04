const Role = require('../models/roles.model');

const isRoleValid = async ( role = '') =>{
    const rolExists = await Role.findOne({role:role});
    console.log(rolExists);
    if (!rolExists) {
        throw new Error(`El rol ${role} no es permitido`);
    }
}
module.exports = {
    isRoleValid
}