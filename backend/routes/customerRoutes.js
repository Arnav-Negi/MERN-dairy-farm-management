const express = require("express");
const customerController = require("../controllers/customerController");
// const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", customerController.getCustomer);

router.patch("/", customerController.updateCustomer);

router.post("/register", customerController.registerCustomer);

router.post("/login", customerController.loginCustomer);

module.exports = router;
