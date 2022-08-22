var jwt = require('jsonwebtoken');
const config = require("config");

async function generateJwt(data) {
    if(data.role === 'user') {
        var secret = config.get("JWT_USER_SECRET");
    }else if(data.role === 'admin') {
        var secret = config.get("JWT_ADMIN_SECRET");
    }
    const token = jwt.sign(data, secret, {
        expiresIn: '10m',
    })
    return token;
}

module.exports = generateJwt;