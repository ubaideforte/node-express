const router = require("express").Router();
const Joi = require("joi");
const User = require("../../modules/userModel");
const moment = require("moment");

router.post("/", async (req, res) => {
  const { email } = req.body;

  // <--------- Validation ---------> //
  const schema = Joi.object({
    email: Joi.string().email().required(),
    resetKey: Joi.number(),
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
        if (isUserExist.resetKey.key == req.body.resetKey) {
          //   if (isUserExist.resetKey.status === false) {
          isUserExist.resetKey.status = true;
          await isUserExist.save();

          const isExpired =
            moment().subtract(30, "m") > moment(isUserExist.resetKey.createdAt);

          console.log("I dont know what i am doing", isExpired);
          res.send({ message: `OK next step` });
          //   } else {
          //     res
          //       .status(403)
          //       .send({ message: "This token is already used by someone." });
          //   }
        } else {
          res.status(406).send({ message: "Invalid code" });
        }
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).send({ message: err.message ? err.message : err });
    }
  }
});

module.exports = router;
