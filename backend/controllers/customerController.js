const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Subscription = require("../models/Subscription");
const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerCustomer = async (req, res) => {
  try {
    const tempCustomer = await Customer.findOne({
      emailID: req.body.emailID,
    }).select("-createdAt -updatedAt -__v");

    if (tempCustomer) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const customer = new Customer(req.body);
    customer.password = password;

    await customer.save();

    const payload = {
      user: {
        id: customer._id,
        userType: "Customer",
      },
    };

    customer.password = undefined;

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, customer });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const loginCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      emailID: req.body.emailID,
    }).select("-createdAt -updatedAt -__v");
    if (!customer) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const check = await bcrypt.compare(req.body.password, customer.password);
    if (!check) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: customer._id,
        userType: "Customer",
      },
    };

    customer.password = undefined;

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, customer });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getCustomer = async (req, res) => {
  try {
    if (req.user.userType !== "Customer") {
      return res.status(400).json({ error: "User is not a customer" });
    }
    const customer = await Customer.findById(req.user.id).select(
      "-createdAt -updatedAt -password -__v"
    );
    res.status(200).json({ success: "Customer found", customer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateCustomer = async (req, res) => {
  try {
    if (req.user.userType !== "Customer") {
      return res.status(400).json({ error: "User is not a customer" });
    }

    const customerByEmail = await Customer.findOne({
      emailID: req.body.emailID,
    });

    if (customerByEmail && customerByEmail._id.toString() !== req.user.id) {
      return res.status(400).json({ error: "This email ID is already in use" });
    }

    await Customer.findByIdAndUpdate({ _id: req.user.id }, req.body);
    res.status(200).json("Customer updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const addToCart = async (req, res) => {
  try {
    if (req.user.userType !== "Customer") {
      return res.status(400).json({ error: "User is not a customer" });
    }

    const customer = await Customer.findById(req.user.id);
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }

    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    const quantity = req.body.daily_quantity * req.body.days.length;
    if (quantity > product.weeklyQuantity - product.usedQuantity) {
      return res.status(400).json({ error: "Not enough quantity available" });
    }

    product.usedQuantity += quantity;
    await product.save();

    console.log(req.body.startDate)

    const cartItem = customer.cart.find(
      (item) => item.product.toString() === req.body.product
    );
    if (cartItem) {
      cartItem.daily_quantity = req.body.daily_quantity;
      cartItem.days = req.body.days;
      cartItem.startDate = req.body.startDate;
      cartItem.checkStat = req.body.checkStat;
    } else {
      customer.cart.push(req.body);
    }

    await customer.save();
    res.status(200).json("Cart updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const removeFromCart = async (req, res) => {
  try {
    if (req.user.userType !== "Customer") {
      return res.status(400).json({ error: "User is not a customer" });
    }

    const customer = await Customer.findById(req.user.id);
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }

    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    const cartItem = customer.cart.find(
      (item) => item.product.toString() === req.body.product
    );
    if (!cartItem) {
      return res.status(400).json({ error: "Product not in cart" });
    }

    const quantity = cartItem.daily_quantity * cartItem.days.length;
    product.usedQuantity -= quantity;
    await product.save();

    customer.cart = customer.cart.filter(
      (item) => item.product.toString() !== req.body.product
    );
    await customer.save();
    res.status(200).json("Product removed from cart");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateCart = async (req, res) => {
  try {
    if (req.user.userType !== "Customer") {
      return res.status(400).json({ error: "User is not a customer" });
    }

    const customer = await Customer.findById(req.user.id);
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }

    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    const cartItem = customer.cart.find(
      (item) => item.product.toString() === req.body.product
    );
    if (!cartItem) {
      return res.status(400).json({ error: "Product not in cart" });
    }

    const oldQuantity = cartItem.daily_quantity * cartItem.days.length;
    console.log(oldQuantity);
    const newQuantity = req.body.daily_quantity * req.body.days.length;
    console.log(newQuantity);
    console.log(product.weeklyQuantity);
    console.log(product.usedQuantity);
    if (
      newQuantity >
      product.weeklyQuantity - product.usedQuantity + oldQuantity
    ) {
      return res.status(400).json({ error: "Not enough quantity available" });
    }
    product.usedQuantity += newQuantity - oldQuantity;
    console.log(product.usedQuantity);
    await product.save();

    cartItem.daily_quantity = req.body.daily_quantity;
    cartItem.days = req.body.days;
    cartItem.startDate = req.body.startDate;
    cartItem.checkStat = req.body.checkStat;
    await customer.save();
    res.status(200).json("Cart updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const addSubscription = async (req, res) => {
  try {
    if (req.user.userType !== "Customer") {
      return res.status(400).json({ error: "User is not a customer" });
    }

    const customer = await Customer.findById(req.user.id);
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }

    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    const cartItem = customer.cart.find(
      (item) => item.product.toString() === req.body.product)
    if (!cartItem) {
      return res.status(400).json({ error: "Product not in cart" });
    }

    const vendor = await Vendor.findById(product.vendor);

    const date = new Date();
    let time = date.toTimeString().substring(0, 5);
    const openingTime = vendor.dairyFarm.openingHours;
    const closingTime = vendor.dairyFarm.closingHours;
    if (closingTime > openingTime) {
      if (time < openingTime || time > closingTime) {
        return res.status(400).json({ error: "Vendor's Farm is closed" });
      }
    } else if (closingTime < openingTime) {
      if (time < openingTime && time > closingTime) {
        return res.status(400).json({ error: "Vendor's Farm is closed" });
      }
    }

    const subscription = new Subscription({
      product: req.body.product,
      customer: req.user.id,
      daily_quantity: cartItem.daily_quantity,
      days: cartItem.days,
      startDate: cartItem.startDate,
    });
    await subscription.save();

    vendor.subscriptions.push(subscription._id);
    await vendor.save();

    customer.subscriptions.push(subscription);
    customer.cart = customer.cart.filter(
      (item) => item.product.toString() !== req.body.product
    );
    await customer.save();
    res.status(200).json("Subscription added");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const removeSubscription = async (req, res) => {

  try {
    if (req.user.userType !== "Customer") {
      return res.status(400).json({ error: "User is not a customer" });
    }

    const customer = await Customer.findById(req.user.id);
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }
    
    const subscription = await Subscription.findOne({
      customer: req.user.id,
      _id: req.body.subscription,
    });
    if (!subscription) {
      console.log("Found nothing")
      return res.status(400).json({ error: "Subscription not found" });
    }

    const product = await Product.findById(subscription.product);
    const vendor = await Vendor.findById(product.vendor);

    const date = new Date();
    let time = date.toTimeString().substring(0, 5);
    const openingTime = vendor.dairyFarm.openingHours;
    const closingTime = vendor.dairyFarm.closingHours;
    if (closingTime > openingTime) {
      if (time < openingTime || time > closingTime) {
        return res.status(400).json({ error: "Vendor's Farm is closed" });
      }
    } else if (closingTime < openingTime) {
      if (time < openingTime && time > closingTime) {
        return res.status(400).json({ error: "Vendor's Farm is closed" });
      }
    }

    product.usedQuantity -=
      subscription.daily_quantity * subscription.days.length;
    await product.save();

    customer.subscriptions = customer.subscriptions.filter(
      (item) => item._id.toString() !== req.body.subscription
    );
    await customer.save();

    vendor.subscriptions = vendor.subscriptions.filter(
      (item) => item._id.toString() !== req.body.subscription
    );
    await vendor.save();

    await Subscription.findByIdAndDelete(req.body.subscription);
    res.status(200).json("Subscription removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getSubscriptions = async (req, res) => {
  try {
    if (req.user.userType !== "Customer") {
      return res.status(400).json({ error: "User is not a customer" });
    }
    const customer = await Customer.findById(req.user.id).populate({
      path: "subscriptions",
      populate: { path: "product", select: "name" },
      select: "-customer -__v -createdAt -updatedAt",
    });
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }

    // sort the subscriptions by which day of the week comes first from today
    customer.subscriptions.sort((a, b) => {
      const today = (new Date().getDay() - 1) % 7;
      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const aDays = a.days;
      const bDays = b.days;
      for (let i = 1; i <= 7; i++) {
        let index = (today + i) % 7;
        if (aDays.includes(days[index]) && !bDays.includes(days[index]))
          return -1;
        if (!aDays.includes(days[index]) && bDays.includes(days[index]))
          return 1;
      }
      return 0;
    });

    res.status(200).json({
      success: "Subscriptions found",
      subscriptions: customer.subscriptions,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getCart = async (req, res) => {
  try {
    if (req.user.userType !== "Customer") {
      return res.status(400).json({ error: "User is not a customer" });
    }

    const customer = await Customer.findById(req.user.id).populate({
      path: "cart",
      populate: { path: "product", select: "name price discount" },
      select: "-__v -createdAt -updatedAt",
    });
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }
    res.status(200).json({
      success: "Cart found",
      cart: customer.cart,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getVendors = async (req, res) => {
  try {
    // if (req.user.userType !== "Customer") {
    //   return res.status(400).json({ error: "User is not a customer" });
    // }
    const vendors = await Vendor.find().select(
      "-createdAt -updatedAt -__v -products -subscriptions -password -account"
    );

    let openStatus = [];
    let date = new Date();
    for (let i = 0; i < vendors.length; i++) {
      let time = date.toTimeString().substring(0, 5);
      const openingTime = vendors[i].dairyFarm.openingHours;
      const closingTime = vendors[i].dairyFarm.closingHours;
      if (closingTime > openingTime) {
        if (time < openingTime || time > closingTime) {
          openStatus.push("close");
        } else {
          openStatus.push("open");
        }
      } else if (closingTime < openingTime) {
        if (time < openingTime && time > closingTime) {
          openStatus.push("close");
        } else {
          openStatus.push("open");
        }
      }
      else {
        openStatus.push("close");
      }
    }

    console.log(vendors)
    res.status(200).json({
      success: "Vendors found",
      vendors: vendors, statuses: openStatus
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getCustomer,
  updateCustomer,
  addToCart,
  removeFromCart,
  updateCart,
  addSubscription,
  removeSubscription,
  getSubscriptions,
  getCart,
  getVendors,
};
