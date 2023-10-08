const express = require('express');
const {
  loginUser,
} = require('../controllers/userController'); // Adjust the path as needed

const authRoutes = express.Router();

// Login Routes
authRoutes.post('/login', loginUser)

module.exports = authRoutes;