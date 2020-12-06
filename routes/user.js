const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../modules/userModel");

//---------------------------------
// This API is usd to add new user
//---------------------------------
router.post("/", (req, res) => {
  const { firstName, lastName, dateOfBirth, password } = req.body;
  console.log(`firstName: ${firstName}, lastName: ${lastName} `);

  //---------------------------------
  // Validation
  //---------------------------------
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  });

  const valRes = schema.validate(req.body);

  if (valRes.error) {
    res.status(400).send({
      error: valRes.error.details[0].message,
    });
  } else {
    const newUser = new User({
      firstName,
      lastName,
      dateOfBirth,
      password,
    });

    newUser
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.status(404).json({ message: err }));
  }
});

module.exports = router;
