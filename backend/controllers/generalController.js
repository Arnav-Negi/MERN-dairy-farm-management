const Vendor = require("../models/Vendor");

const getUserType = async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: "User found", userType: req.user.userType });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getProducts = async (req, res) => {
  try {
    let vendor;
    if (req.user.userType === "Vendor") {
      vendor = await Vendor.findById(req.user.id).populate("products");
    } else {
      vendor = await Vendor.findById(req.body.vendor).populate("products");
    }
    if (!vendor) {
      return res.status(400).json({ error: "Vendor not found" });
    }
    res
      .status(200)
      .json({ success: "Products found", products: vendor.products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getUserType,
  getProducts,
};
