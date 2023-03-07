const express = require("express");
const mongoose = require("mongoose").default;
// const userRoutes = require("./routes/userRoutes");
// const subgreddiitRoutes = require("./routes/subgreddiitRoutes");
// const postRoutes = require("./routes/postRoutes");
require("dotenv").config();

const server = express();
server.use(express.json());

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODBURI)
    .then(() => server.listen(process.env.PORT, () => console.log("Connected to Backend and MongoDB")))
    .catch((err) => console.log(err));

// server.use("/user", userRoutes);
//
// server.use("/subgreddiit", subgreddiitRoutes);
//
// server.use("/post", postRoutes);

server.get("/", (req, res) => {
    res.send("<p>Backend Home Page</p>");
});
