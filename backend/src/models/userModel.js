const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    // Email field with unique constraint
    email: {
      type: String,
      unique: true, // Ensures email uniqueness
      trim: true, // Removes leading/trailing spaces
      lowercase: true, // Converts to lowercase for consistency
      required: true, // Requires an email to be provided
    },

    // First name of the user
    firstName: {
      type: String,
      trim: true, // Removes leading/trailing spaces
    },

    // Last name of the user
    lastName: {
      type: String,
      trim: true, // Removes leading/trailing spaces
    },

    // Mobile number of the user
    mobile: {
      type: String,
      trim: true, // Removes leading/trailing spaces
    },

    // Password for user authentication (ensure it's securely hashed)
    password: {
      type: String,
      required: true, // Requires a password to be provided
    },

    // URL to the user's profile photo
    photo: {
      type: String,
    },

    // Timestamp for when the user was created
    createdDate: {
      type: Date, // Use Date type for timestamps
      default: Date.now, // Set the default value to the current date and time
    },
  },
  { versionKey: false }
); // Disable Mongoose's version key (_v)

// Create the User model
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
