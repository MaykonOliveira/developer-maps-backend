require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(process.env.PORT || 3333);
