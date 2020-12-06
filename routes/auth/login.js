const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../../modules/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // <--------- Validation ---------> //
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    res.status(400).send({
      error: validationResult.error.details[0].message,
    });
  } else {
    try {
      const allusers = await User.find();
      const user = allusers.find((u) => u.email === email);
      console.log("User", user);
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          res.send(user);
        } else {
          res.status(406).json({ message: "Invalid email or password" });
        }
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch {
      res.status(500).send();
    }
  }
});

module.exports = router;
