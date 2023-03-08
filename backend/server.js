const express = require("express");
const mongoose = require("mongoose").default;
const customerRoutes = require("./routes/customerRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const generalRoutes = require("./routes/generalRoutes");
require("dotenv").config();

const server = express();
server.use(express.json());

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODBURI)
    .then(() => server.listen(process.env.PORT, () => console.log("Connected to Backend and MongoDB")))
    .catch((err) => console.log(err));

server.use("/api/customer", customerRoutes);

server.use("/api/vendor", vendorRoutes);

server.use("/api/general", generalRoutes);

server.get("/", (req, res) => {
    res.send("<p>Backend Home Page</p>");
});
