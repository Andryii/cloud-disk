const express = require("express");
const mongoose = require("mongoose");
const consfig = require("config");
const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = consfig.get("serverPort");

app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(consfig.get("dbUrl"));

    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
