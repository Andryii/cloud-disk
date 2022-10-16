const { Schema, model, Objectid } = require("mongoose");

const File = new Schema({
  name: { type: String, require: true },
  name: { type: String, require: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },
  user: {type: Objectid, ref: "User"},
  parent: {type: Objectid, ref: File},
  childs: [{type: Objectid, ref: File}]
});

module.exports = model("File", File);
