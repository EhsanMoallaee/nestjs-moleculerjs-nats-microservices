var jwt = require('jsonwebtoken');
const config = require("config");

async function verifyJwt(data) {
   try {
        if(data.role === 'user') {
            var secret = config.get("JWT_USER_SECRET");
        }else if(data.role === 'admin') {
            var secret = config.get("JWT_ADMIN_SECRET");
        }
        const user = jwt.verify(data.token, secret);
        return {result: 'Authenticated' , user};
   } catch (err) {
    return {result: 'Authentication failed' , user: {}};
   }
}

module.exports = verifyJwt;