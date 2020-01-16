const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const deleteNullContentFromObject = require("../utils/deleteNullContentFromObject");

async function index(req, res) {
  const devs = await Dev.find();

  return res.json(devs);
}

async function store(req, res) {
  const { github_username, techs, latitude, longitude } = req.body;

  let dev = await Dev.findOne({ github_username });

  if (!dev) {
    const response = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    let { login, name, avatar_url, bio } = response.data;
    if (!name) {
      name = login;
    }
    const techsArray = parseStringAsArray(techs);
    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });
  }

  return res.json(dev);
}

async function update(req, res) {
  const { techs, latitude, longitude } = req.body;

  let update = {
    techs: parseStringAsArray(techs),
    latitude,
    longitude
  };
  update = deleteNullContentFromObject(update);

  const dev = await Dev.findByIdAndUpdate(req.params.id, update, {
    new: true,
    useFindAndModify: false
  });

  return res.json(dev);
}

async function destroy(req, res) {
  await Dev.findByIdAndRemove(req.params.id, { useFindAndModify: false });
    return res.send();
}

module.exports = { index, store, update, destroy };
