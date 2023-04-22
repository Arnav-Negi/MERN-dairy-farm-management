const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
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
    weekly_quantity: {
        type: Number,
        required: true,
    },
    available_quantity: {
        type: Number,
        required: true,
    },
    subscriptions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Subscription",
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Vendor",
    },
}, {timestamps: true});

module.exports = Product = mongoose.model("Product", ProductSchema);
