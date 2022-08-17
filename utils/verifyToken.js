const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return next(createError(401, "Token is not valid")); //res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return next(createError(402, "You are not authenticated")); //res.status(401).json("You are not authenticated!");
  }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not logged in/admin")); //res.status(403).json("You are not logged/admin!");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not admin")); //res.status(403).json("You are not admin!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
