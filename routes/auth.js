const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");
const { userValidation, userLoginValidation } = require("../utils/validation");

//REGISTER
router.post("/register", async (req, res, next) => {
  const { error } = userValidation(req.body);
  error && next(createError(402, "Data are not valid"));

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    const { password, isAdmin, ...others } = savedUser._doc;
    res.status(201).json(others);
  } catch (err) {
    next(err);
  }
});

//LOGIN
router.post("/login", async (req, res, next) => {
  const { error } = userLoginValidation(req.body);
  error && next(createError(402, "Data are not valid"));

  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return next(createError(404, "User not found"));

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;

    if (originalPassword !== inputPassword)
      return next(createError(401, "Username/password is wrong"));

    console.log("Authenticated");
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, isAdmin, ...others } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(others);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
