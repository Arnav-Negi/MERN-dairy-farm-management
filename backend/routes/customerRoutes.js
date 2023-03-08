const express = require("express");
const customerController = require("../controllers/customerController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, customerController.getCustomer);

router.patch("/", auth, customerController.updateCustomer);

router.post("/register", customerController.registerCustomer);

router.post("/login", customerController.loginCustomer);

module.exports = router;
