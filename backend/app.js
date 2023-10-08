const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const connectDB  = require('./src/config/database');

// Routes Import
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

// Create Express app
const app = express();

// Middleware for Security
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(xss());

// Request Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3000,
});
app.use(limiter);

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parser Middleware
app.use(bodyParser.json());

// Database Connection
connectDB()

// Define your API routes here
app.use('/api/v1', userRoutes); // Example route structure, adjust as needed
app.use('/api/v1/auth/', authRoutes)
app.use('/api/v1', taskRoutes)

// Undefined Route Handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Not Found',
  });
});

module.exports = app;
