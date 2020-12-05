const express = require("express");
const router = express.Router();

const User = require("../modules/user");

router.get("/", (req, res) => {
  res.send("You are on user router");
});

router.get("/admin", (req, res) => {
  res.send("Ubaid is admin");
});

router.post("/", (req, res) => {
  const { firstName, lastName } = req.body;
  console.log(`firstName: ${firstName}, lastName: ${lastName} `);

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  newUser
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ message: err }));
});

module.exports = router;
