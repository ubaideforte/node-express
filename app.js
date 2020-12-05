const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

//------------------------------------------------------------------------------------
// use this to parse request from the user. Without this we get undefined in req.body
app.use(express.json());
//------------------------------------------------------------------------------------

// Importing Routes
const userRoute = require("./routes/user");

app.use("/user", userRoute);

//-------------------------
// Connecting to Data Base
//-------------------------
const Connection_String = process.env.DB_CONNECT || "";
mongoose
  .connect(
    "mongodb+srv://admin:SS5oOCSyC9Py5hz2@mini-cluster.mikwz.mongodb.net/nodejs?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Succcessfully connected to Data Base"))
  .catch((e) => console.log("Something wrong happen", e));

//-----------------------------------
// Initializing Backend on port 3000
//-----------------------------------
const PORT = process.env.PORT || 404;
app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
