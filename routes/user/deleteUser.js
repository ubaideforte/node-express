const express = require("express");
const router = express.Router();
const User = require("../../modules/userModel");

router.delete("/:id", async (req, res) => {
  console.log("req.params.id", req.params);
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    console.log("Find User", user);
    res.send(user);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
