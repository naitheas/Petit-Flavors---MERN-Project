const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { getToken } = require('./verifyToken');

//REGISTER
router.post("/register", async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    const { password, ...userInfo } = savedUser._doc;
    res.status(201).json({userInfo,token:getToken(newUser)});
  } catch (err) {
    return next(err);
  }
});

//LOGIN
router.post("/login", async (req, res, next) => {
  try {
    // if user not found, throw error
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong credentials!");
    // reverse engineer stored password for input comparison
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const storedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      // if input password does not match user stored password, throw error
    storedPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");
      // remove password from returned user object
    const { password, ...userInfo } = user._doc;

    res.status(200).json({userInfo, token:getToken(user)});
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
