const router = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../modules/userModel");

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
      const isUserExist = await User.findOne({ email });

      if (isUserExist) {
        const token = parseInt(Math.random() * 4000 + 2000);

        isUserExist.resetKey = {
          key: token,
          createdAt: new Date().toISOString(),
        };

        await isUserExist.save();

        res.status(200).send({
          message: `A message has been sent to you email. token: ${token} `,
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).send({ message: err.message ? err.message : err });
    }
  }
});

module.exports = router;
