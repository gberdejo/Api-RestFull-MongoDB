const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    const obj = { uid };
    return new Promise((resolve, reject) => {
        jwt.sign(obj, process.env.MYSECRET, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("algo se jodio");
            } {
                resolve(token);
            }
        })
    })

}

module.exports = { generateJWT };