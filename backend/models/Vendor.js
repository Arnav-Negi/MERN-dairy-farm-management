const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        // required: true,
    },
    last_name: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    phoneNumber: {
        type: Number,
        // required: true,
    },
    emailID: {
        type: String,
        // required: true,
        unique: true,
    },
    address: {
        type: String,
        // required: true,
    },
    dairyFarm: {
        name: {
            type: String,
            // required: true,
        },
        establishedDate: {
            type: Date,
            // required: true,
        },
        openingHours: {
            type: String,
            // required: true,
        },
        closingHours: {
            type: String,
            // required: true,
        },
    },
    workingDays: {
        type: [String],
        // required: true,
    },
    account: {
        holderName: {
            type: String,
            // required: true,
        },
        bankName: {
            type: String,
            // required: true,
        },
        branchName: {
            type: String,
            // required: true,
        },
        IFSC: {
            type: String,
            // required: true,
        },
        accountNumber: {
            type: String,
            // required: true,
        },
        accountType: {
            type: String,
            // required: true,
        },
    },
}, {timestamps: true});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema);
