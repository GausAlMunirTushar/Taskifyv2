const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel'); // Adjust the path as needed

// Register a user
const createUser = async (req, res) => {
    try {
        const reqBody = req.body;
        const newUser = await userModel.create(reqBody); // Use async/await instead of a callback

        res.status(201).json({
            status: 'success',
            data: newUser
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: 'fail',
            error: err.message
        });
    }
};

// Login a user
const loginUser = async (req, res) => {
      try {
        const reqBody = req.body;
    
        // Use the aggregate function to find a user matching the criteria
        const users = await userModel.aggregate([
          { $match: reqBody },
          { $project: { _id: 0, email: 1, firstName: 1, mobile: 1 } }
        ]);
    
        if (users.length === 0) {
          // User not found
          return res.status(401).json({
            status: 'Unauthorized',
          });
        }
    
        const user = users[0]['email']
        
    
        // Create a payload for the JWT token
        const payload = {
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // Token expiration time
          data: user,
        };
    
        // Sign the token with a secret key stored in an environment variable
        const token = jwt.sign(payload, process.env.JWT_SECRET);
    
        res.status(200).json({
          status: 'success',
          token: token,
          data: user,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
      }

};

// update a user
const updateUser = async (req, res) => {
  try {
    const email = req.headers['email'];
  const reqBody = req.body;
  
  // Use async/await with try/catch to handle errors
  const updatedUser = await userModel.updateOne({email: email}, reqBody)

  if (!updatedUser) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  return res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};




module.exports = {
    createUser,
    loginUser,
    updateUser
}
