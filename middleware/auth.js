const jwt = require('jsonwebtoken');
const User = require('../models/user.model');






exports.isAuth = async (req, res, next) => {
  try {
    // 0      1
    // Bearer token
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).send({ message: 'Token Is missing' });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY); 
    if (!decoded) {
      throw new Error();
    }
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: 'Token expired', error: error.message });
  }
};

