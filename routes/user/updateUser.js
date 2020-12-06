const express = require("express");
const router = express.Router();
const User = require("../../modules/userModel");

router.patch("/:id", async (req, res) => {
  console.log("ID on update", req.params);
  const { firstName, lastName, password, dateOfBirth } = req.body;
  try {
    const user = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstName,
          lastName,
          password,
          dateOfBirth,
        },
      }
    );
    user.n
      ? res.send(user)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
