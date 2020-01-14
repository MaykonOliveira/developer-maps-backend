const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

async function index(req, res) {
  const { latitude, longitude, techs } = req.query;
  const techsArray = parseStringAsArray(techs);

  const devs = await Dev.find({
    techs: {
      $in: techsArray
    },
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        $maxDistance: 10000
      }
    }
  });

  res.json(devs);
}

module.exports = { index };
