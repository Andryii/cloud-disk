const express = require("express");
const mongoose = require("mongoose");
const consfig = require("config");

const app = express();
const PORT = consfig.get("serverPort");

const start = async () => {
  try {
    await mongoose.connect(consfig.get("dbUrl"));

    app.get("/", (req, res) => res.send("Hello World!"));
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
