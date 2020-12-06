const express = require("express");
const router = express.Router();
const User = require("../../modules/userModel");

router.get("/:id", async (req, res) => {
  console.log("req.params.id", req.params);
  try {
    const user = await User.findById(req.params.id);
    user ? res.send(user) : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
