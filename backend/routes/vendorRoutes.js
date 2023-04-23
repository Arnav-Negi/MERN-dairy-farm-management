const express = require("express");
const vendorController = require("../controllers/vendorController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, vendorController.getVendor);

router.patch("/", auth, vendorController.updateVendor);

router.post("/register", vendorController.registerVendor);

router.post("/login", vendorController.loginVendor);

router.post("/addProduct", auth, vendorController.addProduct);

router.post("/removeProduct", auth, vendorController.removeProduct);

router.patch("/updateProduct", auth, vendorController.updateProduct);

router.get("/getSubs", auth, vendorController.getSubscriptions);

module.exports = router;
