const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerCustomer = async (req, res) => {
    try {
        const tempCustomer = await Customer
            .findOne({emailID: req.body.emailID})
            .select("-createdAt -updatedAt -__v");

        if (tempCustomer) {
            return res.status(400).json({error: "Email already in use"});
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
            }
        }

        customer.password = undefined

        jwt.sign(
            payload,
            process.env.SECRETKEY,
            {expiresIn: 36000},
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, customer });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

const loginCustomer = async (req, res) => {
    try {
        const customer = await Customer
            .findOne({ emailID: req.body.emailID })
            .select("-createdAt -updatedAt -__v");
        if (!customer) {
            return res.status(400).json({error: "Invalid Credentials"});
        }

        const check = await bcrypt.compare(req.body.password, customer.password);
        if (!check) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: customer._id,
                userType: "Customer",
            }
        };

        customer.password = undefined;

        jwt.sign(
            payload,
            process.env.SECRETKEY,
            {expiresIn: '1h'},
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
            return res.status(400).json({error: "User is not a customer"});
        }
        const customer = await Customer
            .findById(req.user.id)
            .select("-createdAt -updatedAt -password -__v");
        res.status(200).json({success: "Customer found", customer});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const updateCustomer = async (req, res) => {
    try {
        if (req.user.userType !== "Customer") {
            return res.status(400).json({error: "User is not a customer"});
        }

        const customerByEmail = await Customer.findOne({emailID: req.body.emailID});

        if (customerByEmail && customerByEmail._id.toString() !== req.user.id) {
            return res.status(400).json({error: "This email ID is already in use"});
        }

        await Customer.findByIdAndUpdate({_id: req.user.id}, req.body);
        res.status(200).json("Customer updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const addToCart = async (req, res) => {
    try {
        if (req.user.userType !== "Customer") {
            return res.status(400).json({error: "User is not a customer"});
        }

        const customer = await Customer.findById(req.user.id);
        if (!customer) {
            return res.status(400).json({error: "Customer not found"});
        }

        const product = await Product.findById(req.body.product);
        if (!product) {
            return res.status(400).json({error: "Product not found"});
        }

        const cartItem = customer.cart.find(item => item.product.toString() === req.body.product);
        if (cartItem) {
            cartItem.daily_quantity = req.body.daily_quantity;
            cartItem.days = req.body.days;
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
            return res.status(400).json({error: "User is not a customer"});
        }

        const customer = await Customer.findById(req.user.id);
        if (!customer) {
            return res.status(400).json({error: "Customer not found"});
        }

        const product = await Product.findById(req.body.product);
        if (!product) {
            return res.status(400).json({error: "Product not found"});
        }

        const cartItem = customer.cart.find(item => item.product.toString() === req.body.product);
        if (!cartItem) {
            return res.status(400).json({error: "Product not in cart"});
        }

        customer.cart = customer.cart.filter(item => item.product.toString() !== req.body.product);
        await customer.save();
        res.status(200).json("Product removed from cart");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

const updateCart = async (req, res) => {
    try {
        if (req.user.userType !== "Customer") {
            return res.status(400).json({error: "User is not a customer"});
        }

        const customer = await Customer.findById(req.user.id);
        if (!customer) {
            return res.status(400).json({error: "Customer not found"});
        }

        const product = await Product.findById(req.body.product);
        if (!product) {
            return res.status(400).json({error: "Product not found"});
        }

        const cartItem = customer.cart.find(item => item.product.toString() === req.body.product);
        if (!cartItem) {
            return res.status(400).json({error: "Product not in cart"});
        }

        cartItem.daily_quantity = req.body.daily_quantity;
        cartItem.days = req.body.days;
        await customer.save();
        res.status(200).json("Cart updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = {
    registerCustomer,
    loginCustomer,
    getCustomer,
    updateCustomer,
    addToCart,
    removeFromCart,
    updateCart,
};
