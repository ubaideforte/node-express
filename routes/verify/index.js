const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({
      message:
        "You can not access this functionality due to insufficient rights",
    });

  try {
    const verified = jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET);
    console.log("Verified", verified);
    req.user = verified;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  next();
};
