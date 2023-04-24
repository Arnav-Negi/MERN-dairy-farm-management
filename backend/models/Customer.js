const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    subscriptions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Subscription",
    },
    cart: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          daily_quantity: {
            type: Number,
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
          startDate: {
            type: Date,
            required: true,
          },
          checkStat: {
            type: Boolean,
            required: true,
            default: false,
          }
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = Customer = mongoose.model("Customer", CustomerSchema);
