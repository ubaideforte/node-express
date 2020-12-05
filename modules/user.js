const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  //   dateOfBirth: {
  //     type: Date,
  //     required: true,
  //     default: Date.now(),
  //   },
  //   password: {
  //     type: String,
  //     required: true,
  //     default: "",
  //   },
});

module.exports = mongoose.model("User", userSchema);
