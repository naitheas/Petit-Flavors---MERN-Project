const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const users = await User.find().sort();
    res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
});
//GET USER
router.get("/:id", verifyTokenAndAuthorization, async (req, res,next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    return next(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res,next) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res,next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    return next(err);
  }
});




module.exports = router;
