const mongoose = require("mongoose");
const PointSchema = require("./customTypes/PointSchema");

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: { 
    type: [String],
    required: true,
    default: []
  },
  location: {
    type: PointSchema,
    index: "2dsphere"
  }
});

module.exports = mongoose.model("Dev", DevSchema);
