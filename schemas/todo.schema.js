const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    default: "",
  },
  phone: {
    type: Number,
    default: "+880",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = todoSchema;
