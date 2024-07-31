const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token is not provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = decoded.userInfo.id;
    next();
  });
};

module.exports = verifyJWT;
