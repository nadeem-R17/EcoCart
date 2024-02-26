const express = require("express");
const Order = require("../db/orderModel");
const User = require("../db/userModel");
const Product = require("../db/productModel");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

//order history
router.get("/history", authenticateJwt, async (req, res) => {
  // console.log(req.query.userId);
  if (!req.query.userId) {
    return res.status(400).send({ message: "User ID is required" });
  }

  const orders = await Order.find({ user: req.query.userId });

  if (!orders) {
    return res.status(404).send({ message: "No orders found for this user" });
  }

  res.send(orders);
});

// add item in a cart
router.post("/cart", authenticateJwt, async (req, res) => {
  const { productId, userId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const cartItem = user.cartItems.find(
    (item) => item.product.toString() === productId
  );

  if (cartItem) {
    cartItem.quantity++;
  } else {
    user.cartItems.push({ product: productId, quantity: 1 });
  }

  await user.save();

  await user.populate("cartItems.product");
  await user.save();

  res.send({ message: "Product added to cart", user });
});

// Remove an item from cart
router.delete("/cart", authenticateJwt, async (req, res) => {
  const { productId, userId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const cartItemIndex = user.cartItems.findIndex(
    (item) => item.product.toString() === productId
  );

  if (cartItemIndex > -1) {
    user.cartItems.splice(cartItemIndex, 1);
  } else {
    return res.status(404).send({ message: "Product not found in cart" });
  }

  await user.save();

  await user.populate("cartItems.product");
  await user.save();

  res.send({ message: "Product removed from cart", user });
});

// Decrease cart item quantity
router.put("/cart/decrease", authenticateJwt, async (req, res) => {
  const { productId, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const cartItem = user.cartItems.find(
    (item) => item.product.toString() === productId
  );

  if (cartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    }
  } else {
    return res.status(404).send({ message: "Product not found in cart" });
  }

  await user.save();

  await user.populate("cartItems.product");
  await user.save();

  res.send({ message: "Product quantity decreased", user });
});

//specific order
router.get("/:id", authenticateJwt, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order not found." });
  }
});

// Buy an item
router.post("/buy", authenticateJwt, async (req, res) => {
  const { shippingAddress, userId, totalPrice } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const order = new Order({
    user: userId,
    shippingAddress,
    products: user.cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
    totalPrice: totalPrice,
  });

  const createdOrder = await order.save();

  user.purchasedItems.push(createdOrder._id);
  user.cartItems = [];
  await user.save();

  res.send({ message: "Orders purchased successfully", orders: createdOrder });
});

module.exports = router;
