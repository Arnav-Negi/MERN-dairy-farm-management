const Vendor = require("../models/Vendor");

const getVendor = async (req, res) => {
    try {
        if (req.user.userType !== "Vendor") {
            return res.status(400).json({error: "User is not a vendor"});
        }
        const vendor = await Vendor.findById(req.user.id);
        vendor.password = undefined;
        res.status(200).json({success: "Vendor found", vendor});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const updateVendor = async (req, res) => {
    try {
        if (req.user.userType !== "Vendor") {
            return res.status(400).json({error: "User is not a vendor"});
        }
        const vendorByEmail = await Vendor.findOne({emailID: req.body.emailID});

        if (vendorByEmail && vendorByEmail._id !== req.user.id) {
            return res.status(400).json({error: "This email ID is already in use"});
        }

        await Vendor.findByIdAndUpdate({_id: req.user.id}, req.body);
        res.status(200).json("Vendor updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports = {
    getVendor,
    updateVendor,
};
