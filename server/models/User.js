const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  firstName: { type: String, default: "" },
  secondName: { type: String, default: "" },
  dsikSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  files: [{ type: Object, ref: "File" }],
});

module.exports = model("User", User);
