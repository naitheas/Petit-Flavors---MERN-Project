const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();




//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res, next) => {
  // const newProduct = new Product(req.body);

  try {
    const newProduct = await new Product(req.body).save();
    res.status(201).json(newProduct);
  } catch (err) {
    return next(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res, next) => {
  try {
    let products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
});

//GET PRODUCT BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    return next(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res,next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted.");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
