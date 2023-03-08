const express = require("express");
const vendorController = require("../controllers/vendorController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, vendorController.getVendor);

router.patch("/", auth, vendorController.updateVendor);

router.post("/register", vendorController.registerVendor);

router.post("/login", vendorController.loginVendor);

module.exports = router;