const express = require("express");
const router = express.Router();

//-----------------------*
// Importing User Routes *
//-----------------------*
const addNewUser = require("./addNewUser");
const getAllUser = require("./getAllUser");
const getUserById = require("./getUserById");
const deleteUser = require("./deleteUser");

//---------------------------------//
router.use("/add", addNewUser);
router.use("/", getAllUser);
router.use("/", getUserById);
router.use("/", deleteUser);
router.use("/", require("./updateUser"));
//---------------------------------//

module.exports = router;
