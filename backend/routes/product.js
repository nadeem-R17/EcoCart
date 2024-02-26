const express = require("express");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const Product = require("../db/productModel");
const router = express.Router();

//admin--create
router.post("/products", authenticateJwt, async (req, res) => {
  const { role } = req.user;
  console.log(role);
  if (role !== "admin") {
    return res.status(403).json({ message: "Only admins can create products" });
  }

  const product = new Product(req.body);
  console.log("product to create ", product);
  try {
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//admin--delete
router.delete("/products/:productId", authenticateJwt, async (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({ message: "Only admins can delete products" });
  }

  try {
    const product = await Product.findByIdAndRemove(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//admin--update
router.put("/products/:productId", authenticateJwt, async (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({ message: "Only admins can update products" });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/products", authenticateJwt, async (req, res) => {
  const products = await Product.find();
  res.json({ products });
});

router.get("/products/:productId", authenticateJwt, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
