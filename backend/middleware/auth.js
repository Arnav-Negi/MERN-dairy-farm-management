const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ error: "No token, Authentication denied" });
  }

  try {
    jwt.verify(token, process.env.SECRETKEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("Something wrong with auth middleware");
    res.status(500).json({ error: "Server Error" });
  }
};
