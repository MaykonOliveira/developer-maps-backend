const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes');

const app = express();
app.use(express.json());
app.use(routes)

mongoose.connect('mongodb+srv://deploy:I5wNYvEonEb0kFBG@cluster0-inujz.mongodb.net/developer-maps?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(3333, () => console.log('Listening port 3333'));
