const express = require("express");
const mongoose = require("mongoose");
const consfig = require("config");
const authRouter = require("./routes/auth.routes");
const fileUpload = require("express-fileupload");
const fileRouter = require("./routes/file.routes");
const corsMiddleware = require("./middleware/cors.middleware");
const filePathMiddleware = require("./middleware/filepath.middleware");
const app = express();
const PORT = process.env.PORT || consfig.get("serverPort");
const path = require("path");

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(filePathMiddleware(path.resolve(__dirname, "files")));
app.use(express.json());
app.use(express.static("static"));
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => {
  try {
    await mongoose.connect(consfig.get("dbUrl"));

    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
