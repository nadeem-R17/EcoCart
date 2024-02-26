const express = require("express");
const { SECRET } = require("../middleware/auth");
const User = require("../db/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { authenticateJwt } = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  const { firstname, lastname, username, password, isAdmin } = req.body;
  console.log(req.body);
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({
      firstname,
      lastname,
      username,
      password,
      isAdmin,
    });
    await newUser.save();
    const id = newUser._id;
    const token = jwt.sign(
      { username, role: isAdmin ? "admin" : "user" },
      SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      message: "User created successfully",
      token,
      id,
      isAdmin: newUser.isAdmin,
      cartItemsCount: 0,
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  console.log(user);
  if (user) {
    const id = user._id;
    const token = jwt.sign(
      { username, role: user.isAdmin ? "admin" : "user" },
      SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("admin or not ", user.isAdmin);
    res.json({
      message: "Logged in successfully",
      token,
      id,
      isAdmin: user.isAdmin,
      cartItemsCount: user.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/user/:userId", authenticateJwt, async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

module.exports = router;
