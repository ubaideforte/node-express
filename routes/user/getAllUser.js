const express = require("express");
const router = express.Router();
const User = require("../../modules/userModel");

//---------------------------------*
// This API is usd to get all user *
//---------------------------------*
router.get("/", async (req, res) => {
  console.log("req.user --> in getAllUsers", req.user);
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
