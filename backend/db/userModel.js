const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
  purchasedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
