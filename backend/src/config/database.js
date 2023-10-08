const mongoose = require('mongoose');
const dotenv = require('dotenv').config()


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database Connection Success');
    } catch (error) {
        console.error('Database Connection Error:', error.message);
    }
};

module.exports = connectDB;