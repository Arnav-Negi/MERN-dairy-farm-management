const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "No description provided",
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    discount: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
    },
    weeklyQuantity: {
      type: Number,
      required: true,
    },
    usedQuantity: {
      type: Number,
      default: 0,
    },
    subscriptions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Subscription",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("Product", ProductSchema);
