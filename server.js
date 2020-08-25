const express = require("express");
const userRoutes = require("./users");
const cors = require("cors");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
dotenv.config();

const server = express();
server.use(cors());
// server.use()
server.use(express.json());
server.use("/users", userRoutes);
// server.use("/reviews")

mongoose
  .connect("mongodb://localhost:27017/auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(3002, () => {
      console.log("Running on 3002");
    })
  );
