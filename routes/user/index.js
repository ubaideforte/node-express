const express = require("express");
const router = express.Router();

const addNewUser = require("./addNewUser");

//---------------------------------*
// This API is usd to add new user *
//---------------------------------*
router.use("/add", addNewUser);

module.exports = router;
