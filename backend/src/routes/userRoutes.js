const express = require('express');
const {
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController'); // Adjust the path as needed

const authVerify = require('../middlewares/authVerify')

const userRoutes = express.Router();

// Registration Route (POST)
userRoutes.post('/users/register', createUser);

// Update User Data Route (PUT) with authVerify middleware
userRoutes.put('/users/updateUser', authVerify, updateUser);

// Delete User Route (DELETE)
// userRoutes.delete('/users/:userId', deleteUser);

module.exports = userRoutes;
