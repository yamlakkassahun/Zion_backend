const bcrypt = require( 'bcrypt');
const jwt = require( 'jsonwebtoken');
const config = require('../config/index');

//this is to generate the salt to hash password 
module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
}
//this is to hash the password and generate the hash password
module.exports.GeneratePassword = async ( password, salt ) => {
    return await bcrypt.hash( password, salt);
}
//to validate the password
module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
    return await bcrypt.hash(enteredPassword, salt) === savedPassword;
}
//to generate the token 
module.exports.GenerateSignature = (payload) => {
    return jwt.sign(payload, config.APP_SECRET_KEY, {expiresIn: '1d'});
}
 //to validate the token = require( the request 
module.exports.ValidateSignature = async (req) => {
    const signature = req.headers.authorization;

    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1], config.APP_SECRET_KEY);
        req.user = payload;
        return true;
    }
    return false
}