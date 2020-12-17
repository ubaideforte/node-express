const express = require("express");
const router = express.Router();
const verify = require("../verify/index");
//-----------------------*
// Importing User Routes *
//-----------------------*

router.use("/signup", require("./signup"));
router.use("/login", require("./login"));
router.use("/logout", verify, require("./logout"));
router.use("/forgot-password", require("./forgotPassword"));
router.use("/reset-password", require("./resetPassword"));
//---------------------------------//

module.exports = router;
