const mongoose = require("mongoose");

// Define the task Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2, // Add a minimum length validation if needed
      maxlength: 255, // Add a maximum length validation if needed
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "To-Do",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true, // Ensure email consistency by converting to lowercase
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
); // Disable the version key (_v)

// Create a Task Model
const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
