const jwt = require('jsonwebtoken');
const config = require('../configuration/config');

function generateToken(user){
    const payload = JSON.stringify(user);
    return jwt.sign(payload,config.jwtSecret);
}

module.exports = { 
    generateToken 
};