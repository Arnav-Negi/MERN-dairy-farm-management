const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    daily_quantity: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    days: {
      type: [String],
      required: true,
      default: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  },
  { timestamps: true }
);

module.exports = Subscription = mongoose.model(
  "Subscription",
  SubscriptionSchema
);
