const jwt = require("jsonwebtoken");
const config = require('../config/index');

module.exports.Authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { user } = await jwt.verify(token, config.APP_SECRET_KEY);

    req.user = user;

    return next();
    
  } catch (e) {
    return res.status(403).json({message: "user is not authorized"});
  }
};
