const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel'); // Adjust the path as needed

const authVerify = async (req, res, next) => {
  try {
    const token = req.headers['token'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
        console.log(token)
        res.status(401).json({
          status: "unauthorized"
        })
      }
      else {
        let email = decoded['data'];
        req.headers.email = email
        next();
      }
    })
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

module.exports = authVerify;
