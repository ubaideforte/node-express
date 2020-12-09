const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../../modules/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../modules/userModel");

router.post("/", async (req, res) => {
  const { firstName, lastName, dateOfBirth, password, email } = req.body;

  // <--------- Validation ---------> //
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    res.status(400).send({
      error: validationResult.error.details[0].message,
    });
  } else {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      res.status(406).send({ message: "User already exist" });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          firstName,
          lastName,
          dateOfBirth,
          password: hashedPassword,
          email,
        });

        const token = jwt.sign(
          { _id: newUser._id },
          process.env.ACCESS_TOKEN_SECRET
        );
        newUser.jwtToken.token = token;
        const response = await newUser.save();
        res.status(201).json(response);
      } catch {
        res.status(500).send();
      }
    }
  }
});

module.exports = router;
