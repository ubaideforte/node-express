const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../../modules/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email } = req.body;

  // <--------- Validation ---------> //
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    res.status(400).send({
      error: validationResult.error.details[0].message,
    });
  } else {
    try {
      const user = await User.findOne({ email });
      if (user) {
        user.jwtToken.token = "";
        await user.save();
        res.send(user);
      } else {
        res.status(401).json({ message: "Can not logout" });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
});

module.exports = router;
