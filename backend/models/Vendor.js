const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
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
    dairyFarm: {
      name: {
        type: String,
        default: "",
      },
      establishedDate: {
        type: Date,
        default: "01/01/0001",
      },
      openingHours: {
        type: String,
        default: "00:00",
      },
      closingHours: {
        type: String,
        default: "00:00",
      },
    },
    workingDays: {
      type: [String],
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
    account: {
      holderName: {
        type: String,
        default: "",
      },
      bankName: {
        type: String,
        default: "",
      },
      branchName: {
        type: String,
        default: "",
      },
      IFSC: {
        type: String,
        default: "",
      },
      accountNumber: {
        type: String,
        default: "",
      },
      accountType: {
        type: String,
        default: "",
      },
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
    },
    subscriptions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Subscription",
    },
  },
  { timestamps: true }
);

module.exports = Vendor = mongoose.model("Vendor", VendorSchema);
