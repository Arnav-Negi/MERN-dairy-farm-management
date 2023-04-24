const express = require("express");
const customerController = require("../controllers/customerController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, customerController.getCustomer);

router.patch("/", auth, customerController.updateCustomer);

router.post("/register", customerController.registerCustomer);

router.post("/login", customerController.loginCustomer);

router.post("/addToCart", auth, customerController.addToCart);

router.post("/removeFromCart", auth, customerController.removeFromCart);

router.post("/updateCart", auth, customerController.updateCart);

router.post("/addSub", auth, customerController.addSubscription);

router.post("/removeSub", auth, customerController.removeSubscription);

router.get("/getSubs", auth, customerController.getSubscriptions);

router.get("/getCart", auth, customerController.getCart);

router.get("/getVendors", customerController.getVendors);

module.exports = router;
