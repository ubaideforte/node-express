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
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  jwtToken: {
    token: { type: String },
    createdAt: { type: Date, default: new Date().toISOString() },
  },
  loggedDevices: [
    {
      deviceId: { type: String, required: true },
      notificationToken: String,
      jwtToken: {
        token: { type: String },
        createdAt: { type: Date },
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
