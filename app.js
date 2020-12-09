const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv/config");

//--------------------------- Middlewares --------------------------------------------
app.use(express.json());
app.use(cors());
app.use(cookieParser());
//------------------------------------------------------------------------------------

// Importing Auth
const verify = require("./routes/verify/index");

// Importing Routes
const userRoute = require("./routes/user/index");

app.use("/user", verify, userRoute);
app.use("/", require("./routes/auth/index"));

//-------------------------
// Connecting to Data Base
//-------------------------
const Connection_String = process.env.DB_CONNECTION_STRING || "";
mongoose
  .connect(Connection_String, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Succcessfully connected to Data Base"))
  .catch((e) => console.log("Something wrong happen", e));

//-----------------------------------
// Initializing Backend on port 3000
//-----------------------------------
const PORT = process.env.PORT || 404;
app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
