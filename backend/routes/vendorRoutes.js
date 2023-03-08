const express = require("express");
const vendorController = require("../controllers/vendorController");
// const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", vendorController.getVendor);

router.patch("/", vendorController.updateVendor);

router.post("/register", vendorController.registerVendor);

router.post("/login", vendorController.loginVendor);

module.exports = router;