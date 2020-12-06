const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../../modules/userModel");

//---------------------------------*
// This API is usd to add new user *
//---------------------------------*
router.post("/", (req, res) => {
  const { firstName, lastName, dateOfBirth, password } = req.body;

  // <--------- Validation ---------> //
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    res.status(400).send({
      error: validationResult.error.details[0].message,
    });
  } else {
    // <----- Creating new user by using User Schema -----> //
    const newUser = new User({
      firstName,
      lastName,
      dateOfBirth,
      password,
    });

    // <----- Saving new user to data base -----> //
    newUser
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.status(404).json({ message: err }));
  }
});

module.exports = router;
