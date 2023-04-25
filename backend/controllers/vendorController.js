const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");
const Product = require("../models/Product");
const Subscription = require("../models/Subscription")
const Customer = require("../models/Customer")
require("dotenv").config();

const registerVendor = async (req, res) => {
  try {
    const tempVendor = await Vendor.findOne({
      emailID: req.body.emailID,
    }).select("-createdAt -updatedAt -__v");

    if (tempVendor) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const password = await bcrypt.hash(req.body.password, salt);

    const vendor = new Vendor(req.body);
    vendor.password = password;

    await vendor.save();

    const payload = {
      user: {
        id: vendor._id,
        userType: "Vendor",
      },
    };

    vendor.password = undefined;

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      (err, token) => {
        if (err) throw err;
        res.json({ token, vendor });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

const loginVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ emailID: req.body.emailID }).select(
      "-createdAt -updatedAt -__v"
    );
    if (!vendor) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const check = await bcrypt.compare(req.body.password, vendor.password);
    if (!check) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: vendor._id,
        userType: "Vendor",
      },
    };

    vendor.password = undefined;

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, vendor });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getVendor = async (req, res) => {
  try {
    if (req.user.userType !== "Vendor") {
      return res.status(400).json({ error: "User is not a vendor" });
    }
    const vendor = await Vendor.findById(req.user.id).select(
      "-createdAt -updatedAt -password -__v"
    );
    res.status(200).json({ success: "Vendor found", vendor });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateVendor = async (req, res) => {
  try {
    if (req.user.userType !== "Vendor") {
      return res.status(400).json({ error: "User is not a vendor" });
    }
    const vendorByEmail = await Vendor.findOne({ emailID: req.body.emailID });

    if (vendorByEmail && vendorByEmail._id.toString() !== req.user.id) {
      return res.status(400).json({ error: "This email ID is already in use" });
    }

    await Vendor.findByIdAndUpdate({ _id: req.user.id }, req.body);
    res.status(200).json("Vendor updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const addProduct = async (req, res) => {
  try {
    if (req.user.userType !== "Vendor") {
      return res.status(400).json({ error: "User is not a vendor" });
    }
    const product = new Product(req.body);
    product.vendor = req.user.id;
    product.available_quantity = product.weekly_quantity;
    await product.save();

    await Vendor.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { products: product._id } }
    );
    res.status(200).json("Product added");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const removeProduct = async (req, res) => {
  try {
    if (req.user.userType !== "Vendor") {
      return res.status(400).json({ error: "User is not a vendor" });
    }
    const product = await Product.findById(req.body.id);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    if (product.vendor.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ error: "User is not the owner of the product" });
    }
    await Vendor.findByIdAndUpdate(
      { _id: req.user.id },
      { $pull: { products: req.body.id } }
    );
    await Subscription.deleteMany({product: req.body.id});
    await Customer.updateMany({}, {
      $pull: {
        cart: {
          product: req.body.id
        }
      }
    });
    await Product.findByIdAndDelete(req.body.id);
    res.status(200).json("Product removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateProduct = async (req, res) => {
  try {
    if (req.user.userType !== "Vendor") {
      return res.status(400).json({ error: "User is not a vendor" });
    }
    const product = await Product.findById(req.body.id);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    if (product.vendor.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ error: "User is not the owner of the product" });
    }
    await Product.findByIdAndUpdate({ _id: req.body.id }, req.body);
    res.status(200).json("Product updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getSubscriptions = async (req, res) => {
  try {
    if (req.user.userType !== "Vendor") {
      return res.status(400).json({ error: "User is not a vendor" });
    }
    const vendor = await Vendor.findById(req.user.id).populate({
      path: "subscriptions",
      populate: [
        { path: "product", select: "name" },
        { path: "customer", select: "first_name last_name address" },
      ],
      select: "-createdAt -updatedAt -__v",
    });

    if (!vendor) {
      return res.status(400).json({ error: "Vendor not found" });
    }
    res
      .status(200)
      .json({
        success: "Subscriptions found",
        subscriptions: vendor.subscriptions,
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getVendor,
  updateVendor,
  registerVendor,
  loginVendor,
  addProduct,
  removeProduct,
  updateProduct,
  getSubscriptions,
};
