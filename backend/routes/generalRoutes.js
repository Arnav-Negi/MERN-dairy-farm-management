const express = require("express");
const generalController = require("../controllers/generalController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, generalController.getUserType);

router.post("/getProducts", auth, generalController.getProducts);

module.exports = router;
