const express = require("express");
const router = express.Router();

//-----------------------*
// Importing User Routes *
//-----------------------*

router.use("/signup", require("./signup"));
router.use("/login", require("./login"));
//---------------------------------//

module.exports = router;
