const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("./schema");
const router = express.Router();
const atob = require("atob");

router.get("/", async (req, res) => {
  const [username, password] = atob(
    req.headers.authorization.split(" ")[1]
  ).split(":");
  const user = await userModel.find({ username });

  if (user && user[0].role === "admin") {
    const users = await userModel.find();
    res.send(users);
  } else {
    res.send("Unauthorized");
  }
});
router.get("/me", async (req, res) => {
  const [username, password] = atob(
    req.headers.authorization.split(" ")[1]
  ).split(":");
  const user = await userModel.find({ username });
  const isAuthorized = await bcrypt.compare(password, user[0].password);

  if (isAuthorized) {
    res.send("login sucessfull");
  } else {
    res.status(403).send("login failed");
  }
});
router.post("/register", async (req, res) => {
  const userExists = await userModel.find({ username: req.body.username });
  console.log(userExists);
  if (userExists.length > 0) {
    res.send("username exists");
  } else {
    const plainPassword = req.body.password;
    req.body.password = await bcrypt.hash(plainPassword, 8);
    const newUser = new userModel(req.body);
    await newUser.save();
    res.send("sucess");
  }
});

module.exports = router;
