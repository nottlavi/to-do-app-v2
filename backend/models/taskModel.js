const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
  dueAt: {
    type: Date,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const taskModel = mongoose.model("taskModel", taskSchema);
module.exports = taskModel;
