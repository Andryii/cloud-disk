const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt.js");
const router = new Router();
const { check, validationResult } = require("express-validator");

router.post("/registration", async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = User.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ massage: `User with email ${email} already exist` });
    }

    const hashPassword = await bcrypt.hash(password, 15);
    const user = new User({ email, password: hashPassword });
    await user.save();
    return res.json({ massage: "User was created" });
  } catch (error) {
    console.log(error);
    res.send({ message: "Server error" });
  }
});
